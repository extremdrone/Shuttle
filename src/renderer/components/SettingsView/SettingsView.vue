<template>
    <div>
        <div class="panel panel-settings">
            <div class="panel-header text-center">
                <img id="appLogoImageView" src="~@/assets/logo.png" alt=""/>
                <div class="panel-title h5 mt-10">{{ getCurrentProjectInformation.appInformation.appName }}</div>
                <div class="panel-subtitle">{{ getCurrentProjectInformation.creatorInformation.name }}</div>
            </div>
            <nav class="panel-nav">
                <ul class="tab tab-block">
                    <li v-for="(tab, index) in getProjectSettingsTabHost.tabs" v-bind:item="tab" v-bind:index="index" v-bind:key="tab.position" v-bind:class="{ active: getCurrentProjectSettingsSelectedTab === tab.position, 'tab-item': true }">
                        <a class="c-hand unselectable" @click="changedSettingsTab(tab.position)">{{tab.title}}</a>
                    </li>
                </ul>
            </nav>
            <ProjectAppSettings v-show="getCurrentProjectSettingsSelectedTab == 0"></ProjectAppSettings>
            <ProjectCreatorSettings v-show="getCurrentProjectSettingsSelectedTab == 1"></ProjectCreatorSettings>
            <OtherProjectSettings v-show="getCurrentProjectSettingsSelectedTab == 2"></OtherProjectSettings>
            <br/>
            <div class="panel-footer">
                <button @click="closeSettingsWindow()" class="btn btn-primary btn-block">Close</button>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    import ProjectManagement from '../../mixins/ProjectManagement/ProjectManagement'

    import ProjectAppSettings from './ProjectAppSettings/ProjectAppSettings.vue'
    import ProjectCreatorSettings from './ProjectCreatorSettings/ProjectCreatorSettings.vue'
    import OtherProjectSettings from './OtherProjectSettings/OtherProjectSettings.vue'

    const {ipcRenderer} = require('electron')

    export default {
      name: 'SettingsView',
      components: {
        ProjectAppSettings,
        ProjectCreatorSettings,
        OtherProjectSettings
      },
      computed: {
        ...mapGetters([
          'getCurrentProjectInformation',
          'getProjectSettingsTabHost',
          'getCurrentProjectSettingsSelectedTab'
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
        changedSettingsTab: function (tab) {
          this.$store.dispatch('setProjectSettingsSelectedTab', tab)
        },
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

    .panel-settings {
        border: none;
    }
</style>