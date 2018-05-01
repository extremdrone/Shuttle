import FileManagement from '../FileManagment/FileManagement'
const fs = require('fs')

export default {
  methods: {
    saveScreens: function (screensPath, screens, successBlock, errorBlock) {
      var screensPathDir = screensPath + '/screens'
      if (!fs.existsSync(screensPathDir)) {
        fs.mkdirSync(screensPathDir)
      }

      const mainScreensFileDir = screensPathDir + '/screens.js'
      if (!fs.existsSync(mainScreensFileDir)) {
        fs.writeFileSync(mainScreensFileDir, '[]')
      }

      var screensObject = []
      FileManagement.methods.readFileSync(mainScreensFileDir).then(function (object) {
        screensObject = JSON.parse(object)
        var screensPromises = []
        for (let screenId in screens) {
          let currentScreen = screens[screenId]
          var currentScreenDir = screensPathDir + '/' + currentScreen.id
          if (!checkIfScreenIsAdded(currentScreen.id, screensObject)) {
            screensObject.push({id: currentScreen.id, name: currentScreen.name})
          }
          if (!fs.existsSync(currentScreenDir)) {
            fs.mkdirSync(currentScreenDir)
          }
          screensPromises.push(FileManagement.methods.writeFileSync(currentScreenDir + '/' + currentScreen.id + '.json', JSON.stringify(currentScreen)))
        }
        FileManagement.methods.writeFileSync(mainScreensFileDir, JSON.stringify(screensObject)).then(function () {
          successBlock(screensPromises)
        }).catch(function (error) {
          errorBlock(error)
        })
      }).catch(function (error) {
        errorBlock(error)
      })

      function checkIfScreenIsAdded (screenId, array) {
        for (const screen of array) {
          if (screenId === screen.id) {
            return true
          }
        }
        return false
      }
    },
    screenWithNewElement: function (element, projectPath, screen) {
      return new Promise((resolve, reject) => {
        var newScreen = screen
        console.log(element)
        console.log(projectPath)
        console.log(screen)
        resolve(newScreen)
      })
    }
  }
}
