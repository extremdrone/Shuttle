'use strict'

import { app, BrowserWindow, Menu } from 'electron'
import { autoUpdater } from 'electron-updater'
const { ipcMain, dialog } = require('electron')

const Datastore = require('nedb')
var db = {}
db.projects = new Datastore({ filename: app.getPath('userData') + '/projects.db', autoload: true, timestampData: true })
db.currentProject = new Datastore({ filename: app.getPath('userData') + '/currentProject.db', autoload: true, timestampData: true })

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minHeight: 440,
    minWidth: 660,
    show: false,
    titleBarStyle: 'hiddenInset',
    title: 'Shuttle'
  })

  mainWindow.loadURL(winURL)
  mainWindow.maximize()
  mainWindow.show()

  // Open DevTools in PROD environment
  // mainWindow.webContents.openDevTools()

  /**
   * Handle Menu Creation
   */
  const menuTemplate = getMenuTemplate(app)
  var menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  mainWindow.on('closed', () => {
    if (process.platform === 'darwin') {
      if (!mainWindow.isDocumentEdited()) {
        mainWindow = null
      } else {
      }
    } else {
      mainWindow = null
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Menu Builder
 */
function getMenuTemplate (app) {
  var template = [
    {
      label: 'File',
      submenu: [
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })

    // Edit menu
    template[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    )

    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  }

  return template
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})

/**
* I was unable to make require(file) work on the component electron main file, so for now, components electron main methods will go here in electron index.js
*/

/**
 * Screen Management
 */
ipcMain.on('maximizeWindow', (event) => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})

/**
 * LandingView Electron Main.js
 */

/**
 * Create new file Dialog
 */
ipcMain.on('save-dialog-new-project', (event) => {
  const options = {
    title: 'Create Shuttle Project',
    filters: [
      { name: 'CreateShuttle', extensions: ['shuttle'] }
    ]
  }
  dialog.showSaveDialog(options, (filename) => {
    event.sender.send('saved-file-new-project', filename)
  })
})

/**
 * Open Shuttle File Dialog
 */
ipcMain.on('open-dialog-project', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files) {
    if (files) event.sender.send('selected-directory', files)
  })
})

/**
 * Error creating new project dialog
 */
ipcMain.on('open-error-dialog-creating-project-file', function (event, args) {
  dialog.showErrorBox('Error Creating Shuttle', 'There was an error creating the shuttle file. ' + args)
})

/**
 * Handle Database Methods
 */
ipcMain.on('getCurrentProjectPathFromDB', function (event, args) {
  db.currentProject.find({ currentProject: { $exists: true } }, function (err, docs) {
    if (!err) {
      event.sender.send('sendCurrentProjectFromDB', docs)
    } else {
      event.sender.send('sendCurrentProjectErrorFromDB', err)
    }
  })
})

ipcMain.on('setCurrentProjectPathOnDB', function (event, project) {
  const currentProjectJSON = {
    currentProject: {
      projectPath: project.path,
      name: project.name
    }
  }
  db.currentProject.remove({}, { multi: true }, function (errRemoving, numRemoved) {
    if (!errRemoving) {
      console.log('DEBUG: Removed ' + numRemoved + ' Projects from memory')
      db.currentProject.insert(currentProjectJSON, function (errInserting, newDoc) {
        if (!errInserting) {
          console.log(newDoc)
          event.sender.send('sendDidSetCurrentProjectFromDB', newDoc)
        } else {
          console.log(errInserting)
          event.sender.send('sendSettingCurrentProjectErrorFromDB', errInserting)
        }
      })
    } else {
      event.sender.send('sendSettingCurrentProjectErrorFromDB', errRemoving)
      console.log(errRemoving)
    }
  })
})

/**
 * Settings Methods
 */
var settingsWindow

ipcMain.on('openProjectSettings', function (event, project) {
  const modalPath = require('path').join(winURL + '/#/settings')
  settingsWindow = new BrowserWindow({
    width: 600,
    height: 600,
    minHeight: 600,
    minWidth: 600,
    titleBarStyle: 'hidden-inset',
    center: true,
    alwaysOnTop: true,
    title: 'Project Settings',
    parent: mainWindow,
    modal: true
  })
  settingsWindow.on('close', function () { settingsWindow = null })
  settingsWindow.loadURL(modalPath)
  settingsWindow.show()
})

ipcMain.on('closeProjectSettings', function (event) {
  settingsWindow.close()
})

/**
 * Export Code Methods
 */
ipcMain.on('openExportCodeFinder', function (event) {
  const options = {
    title: 'Export Shuttle Source Code',
    properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
    buttonLabel: 'Export Here'
  }
  dialog.showOpenDialog(options, (filename) => {
    event.sender.send('savedExportCodePath', filename)
  })
})

/**
 * Document Status Methods
 */
ipcMain.on('set-document-edited', (event) => {
  if (process.platform === 'darwin') {
    mainWindow.setDocumentEdited(true)
  }
})

ipcMain.on('set-document-saved', (event) => {
  if (process.platform === 'darwin') {
    mainWindow.setDocumentEdited(false)
  }
})
