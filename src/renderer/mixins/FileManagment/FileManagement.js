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
          reject(error)
        }
      })
    },
    readFileSync: function (filePath) {
      return new Promise((resolve, reject) => {
        try {
          const object = fs.readFileSync(filePath)
          resolve(object)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
