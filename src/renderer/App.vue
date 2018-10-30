<template>
  <div id="app">
    <div v-on:dblclick="maximize()" style="-webkit-app-region: drag; width: 100%; height: 35px;">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  const { ipcRenderer } = require('electron')

  export default {
    name: 'Shutte',
    methods: {
      maximize: function () {
        ipcRenderer.send('maximizeWindow')
      }
    }
  }
</script>

<style lang="scss">
  $primary-color: #029FDD;
  @import "node_modules/spectre.css/src/spectre";
  @import "node_modules/spectre.css/src/spectre-exp";
  @import "node_modules/spectre.css/src/spectre-icons";

  #container {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
  }

  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .c-default {
    cursor: default;
  }

  .c-add {
    cursor: copy;
  }

  br {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
}

</style>
