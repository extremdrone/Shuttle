'use strict'

import { app, BrowserWindow } from 'electron'

const Datastore = require('nedb')
var db = {}
db.projects = new Datastore({ filename: app.getPath('userData') + '/projects.db', autoload: true, timestampData: true })

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
    minHeight: 800,
    minWidth: 1000,
    show: false,
    titleBarStyle: 'hidden-inset'
  })

  mainWindow.loadURL(winURL)
  mainWindow.maximize()
  mainWindow.show()

  mainWindow.on('closed', () => {
    mainWindow = null
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
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

/**
* I was unable to make require(file) work on the component electron main file, so for now, components electron main methods will go here in electron index.js
*/

/**
 * LandingView Electron Main.js
 */
const {ipcMain, dialog} = require('electron')

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
 * Error creating new project dialog
 */
ipcMain.on('open-error-dialog-creating-project-file', function (event, args) {
  dialog.showErrorBox('Error Creating Shuttle', 'There was an error creating the shuttle file. ' + args)
})

/**
 * Handle Database Methods
 */
ipcMain.on('getCurrentProjectPathFromDB', function (event, args) {
  db.projects.find({ currentProject: { $exists: true } }, function (err, docs) {
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
  db.projects.insert(currentProjectJSON, function (err, newDoc) {
    if (!err) {
      event.sender.send('sendDidSetCurrentProjectFromDB', newDoc)
    } else {
      event.sender.send('sendSettingCurrentProjectErrorFromDB', err)
    }
  })
})
