<template>
    <div>
        <div class="panel">
            <div class="panel-header text-center">
                <img id="appLogoImageView" src="~@/assets/logo.png" alt=""/>
                <div class="panel-title h5 mt-10">{{ getCurrentProjectInformation.appInformation.appName }}</div>
                <div class="panel-subtitle">{{ getCurrentProjectInformation.creatorInformation.name }}</div>
            </div>
            <nav class="panel-nav">
                <ul class="tab tab-block">
                    <li class="tab-item active"><a href="#panels">App Info</a></li>
                    <li class="tab-item"><a href="#panels">Creator Info</a></li>
                    <li class="tab-item"><a href="#panels">Tasks</a></li>
                </ul>
            </nav>
            <br>
            <div class="panel-body">
                <div class="tile tile-centered">
                    <div class="tile-content">
                        <div class="tile-title text-bold">E-mail</div>
                        <div class="tile-subtitle">bruce.banner@hulk.com</div>
                    </div>
                    <div class="tile-action">
                        <button class="btn btn-link btn-action btn-lg tooltip tooltip-left" data-tooltip="Edit E-mail"><i class="icon icon-edit"></i></button>
                    </div>
                </div>
                <div class="tile tile-centered">
                    <div class="tile-content">
                        <div class="tile-title text-bold">Skype</div>
                        <div class="tile-subtitle">bruce.banner</div>
                    </div>
                    <div class="tile-action">
                        <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
                    </div>
                </div>
                <div class="tile tile-centered">
                    <div class="tile-content">
                        <div class="tile-title text-bold">Location</div>
                        <div class="tile-subtitle">Dayton, Ohio</div>
                    </div>
                    <div class="tile-action">
                        <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
                    </div>
                </div>
            </div>
            <br/>
            <div class="panel-footer">
                <button class="btn btn-primary btn-block">Save</button>
                <button @click="closeSettingsWindow()" class="btn btn-link btn-block">Close</button>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    import ProjectManagement from '../../mixins/ProjectManagement/ProjectManagement'

    const {ipcRenderer} = require('electron')

    export default {
      name: 'SettingsView',
      computed: {
        ...mapGetters([
          'getCurrentProjectInformation'
        ])
      },
      mounted () {
        const store = this.$store
        const router = this.$router
        ipcRenderer.send('getCurrentProjectPathFromDB')
        ipcRenderer.on('sendCurrentProjectFromDB', (event, currentProjects) => {
          if (currentProjects.length === 0) {
            store.dispatch('resetCurrentProject')
            router.replace('/')
          } else {
            const projectPath = currentProjects[0].currentProject.projectPath
            ProjectManagement.methods.loadProjectFromDisk(projectPath, function (projectInformation, screenPointers, firstScreen) {
              store.dispatch('setCurrentProjectInformation', projectInformation)
            }, function (errorMessage) {
              // TODO: Present error modal and handle rollback
              console.log(errorMessage)
            })
          }
        })
        ipcRenderer.on('sendCurrentProjectErrorFromDB', (event, error) => {
          // TODO: Present error modal and handle rollback
          console.log(error)
        })
      },
      methods: {
        closeSettingsWindow: function () {
          ipcRenderer.send('closeProjectSettings')
        }
      }
    }
</script>
<style scoped>
    #appLogoImageView {
        background-color: white;
        width: 40px;
        height: 40px;
    }
</style>