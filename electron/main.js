const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let mainWindow;
let nextProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: "#0b0b0b",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Start Next.js
  nextProcess = spawn("npm", ["run", "dev"], {
    cwd: path.join(__dirname, ".."),
    shell: true,
    stdio: "inherit",
  });

  // Give Next.js time to boot
  setTimeout(createWindow, 4000);
});

app.on("window-all-closed", () => {
  if (nextProcess) nextProcess.kill();
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
