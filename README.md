# Pinsta→ Bruno Migration Assistant

This extension helps migrate Postman collections into Bruno step by step, with **strict validation at every stage**.  
The process is fully guided and ensures no mistakes.

---

## 💡 Installation

The extension is available as a VSIX file in the `releases` folder of this repository. To install it manually in VS Code:

1. Download the VSIX file from the `releases` folder
2. Open VS Code
3. Press `Ctrl+Shift+P` or `F1` to open the Command Palette
4. Type "Extensions: Install from VSIX" and select it
5. Browse to and select the downloaded VSIX file
6. Restart VS Code if prompted

---

## 🚀 Usage

1. Open your Postman project in VS Code.
2. Run the command: `FRISS: Postman to Bruno - Start Migration`

3. Follow the **interactive step-by-step prompts**:
- Attach your main folder.
- (Optional) Import environment files.
- Create `.env` from GLOBAL environment.
- Auto-update all Bruno environment files.
- Auto-replace API usages, variable calls, and scripts.
- Install Faker and update pre-request scripts.
- Finalize with code-safe `.bru` outputs.

---

## ✅ Workflow Steps

1. **Import Postman Environments** (optional) → Create Bruno environment files from Postman environment JSONs.
2. **Create `.env` from GLOBAL Environment** → Build `.env` file with key/value pairs from GLOBAL environment.
3. **Propagate `.env` Keys into Bruno Environments** → Update/add entries in `environments/*.bru` files with `{{process.env.KEY}}` format.
4. **Update Bruno API Usage** → Replace `bru.getEnvVar` with `bru.getVar` across all `.bru` request files.
5. **Replace `request.name` in Strings** → Replace `"request.name"` with the exact file name in all `.bru` files.
6. **Update Bruno Setter Usage** → Replace `bru.setEnvVar` with `bru.setVar` across all `.bru` request files.
7. **Move Post-Response to Tests** → Convert `script:post-response` blocks to `tests` blocks.
8. **Install XML Parser & Update Tests Scripts** → Install `fast-xml-parser` if needed and replace `xml2Json` usage.
9. **Install Faker & Update Pre-request Scripts** → Install Faker library and replace `$random` variables with Faker methods.
10. **Add Collection-Level Variables** → Convert `bru.getVar(key)` to `bru.getCollectionVar(key)` for collection variables.
11. **Add Folder-Level Variables** → Convert `bru.getVar(key)` to `bru.getFolderVar(key)` for folder variables.
12. **Convert Bracket to Dot Notation** → Replace `array[index]["property"]` with `array[index].property` notation.
13. **Finalization** → Generate final `.bru` files after all steps are confirmed.

---

## 🔒 Validation Protocol

- After each step → confirm `ok` or provide changes.  
- If `ok` → proceed.  
- If `changes` → re-apply until correct.  
- If `no` → process pauses.  

---

## 📝 Example Commands

- `CREATE ENV` → Create a Bruno environment file.  
- `CREATE DOTENV` → Generate `.env` from GLOBAL env.  
- `ready` → Confirms file/folder attachment.  

---

## ⚡ Notes
- Works on any Postman collection JSON + env JSON.  
- Ensures strict Bruno-compatible format.  
- No final output until **all steps confirmed**.