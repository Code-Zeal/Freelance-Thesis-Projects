const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win; // Variable a nivel de módulo para mantener la referencia de la ventana

function createWindow() {
  // Asigna la nueva ventana a la variable 'win' ya declarada a nivel de módulo
  win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // y carga el archivo index.html de la aplicación.
  win.loadFile("index.html");
}

function loadAnotherHTML(page) {
  // Asegúrate de que 'win' esté definida y no sea null antes de intentar cargar la página
  if (win) {
    win.loadFile(path.join(__dirname, page));
  } else {
    // Si 'win' es null, crea una nueva ventana antes de cargar la página
    createWindow();
    win.once("ready-to-show", () => {
      win.loadFile(path.join(__dirname, page));
    });
  }
}

app.whenReady().then(createWindow);

ipcMain.on("navigate", (event, page) => {
  loadAnotherHTML(page);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
