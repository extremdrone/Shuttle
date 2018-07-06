<template>
    <div>
        <header id="navbar" class="navbar">
            <section class="navbar-section">
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Go back one step"><font-awesome-icon icon="undo"/><small> Undo</small></a>
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Go one step further"><font-awesome-icon icon="redo"/><small> Redo</small></a>
                <a @click="save()" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Save your current project"><font-awesome-icon icon="save"/><small> Save</small></a>
            </section>
            <section class="navbar-center">
                <img class="centered unselectable" id="logo" src="~@/assets/logo.png" alt="Shuttle"/>
            </section>
            <section class="navbar-section">
                <div class="dropdown">
                    <a class="btn btn-link dropdown-toggle" tabindex="0"><font-awesome-icon icon="play"/><small> Run</small></a>
                    <ul class="menu">
                        <li class="menu-item">
                        <a @click="run('IOS')" href="#dropdowns">
                            Run iOS
                        </a>
                        </li>
                        <li class="menu-item">
                        <a @click="run('ANDROID')" href="#dropdowns">
                            Run Android
                        </a>
                        </li>
                        <li class="menu-item">
                        <a @click="run('BOTH')" href="#dropdowns">
                            Run Both
                        </a>
                        </li>
                    </ul>
                </div>
                <a @click="openProjectSettings()" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Project Settings"><font-awesome-icon icon="wrench"/><small> Settings</small></a>
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Share your app"><font-awesome-icon icon="share-square"/><small> Share</small></a>

            </section>
        </header>
        <div class="divider"></div>
    </div>
</template>
<script>
    import ProjectManagement from '../../../mixins/ProjectManagement/ProjectManagement'
    import { mapGetters } from 'vuex'
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import SHTuring from '@appshuttle.io/turing'
    import Bell from '@appshuttle.io/bell'

    const {ipcRenderer} = require('electron')

    export default {
      name: 'DashboardTopBar',
      components: {
        FontAwesomeIcon
      },
      computed: {
        ...mapGetters([
          'getCurrentProjectPath'
        ])
      },
      mixins: [
        ProjectManagement
      ],
      methods: {
        run: function (platforms) {
          const thisRef = this
          this.save(function (success) {
            thisRef.$store.dispatch('setBottomLoadingTextMode', 'Building Project...', 'INDEFINITE')
            const turing = new SHTuring(thisRef.$store.getters.getCurrentProjectPath, {appPlatforms: platforms})
            turing.generatePlatforms(function () {
              console.log('Success Creating Projects')
              const buildResult = turing.buildPlatforms()

              const bellDict = {}

              if (buildResult.IOS) {
                buildResult.IOS.then(function (value) {
                  bellDict.ios = {
                    buildPath: value,
                    appBundleId: 'ORG-IDENTIFIER.APP-NAME',
                    deviceStringID: 'D7A3FEDE-B858-4A2B-9AE2-495C193A1D7E'
                  }

                  thisRef.$store.dispatch('setBottomLoadingTextMode', 'Running Project...', 'INDEFINITE')
                  const bell = new Bell(bellDict)
                  bell.run().then(function (values) {
                    thisRef.$store.dispatch('stopBottomLoadingMode')
                    console.log('Apps runnning')
                  }).catch(function (error) {
                    console.log(error)
                  })
                }).catch(function (error) {
                  console.log(error)
                })
              }

              if (buildResult.ANDROID) {
                buildResult.ANDROID.then(function (value) {
                  console.log(value)
                }).catch(function (error) {
                  console.log(error)
                })
              }
            }, function (err) {
              console.log(err)
            })
          }, function (error) {
            console.log(error)
          })
        },
        save: function (successBlock, errorBlock) {
          this.$store.dispatch('setBottomLoadingTextMode', 'Saving Project...', 'INDEFINITE')

          const store = this.$store

          const currentScreen = this.$store.getters.getCurrentProjectScreen
          const currentScreenId = this.$store.getters.getCurrentProjectScreen.id
          var screensToSave = {}
          screensToSave[currentScreenId] = currentScreen
          ProjectManagement.methods.saveProjectToFile(this.$store.getters.getCurrentProjectPath, screensToSave).then(function () {
            console.log('Saved')
            if (typeof successBlock !== 'undefined') {
              successBlock('Saved Project')
            } else {
              store.dispatch('stopBottomLoadingMode')
            }
          }).catch(function (error) {
            console.log(error)
            store.dispatch('stopBottomLoadingModeWithError', 'Error Saving Project')
            if (typeof errorBlock !== 'undefined') {
              errorBlock(error)
            }
          })
        },
        openProjectSettings: function () {
          ipcRenderer.send('openProjectSettings')
        }
      }
    }
</script>
<style scoped>

    #navbar {
        width: 98vw;
        margin-left: 1vw;
    }

    #logo {
        height: 30px;
        width: auto;
    }

</style>