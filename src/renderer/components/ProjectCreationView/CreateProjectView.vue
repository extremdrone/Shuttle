<template>
    <div>
        <!-- Stepper containing the current active step -->
        <div id="stepperContainer">
            <ul class="step">
                <li v-for="(step, index) in getStepperInfo.steps" v-bind:item="step" v-bind:index="index" v-bind:key="step.position" v-bind:class="{ active: getStepperInfo.currentStep === step.position, 'step-item': true }">
                    <a class="tooltip unselectable c-default" v-bind:data-tooltip="step.toolTip">{{ step.title }}</a>
                </li>
            </ul>
        </div>
        <router-view></router-view>
        <div class="columns">
            <div class="col-10 col-mx-auto" id="stepsBottomBar">
                <div class="divider"></div>
                <header class="navbar">
                    <section class="navbar-section">
                        <a v-on:click="goToPage('BACK')" class="btn btn-gray">{{ getStepperInfo.currentStep === 1 ? 'Cancel':'Previous Step' }}</a>
                    </section>
                    <section class="navbar-center">
                    </section>
                    <section class="navbar-section">
                        <a v-on:click="goToPage('NEXT')" v-bind:class="{ 'btn': true, 'btn-primary':true, 'disabled c-not-allowed': !isInformationDone(getStepperInfo.currentStep)}">{{ getStepperInfo.currentStep === 3 ? 'Go to my App!':'Next Step' }}</a>
                    </section>
                </header>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import FileManagement from '../../mixins/FileManagment/FileManagement'
    import ScreenManagement from '../../mixins/ScreenManagement/ScreenManagement'
    import MailManagement from '../../mixins/MailManagement/MailManagement'

    const { ipcRenderer } = require('electron')

    export default {
      name: 'CreateProjectView',
      data () {
        return {
          images: {
            ShuttlePlaceholder: {
              data: this.$store.getters.getSHImageViewPlaceholder,
              type: 'IMAGE',
              name: 'ShuttlePlaceholder.png'
            }
          }
        }
      },
      methods: {
        isInformationDone: function (step) {
          switch (step) {
            case 1: {
              return this.$store.getters.isNewAppInformationComplete
            }
            case 2: {
              if (!MailManagement.methods.validateEmailAddress(this.$store.getters.getNewCreatorEmail)) {
                return false
              }
              return this.$store.getters.isNewCreatorInformationComplete
            }
            case 3: {
              return true
            }
          }
        },
        goToPage: function (direction) {
          if (direction === 'NEXT') {
            if (this.$store.getters.getStepperInfo.currentStep === 3) {
              const projectPath = this.$store.getters.getProjectPath.path
              const newProjectJSON = this.$store.getters.getNewProject
              const sampleProjectScreens = this.$store.getters.getSampleProjectScreens
              const router = this.$router
              const thisRef = this
              writeNewProjectInfo(projectPath, newProjectJSON, function () {
                var assets = [thisRef.images.ShuttlePlaceholder]
                addNewProjectDefaultAssets(projectPath, assets, function (values) {
                  generateHelloWorld(projectPath, sampleProjectScreens, function () {
                    ipcRenderer.send('setCurrentProjectPathOnDB', { path: projectPath, name: newProjectJSON.appInformation.appName })
                    ipcRenderer.on('sendDidSetCurrentProjectFromDB', (event, currentProject) => {
                      router.replace('/dashboard')
                    })
                    ipcRenderer.on('sendSettingCurrentProjectErrorFromDB', (event, error) => {
                      console.log(error)
                    })
                  }, function (errorMessage) {
                    // TODO: Present error modal and handle rollback
                    console.log(errorMessage)
                  })
                }, function (errorMessage) {
                  console.log(errorMessage)
                })
              }, function (errorMessage) {
                // TODO: Present error modal and handle rollback
                console.log(errorMessage)
              })
            }
            this.$store.dispatch('goToNextPage')
          } else {
            if (this.$store.getters.getStepperInfo.currentStep === 1) {
              this.$store.dispatch('resetNewProject')
              this.$router.go(-1)
            } else {
              this.$store.dispatch('goToPreviousPage')
            }
          }
          switch (this.$store.getters.getStepperInfo.currentStep) {
            case 1: {
              this.$router.replace('/createProject/newAppInformation')
              break
            }
            case 2: {
              this.$router.replace('/createProject/newCreatorInformation')
              break
            }
            case 3: {
              this.$router.replace('/createProject/newAppDone')
              break
            }
          }
        }
      },
      mixins: [
        FileManagement
      ],
      computed: {
        ...mapGetters([
          'getStepperInfo'
        ])
      }
    }

    function writeNewProjectInfo (path, projectInfo, success, error) {
      // FileManagement.methods.deleteDirIfExistsSync(path).then(function () {
      // }).catch(function (errorMessage) {
      //   error(errorMessage)
      // })
      FileManagement.methods.writeFileSync(path + '/main.json', JSON.stringify(projectInfo)).then(function () {
        success()
      }).catch(function (errorMessage) {
        error(errorMessage)
      })
    }

    function addNewProjectDefaultAssets (path, assets, success, error) {
      var assetsPromises = []
      for (const asset of assets) {
        if (asset.type === 'IMAGE') {
          assetsPromises.push(FileManagement.methods.writeImageWithDataSync(asset.data, path + '/assets/images/' + asset.name))
        }
      }
      Promise.all(assetsPromises).then(function (values) {
        success(values)
      }).catch(function (err) {
        error(err)
      })
    }

    function generateHelloWorld (path, screens, success, error) {
      ScreenManagement.methods.saveScreens(path, screens, function (promises) {
        Promise.all(promises).then(function (values) {
          success()
        }).catch(function (rejectMessage) {
          error(rejectMessage)
        })
      }, function (errorMessage) {
        error(errorMessage)
      })
    }
</script>

<style scoped>
    #stepsBottomBar {
        margin-top: 60px;
    }
</style>

