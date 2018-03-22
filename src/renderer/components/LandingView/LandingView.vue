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
              <div v-on:click="createProject" class="column c-hand">
                <div class="empty-icon">
                  <i class="icon icon-2x icon-plus"></i>
                </div>
                <button class="btn btn-link">{{recentProjects.createProjectButtonText}}</button>
              </div>
              <div class="divider-vert"></div>
              <div class="column c-hand">
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


  <!-- Footer View with legal and contact information  -->
  <header id="landingFooter" class="navbar">
    <section class="navbar-section">
    </section>
    <section class="navbar-center">
      <!-- centered logo or brand -->
      <p id="textFooter"><small>Shuttle V{{footer.appVersionNumber}} <br> Copyright © 2018 AppShuttle.io. <br> By using this app or any of its services you accept our <a class="c-hand" v-on:click="goToLegalDocument('TERMS')">Terms &amp; Conditions</a>, <a class="c-hand" v-on:click="goToLegalDocument('EULA')">EULA</a> and <a class="c-hand" v-on:click="goToLegalDocument('PRIVACY')">Privacy Policy.</a></small></p>
    </section>
    <section class="navbar-section">
    </section>
  </header>

</div>
</template>

<script>
  import router from '../../router'
  import store from '../../store'

  const {ipcRenderer} = require('electron')
  const fs = require('fs')
  const {app} = require('electron').remote
  const shell = require('electron').shell

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
        },
        footer: {
          appVersionNumber: app.getVersion()
        }
      }
    },
    methods: {
      createProject: function () {
        ipcRenderer.send('save-dialog-new-project')
      },
      goToLegalDocument: function (legalDocumentType) {
        handleOpenLegalDocument(legalDocumentType)
      }
    }
  }

  ipcRenderer.on('saved-file-new-project', (event, path) => {
    if (!path) return
    createShuttleFileFolder(path, function (err) {
      if (err) {
        ipcRenderer.send('open-error-dialog-creating-project-file', err.message)
      } else {
        store.dispatch('setProjectPath', {
          path
        })
        router.replace('/createProject/newAppInformation')
      }
    })
  })

  function handleOpenLegalDocument (legalDocumentType) {
    switch (legalDocumentType) {
      case 'TERMS': {
        shell.openExternal('https://firebasestorage.googleapis.com/v0/b/appshuttle-69c81.appspot.com/o/documents%2FOnline%20Terms%20and%20Conditions.pdf?alt=media')
        break
      }
      case 'EULA': {
        shell.openExternal('https://firebasestorage.googleapis.com/v0/b/appshuttle-69c81.appspot.com/o/documents%2FEnd%20User%20License%20Agreement.pdf?alt=media')
        break
      }
      case 'PRIVACY': {
        shell.openExternal('https://firebasestorage.googleapis.com/v0/b/appshuttle-69c81.appspot.com/o/documents%2FOnline%20Privacy%20Policy.pdf?alt=media')
        break
      }
      default: {
        break
      }
    }
  }

  function createShuttleFileFolder (path, mask, cb) {
    if (typeof mask === 'function') { // allow the `mask` parameter to be optional
      cb = mask
      mask = '0777'
    }
    fs.mkdir(path, mask, function (err) {
      if (err) {
        if (err.code === 'EEXIST') cb(null) // ignore the error if the folder already exists
        else cb(err) // something else went wrong
      } else cb(null) // successfully created folder
    })
  }
</script>

<style scoped>

  #headerContainer {
    margin-top: 60px;
  }

  #appName {
    text-align: center;
  }

  #emptyContainer {
    margin-top: 40px;
  }

  #logo {
    height: 150px;
    margin-bottom: 20px;
    width: auto;
  }

  #landingFooter {
    position: absolute;
    width: 80vw;
    margin-left: 10vw;
    bottom: 0px;
  }

  #textFooter {
    text-align: center;
  }
</style>