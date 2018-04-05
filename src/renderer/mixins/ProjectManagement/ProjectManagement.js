import FileManagement from '../FileManagment/FileManagement'

export default {
  methods: {
    loadProjectFromDisk: function (path, successBlock, errorBlock) {
      var screenPointersDir = path + '/screens/screens.js'
      var promiseInformation = FileManagement.methods.readFileSync(path + '/main.json')
      var promiseScreenPointers = FileManagement.methods.readFileSync(screenPointersDir)
      Promise.all([promiseInformation, promiseScreenPointers]).then(function (values) {
        var projectInformation = JSON.parse(values[0])
        var objectScreenPointers = JSON.parse(values[1])
        successBlock(projectInformation, objectScreenPointers)
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
    loadProjectScreensFromDisk: function (path) {
      return new Promise((resolve, reject) => {
        FileManagement.methods.readFileSync(path).then(function (object) {
          resolve(JSON.parse(object))
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    setCurrentProject: function (information, screens, screenPointers, state) {
      state.dispatch('setCurrentProject', information, screens, screenPointers)
    }
  }
}
