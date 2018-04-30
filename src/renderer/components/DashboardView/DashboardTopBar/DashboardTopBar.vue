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
                        <a @click="run(['IOS'])" href="#dropdowns">
                            Run iOS
                        </a>
                        </li>
                        <li class="menu-item">
                        <a @click="run(['ANDROID'])" href="#dropdowns">
                            Run Android
                        </a>
                        </li>
                        <li class="menu-item">
                        <a @click="run(['IOS', 'ANDROID'])" href="#dropdowns">
                            Run Both
                        </a>
                        </li>
                    </ul>
                </div>
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Project Settings"><font-awesome-icon icon="wrench"/><small> Settings</small></a>
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
    import Turing from '@appshuttle.io/turing'
    import Bell from '@appshuttle.io/bell'

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
          const turing = new Turing(
            this.$store.getters.getCurrentProjectPath,
            this.$store.getters.getCurrentProjectInformation,
            this.$store.getters.getCurrentProjectScreenPointers,
            []
          )
          turing.generatePlatforms(function () {
            const bell = new Bell({
              android: {
                buildPath: 'C:/Users/danie/Dropbox/Trabajo/MSA/MSAAndroid/MatchReportTool/app/build/outputs/apk/debug/app-debug.apk',
                appBundleId: 'com.mysportarena.matchreporttool',
                deviceStringID: 'Imagen_Moviles'
              },
              ios: {
                buildPath: '/Users/david/Library/Developer/Xcode/DerivedData/-APPNAME--gqvuzazsddvpdefwjofzywdgwhvv/Build/Products/Debug-iphonesimulator/-APPNAME-.app',
                appBundleId: '-EXTENSION-.-DOMAIN-.-APPNAME-',
                deviceStringID: 'iPhone X (11.3) [A5CFCCD7-C71B-4B7C-A514-FA89F5A27475] (Simulator)'
              }
            })
            bell.run()
          }, function (error) {
            console.log(error)
          })
        },
        save: function () {
          const currentScreen = this.$store.getters.getCurrentProjectScreen
          const currentScreenId = this.$store.getters.getCurrentProjectScreen.id
          console.log(currentScreenId)
          var screensToSave = {
            currentScreenId: currentScreen
          }
          ProjectManagement.methods.saveProjectToFile(this.$store.getters.getCurrentProjectPath, screensToSave).then(function () {
            console.log('Saved')
          }).catch(function (error) {
            console.log(error)
          })
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