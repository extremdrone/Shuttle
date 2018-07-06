import FileManagement from '../FileManagment/FileManagement'
import ScreenManagement from '../ScreenManagement/ScreenManagement'

export default {
  methods: {
    loadProjectPathFromDB: function () {

    },
    loadProjectFromDisk: function (path, successBlock, errorBlock) {
      var screenPointersDir = path + '/screens/screens.js'
      var promiseInformation = FileManagement.methods.readFileSync(path + '/main.json')
      var promiseScreenPointers = FileManagement.methods.readFileSync(screenPointersDir)

      Promise.all([promiseInformation, promiseScreenPointers]).then(function (values) {
        var projectInformation = JSON.parse(values[0])
        var objectScreenPointers = JSON.parse(values[1])

        if (objectScreenPointers.length > 0) {
          var firstScreenId = objectScreenPointers[0].id
          var pathFirstView = path + '/screens/' + firstScreenId + '/' + firstScreenId + '.json'
          FileManagement.methods.readFileSync(pathFirstView).then(function (object) {
            successBlock(projectInformation, objectScreenPointers, JSON.parse(object + ''))
          }).catch(function (error) {
            errorBlock(error)
          })
        } else {
          successBlock(projectInformation, objectScreenPointers, undefined)
        }
      }).catch(function (error) {
        errorBlock(error)
      })
    },
    loadProjectInformationFormDisk: function (path) {
      return new Promise((resolve, reject) => {
        FileManagement.methods.readFileSync(path).then(function (object) {
          resolve(JSON.parse(object))
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    loadProjectScreenPointersFromDisk: function (path) {
      return new Promise((resolve, reject) => {
        FileManagement.methods.readFileSync(path).then(function (object) {
          resolve(JSON.parse(object))
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    loadFirstProjectScreenFromDisk: function (path) {
      return new Promise((resolve, reject) => {
        var screenPointersDir = path + '/screens/screens.js'
        FileManagement.methods.readFileSync(screenPointersDir).then(function (object) {
          var screenPointers = JSON.parse(object)
          if (screenPointers.length > 0) {
            var firstScreenId = screenPointers[0].id
            var pathFirstView = path + '/screens/' + firstScreenId + '/' + firstScreenId + '.json'
            FileManagement.methods.readFileSync(pathFirstView).then(function (object) {
              resolve(JSON.parse(object + ''))
            }).catch(function (error) {
              reject(error)
            })
          } else {
            resolve(undefined)
          }
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    saveProjectToFile: function (path, screensDict) {
      return new Promise((resolve, reject) => {
        var screenPointersDir = path + '/screens/screens.js'
        FileManagement.methods.readFileSync(screenPointersDir).then(function (object) {
          var screenPointers = JSON.parse(object)
          if (screenPointers.length > 0) {
            ScreenManagement.methods.saveScreens(path, screensDict, function (promises) {
              Promise.all(promises).then(function (values) {
                resolve()
              }).catch(function (rejectMessage) {
                reject(rejectMessage)
              })
            }, function (errorMessage) {
              reject(errorMessage)
            })
          }
        })
      })
    }
  }
}
