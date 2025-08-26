import * as vscode from 'vscode';
import { TextDecoder } from 'util';
import * as path from 'path';


async function findBrunoFolders(): Promise<string[]> {
  const brunoFolders: string[] = [];
  
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showWarningMessage('No workspace folders are open.');
    return brunoFolders;
  }

  for (const workspaceFolder of vscode.workspace.workspaceFolders) {
    try {
      const pattern = new vscode.RelativePattern(workspaceFolder, '**/bruno.json');
      const files = await vscode.workspace.findFiles(pattern, '**/node_modules/**');
      
      for (const file of files) {
        const folderPath = path.dirname(file.fsPath);
        brunoFolders.push(folderPath);
      }
    } catch (error) {
      console.error('Error searching for bruno.json files:', error);
    }
  }
  
  return brunoFolders;
}


async function openChatWithPrompt(prompt: string, brunoFolders: string[]): Promise<void> {
  try {
    await vscode.commands.executeCommand('workbench.action.chat.open');
    await vscode.commands.executeCommand('workbench.action.chat.newChat');
    
    if (brunoFolders.length > 0) {
      for (const folder of brunoFolders) {
        try {
          const folderUri = vscode.Uri.file(folder);
          await vscode.commands.executeCommand('workbench.action.chat.attach', folderUri);
        } catch (error) {
          console.error(`Failed to attach folder ${folder}:`, error);
        }
      }
    }
    
    await vscode.commands.executeCommand('workbench.action.chat.open', prompt);
  } catch (error) {
    await vscode.env.clipboard.writeText(prompt);
    vscode.window.showInformationMessage(
      "Couldn't open Copilot Chat automatically. Prompt copied to clipboard."
    );
  }
}


export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand('friss.postman.startMigration', async () => {
    const promptUri = vscode.Uri.joinPath(context.extensionUri, 'src/prompt.txt');
    let prompt = '';
    try {
      const promptData = await vscode.workspace.fs.readFile(promptUri);
      prompt = new TextDecoder('utf-8').decode(promptData);
    } catch (err) {
      vscode.window.showWarningMessage('Could not read prompt.txt, uh oh.');
    }

    // Find Bruno project folders in the workspace
    const brunoFolders = await findBrunoFolders();
    if (brunoFolders.length === 0) {
      vscode.window.showErrorMessage('No folders containing bruno.json files found in the workspace. Please ensure you have Bruno projects in your workspace before starting the migration.');
      return;
    }

    // Remember the first found Bruno project folder as the main folder
    const mainBrunoFolder = brunoFolders[0];

    const brunoContext = `\n\nFound ${brunoFolders.length} Bruno project(s) in the workspace:\n${brunoFolders.map(folder => `- ${folder}`).join('\n')}\n\nMain Bruno project folder for migration: ${mainBrunoFolder}\nAll migration steps will use this folder as context.`;
    prompt += brunoContext;

    // Pass only the main folder to the chat context for migration steps
    await openChatWithPrompt(prompt, [mainBrunoFolder]);
  });
  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
