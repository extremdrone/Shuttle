<template>
    <div>
      <DashboardTopBar></DashboardTopBar>
      <div>
        <DashboardLeftBar></DashboardLeftBar>
        <DashboardCanvas></DashboardCanvas>
        <DashboardRightBar></DashboardRightBar>
      </div>
      <DashboardBottomBar></DashboardBottomBar>
    </div>
</template>
<script>
    import DashboardTopBar from './DashboardTopBar/DashboardTopBar.vue'
    import DashboardLeftBar from './DashboardLeftBar/DashboardLeftBar.vue'
    import DashboardBottomBar from './DashboardBottomBar/DashboardBottomBar.vue'
    import DashboardRightBar from './DashboardRightBar/DashboardRightBar.vue'
    import DashboardCanvas from './DashboardCanvas/DashboardCanvas.vue'

    import ProjectManagement from '../../mixins/ProjectManagement/ProjectManagement'

    const { ipcRenderer } = require('electron')

    export default {
      name: 'DashboardView',
      components: {
        DashboardTopBar,
        DashboardLeftBar,
        DashboardBottomBar,
        DashboardRightBar,
        DashboardCanvas
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
              store.dispatch('resetCurrentProject')
              store.dispatch('setCurrentProjectPath', projectPath)
              store.dispatch('setCurrentProjectInformation', projectInformation)
              store.dispatch('setCurrentProjectScreenPointers', screenPointers)
              store.dispatch('setCurrentProjectScreen', firstScreen)
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
      }
    }
</script>
<style scoped>
</style>