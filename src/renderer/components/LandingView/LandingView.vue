<template>
<div>
  <!-- Header with logo and app name -->
  <div id="headerContainer" class="container">
    <img class="centered" id="logo" src="~@/assets/logo.png" alt="electron-vue"/>
    <h1 id="appName"><strong>{{header.appName}}</strong></h1>
  </div>

  <!-- Empty Container, shown when the user has no recent projects -->
  <div v-show="recentProjects.projects.length === 0" id="emptyContainer" class="container">
      <div class="columns">
        <div class="column col-7 col-mx-auto">
          <div class="empty"> 
            <h4><small>{{recentProjects.emptyProjectsText}}</small></h4>
            <br><br>
            <div class="columns">
              <div v-on:click="createProject" class="column">
                <div class="empty-icon">
                  <i class="icon icon-2x icon-plus"></i>
                </div>
                <button class="btn btn-link">{{recentProjects.createProjectButtonText}}</button>
              </div>
              <div class="divider-vert"></div>
              <div class="column">
                <div class="empty-icon">
                  <i class="icon icon-2x icon-share"></i>
                </div>
                <button class="btn btn-link">{{recentProjects.openProjectButtonText}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>

</div>
</template>

<script>
  
  const {ipcRenderer} = require('electron')
  const fs = require('fs')

  export default {
    name: 'LandingView',
    data () {
      return {
        header: {
          appName: 'Shuttle'
        },
        recentProjects: {
          projects: [],
          emptyProjectsText: 'No recent projects',
          createProjectButtonText: 'Create a Project',
          openProjectButtonText: 'Open existing project...'
        }
      }
    },
    methods: {
      createProject: function () {
        ipcRenderer.send('save-dialog-new-project')
      }
    }
  }

  ipcRenderer.on('saved-file-new-project', (event, path) => {
    if (!path) return
    fs.writeFile(path, 'Test', (err) => {
      if (err) {
        ipcRenderer.send('open-error-dialog-creating-project-file', err.message)
      }
    })
  })
</script>

<style scoped>

  #headerContainer {
    margin-top: 60px;
  }

  #appName {
    text-align: center;
  }

  #emptyContainer {
    margin-top: 60px;
  }

  #logo {
    height: 150px;
    margin-bottom: 20px;
    width: auto;
  }
</style>