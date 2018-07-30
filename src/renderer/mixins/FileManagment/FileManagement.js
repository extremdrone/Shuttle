const fs = require('fs')

export default {
  methods: {
    writeFileAsync: function (filePath, content) {
      return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err) => {
          if (err) {
            reject(err.message)
          } else {
            resolve()
          }
        })
      })
    },
    writeFileSync: function (filePath, content) {
      return new Promise((resolve, reject) => {
        try {
          fs.writeFileSync(filePath, content)
          resolve()
        } catch (error) {
          reject(error.message)
        }
      })
    },
    readFileSync: function (filePath) {
      return new Promise((resolve, reject) => {
        try {
          const object = fs.readFileSync(filePath)
          resolve(object)
        } catch (error) {
          reject(error.message)
        }
      })
    },
    deleteDirIfExistsSync: function (filePath) {
      const thisRef = this
      return new Promise((resolve, reject) => {
        try {
          if (fs.existsSync(filePath)) {
            fs.readdirSync(filePath).forEach(function (file, index) {
              var curPath = filePath + '/' + file
              if (fs.lstatSync(curPath).isDirectory()) { // recurse
                thisRef.deleteDirIfExistsSync(curPath)
              } else { // delete file
                fs.unlinkSync(curPath)
              }
            })
            fs.rmdirSync(filePath)
          }
          resolve()
        } catch (err) {
          reject(err.message)
        }
      })
    }
  }
}
