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
                <div class="popover popover-bottom">
                  <button class="btn btn-link"><font-awesome-icon icon="play"/><small> Run</small></button>
                  <div class="popover-run popover-container">
                    <ul class="menu">
                      <li class="menu-item">
                        <div class="popover-menu-title unselectable c-default tile tile-centered">
                          <div class="tile-icon"><small><font-awesome-icon icon="play"/></small></div>
                          <div class="tile-content"><small>Run</small></div>
                        </div>
                      </li>
                      <li class="divider"></li>
                      <li class="menu-item c-hand">
                        <div class="menu-badge">
                          <label class="label label-primary"><font-awesome-icon :icon="['fab', 'apple']"/></label>
                        </div><a @click="showRunModal(true, 'IOS')">Run iOS</a>
                      </li>
                      <li class="menu-item c-hand">
                        <div class="menu-badge">
                          <label class="label label-primary"><font-awesome-icon :icon="['fab', 'android']"/></label>
                        </div><a @click="showRunModal(true, 'ANDROID')">Run Android</a>
                      </li>
                      <li class="menu-item c-hand">
                        <div class="menu-badge">
                          <label class="label label-primary"><font-awesome-icon icon="mobile-alt"/></label>
                        </div><a @click="showRunModal(true, 'BOTH')">Run Both</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <a @click="openProjectSettings()" class="btn btn-link"><font-awesome-icon icon="wrench"/><small> Settings</small></a>
                <div class="popover popover-bottom">
                  <button class="btn btn-link"><font-awesome-icon icon="share-square"/><small> Share</small></button>
                  <div class="popover-share popover-container">
                    <ul class="menu">
                      <li class="menu-item">
                        <div class="popover-menu-title unselectable c-default tile tile-centered">
                          <div class="tile-icon"><small><font-awesome-icon icon="share-square"/></small></div>
                          <div class="tile-content"><small>Share</small></div>
                        </div>
                      </li>
                      <li class="divider"></li>
                      <li class="menu-item c-not-allowed">
                        <div class="menu-badge">
                          <label class="label label-primary"><small><font-awesome-icon icon="cloud"/></small></label>
                        </div><a>Upload to Shuttle Cloud</a>
                      </li>
                      <li class="menu-item c-hand">
                        <div class="menu-badge">
                          <label class="label label-primary"><small><font-awesome-icon icon="code"/></small></label>
                        </div><a @click="exportCode()">Export Source Code</a>
                      </li>
                    </ul>
                  </div>
                </div>

            </section>
        </header>
        <div class="divider"></div>
        <div v-bind:class="{ 'modal': true, 'active': getShowRunModal }" id="example-modal-2">
          <a @click="showRunModal(false)" class="modal-overlay" aria-label="Close"></a>
          <div class="modal-container" role="document">
            <div class="modal-header">
              <a @click="showRunModal(false)" class="btn btn-clear float-right" aria-label="Close"></a>
              <div class="modal-title h5 unselectable c-default"><strong>Select Run Target</strong></div>
            </div>
            <div class="modal-body">
              <div class="content" v-if="getRunTargets.iOS">
                <ul class="tab tab-block">
                  <li v-bind:class="{ 'tab-item': true, 'active': ((getSelectediOSRuntime) ? getSelectediOSRuntime.identifier == runtime.identifier : false ) }" v-for="runtime in getRunTargets.iOS.runtimes" v-bind:key="runtime.identifier">
                    <a @click="setRuntime(runtime, 'IOS')" class="c-hand unselectable">{{runtime.name}}</a>
                  </li>
                </ul>
                <div class="columns" v-if="getSelectediOSRuntime">
                  <div class="column col-12">
                    <label class="form-label unselectable" for="input-example-7"><small>Simulators:</small></label>
                  </div>
                  <div class="column col-12" v-for="simulator in getRunTargets.iOS.devices[getSelectediOSRuntime.name]" v-bind:key="simulator.udid">
                    <div class="chip c-hand" @click="setDevice(simulator, 'IOS')">
                      <figure class="avatar avatar-sm" data-initial="" style="background-color: #cacaca;"></figure>
                      {{ simulator.name}} &nbsp; <small>{{ simulator.availability }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <a @click="showRunModal(false)" class="btn btn-link" aria-label="Close">Cancel</a>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    import ProjectManagement from '../../../mixins/ProjectManagement/ProjectManagement'
    import FileManagement from '../../../mixins/FileManagment/FileManagement'
    import { mapGetters } from 'vuex'
    import SHTuring from '@appshuttle.io/turing'
    import Bell from '@appshuttle.io/bell'

    const {ipcRenderer} = require('electron')

    export default {
      name: 'DashboardTopBar',
      mounted () {
        const thisRef = this
        ipcRenderer.on('savedExportCodePath', function (event, path) {
          thisRef.save(function (success) {
            thisRef.$store.dispatch('setBottomLoadingTextMode', 'Building Project...', 'INDEFINITE')
            const turing = new SHTuring(thisRef.$store.getters.getCurrentProjectPath, {appPlatforms: 'IOS', exportPath: path})
            turing.generatePlatforms(function () {
              console.log('Success Creating Projects')
            }, function (err) {
              console.log(err)
            })
          })
        })
      },
      computed: {
        ...mapGetters([
          'getCurrentProjectPath',
          'getShowRunModal',
          'getRunModalPlatform',
          'getRunTargets',
          'getSelectediOSRuntime'
        ])
      },
      mixins: [
        ProjectManagement,
        FileManagement
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
                    deviceStringID: thisRef.$store.getters.getSelectediOSDevice.udid
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
        },
        exportCode: function () {
          ipcRenderer.send('openExportCodeFinder')
        },
        showRunModal: function (show, platform) {
          if (typeof platform !== 'undefined') {
            this.$store.dispatch('setRunModalPlatform', platform)
            if (show === true) {
              const contextStore = this.$store
              const bell = new Bell()
              bell.getAvailableRunTargets(platform).then(function (value) {
                contextStore.dispatch('setRunTargets', value)
              }).catch(function (error) {
                console.log(error)
              })
            }
          } else {
            this.$store.dispatch('setRunModalPlatform', undefined)
          }
          this.$store.dispatch('setShowRunModal', show)
        },
        setRuntime: function (runtime, platform) {
          switch (platform) {
            case 'IOS':
              this.$store.dispatch('setSelectediOSRuntime', runtime)
              break
            default:
              break
          }
        },
        setDevice: function (device, platform) {
          switch (platform) {
            case 'IOS':
              this.$store.dispatch('setSelectediOSDevice', device)
              break
            default:
              break
          }
          this.showRunModal(false)
          this.run(this.$store.getters.getRunModalPlatform)
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

    .popover.popover-bottom .popover-share {
        left: -100px;
    }

    .popover-menu-title {
        color: #a0a0a0;
    }
</style>