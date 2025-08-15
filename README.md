# Copilot Guided File Creator (Fixed)
This VS Code extension adds two commands that kick off a **guided Copilot Chat flow**. It asks for inputs in steps before generating code.

## Commands
- **Copilot: Start Guided File Creator (Chat-driven)** – opens chat with a step-by-step prompt (ask `filename?` → `destination-folder?` → `purpose?`), waits for all answers, then confirms before generating code.
- **Copilot: Start Guided File Creator (Collect inputs, then Chat)** – collects inputs via input boxes first, then opens chat with a pre-filled prompt.

## Run
1. Open this folder in VS Code.
2. Run `npm install`.
3. Press **F5** (Run Extension). This compiles TypeScript first and launches the Extension Development Host.
4. In the new window, open the Command Palette and run one of the commands above.

If opening the chat fails, the extension falls back to copying the prompt into your clipboard so you can paste it into Copilot Chat manually.
