<template>
<div>

  <!-- Header with logo and app name -->
  <div id="headerContainer" class="container">
    <img class="centered" id="logo" src="~@/assets/logo.png" alt="electron-vue" />
    <h1 id="appName"><strong>Shuttle</strong></h1>
  </div>

  <!-- Empty Container, shown when the user has no recent projects -->
  <div id="emptyContainer" class="container">
      <div class="columns">
        <div class="column col-7 col-mx-auto">
          <div class="empty">
            
            <h4><small>No recent projects</small></h4>
            <br><br>
            <div class="columns">
              <div class="column">
                <div class="empty-icon">
                  <i class="icon icon-2x icon-plus"></i>
                </div>
                <button class="btn btn-link">Create a Project</button>
              </div>
              <div class="divider-vert"></div>
              <div class="column">
                <div class="empty-icon">
                  <i class="icon icon-2x icon-share"></i>
                </div>
                <button class="btn btn-link">Open existing project...</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>

</div>
</template>

<style>

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
