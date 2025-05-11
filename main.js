const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  const indexPath = path.join(__dirname, 'frontend', 'dist', 'index.html');
  mainWindow.loadFile(indexPath);

  mainWindow.webContents.openDevTools(); // Можно убрать в продакшене

  mainWindow.on('closed', () => mainWindow = null);
}

// Запуск бэкенда
function startServer() {
  return new Promise((resolve, reject) => {
    const serverPath = path.join(__dirname, 'backend', 'server.js');
    serverProcess = exec(`node ${serverPath}`, { cwd: __dirname });

    serverProcess.stdout.on('data', (data) => {
      console.log(`[SERVER]: ${data}`);
      if (data.toString().includes('Server running on port')) {
        resolve();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`[SERVER ERROR]: ${data}`);
    });
  });
}

app.on('ready', async () => {
  try {
    await startServer();
  } catch (err) {
    console.error('Не удалось запустить сервер:', err);
  }

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (!mainWindow) createWindow();
});