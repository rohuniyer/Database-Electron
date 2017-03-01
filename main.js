const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

const {ipcMain} = require('electron');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 600, height: 600});

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/app/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();

  //"create" the insertWindow variable outside of a function, and then put the
  //actual new BrowserWindow inside the on functions below. That way we can close
  //and open it how we want without all those damn errors
  var insertWindow;

  ipcMain.on('insert-show', function(event) {
    insertWindow = new BrowserWindow({width: 400, height: 400, show: false, frame: true});
    insertWindow.loadURL(`file://${__dirname}/app/insert.html`);
    insertWindow.webContents.openDevTools();
    insertWindow.show();
    //event.returnValue = 'it worked!'; //Not much value?
  });

  ipcMain.on('insert-hide', function(event) {
    insertWindow.hide();
    insertWindow.close();
    //event.returnValue = 'it worked!'; //Not much value?
  });

  var tableWindow;

  ipcMain.on('table-show', function(event) {
    tableWindow = new BrowserWindow({width: 600, height: 600, show: false, frame: true});
    tableWindow.loadURL(`file://${__dirname}/app/table.html`);
    tableWindow.webContents.openDevTools();
    tableWindow.show();
  })

  ipcMain.on('table-hide', function(event) {
    tableWindow.hide();
    tableWindow.close();
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
