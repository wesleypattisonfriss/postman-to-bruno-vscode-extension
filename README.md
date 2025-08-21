# Postman → Bruno Migration Assistant

This extension helps migrate Postman collections into Bruno step by step, with **strict validation at every stage**.  
The process is fully guided and ensures no mistakes.

---

## 🚀 Usage

1. Open your Postman project in VS Code.
2. Run the command: `Postman: Start Migration`

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

1. **Initial Setup** → Attach folder + confirm `ready`.
2. **Import Environments** (optional).
3. **Create `.env` from GLOBAL environment**.
4. **Propagate `.env` keys into Bruno environments**.
5. **Update Bruno API usage (`bru.getEnvVar` → `bru.getVar`)**.
6. **Replace request.name with kebab-case file name**.
7. **Update setter usage (`bru.setEnvVar` → `bru.setVar`)**.
8. **Install Faker + update pre-request scripts**.
9. **Convert bracket to dot notation**.
10. **Confirm & generate final `.bru` outputs**.

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
