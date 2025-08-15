import * as vscode from 'vscode';
import { TextDecoder } from 'util';

/**
 * Opens the Copilot Chat view with a given prompt, or copies the prompt to clipboard if chat cannot be opened.
 * @param prompt The initial message to send to Copilot Chat.
 */
async function openChatWithPrompt(prompt: string): Promise<void> {
  try {
    // Try to open chat (some VS Code builds use different commands)
    await vscode.commands.executeCommand('workbench.action.chat.open');
    await vscode.commands.executeCommand('workbench.action.chat.newChat');
    await vscode.commands.executeCommand('workbench.action.chat.open', prompt);
  } catch (error) {
    await vscode.env.clipboard.writeText(prompt);
    vscode.window.showInformationMessage(
      "Couldn't open Copilot Chat automatically. Prompt copied to clipboard."
    );
  }
}

/**
 * Called when the extension is activated.
 * Registers commands and sets up extension context.
 */
export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand('copilotGuided.start', async () => {
    const promptUri = vscode.Uri.joinPath(context.extensionUri, 'src/prompt.txt');
    let prompt = '';
    try {
      const promptData = await vscode.workspace.fs.readFile(promptUri);
      prompt = new TextDecoder('utf-8').decode(promptData);
    } catch (err) {
      vscode.window.showWarningMessage('Could not read prompt.txt, using default prompt');
    }
    await openChatWithPrompt(prompt);
  });
  context.subscriptions.push(disposable);
}

/**
 * Called when the extension is deactivated.
 */
export function deactivate(): void {}
