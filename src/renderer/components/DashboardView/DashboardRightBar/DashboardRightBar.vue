<template>
    <div id="rightBar">
        <div class="columns">
            <div id="viewSettingsContainer" class="column col-12">
              <small class="unselectable c-default"><font-awesome-icon icon="sliders-h"/> Inspector</small>
              <div class="divider"></div>
            </div>
            <div v-if="!currentElement || currentElement.elementID == ''" id="inspectorEmptyContent" class="column col-12">
                <div class="empty" id="inspectorEmptyDiv">
                    <div class="empty-icon">
                        <font-awesome-icon :icon="['far', 'hand-pointer']"/>
                    </div>
                    <p class="empty-subtitle unselectable c-default">Select a view or element first</p>
                </div>
            </div>
            <div v-if="currentElement && currentElement.elementID !== ''" id="inspectorContent" class="column col-12">
                <table v-show="currentElement.view" id="table-viewSettings" class="table">
                    <thead>
                        <tr>
                        <th><small><a>Element View</a></small></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><small>Background Color</small></td>
                        <td><div v-on:click="setCurrentPicker('view.backgroundColor')" class="circle colorBug c-hand" v-bind:style="{'background-color': currentElement.view.backgroundColor.hex}"></div></td>
                        <div v-show="currentPicker == 'view.backgroundColor'" id="view.backgroundColor" class="colorPicker">
                            <chrome-picker v-model="currentElement.view.backgroundColor" />
                            <a v-on:click="setCurrentPicker('view.backgroundColor')" class="btn btn-primary btn-ClosePicker">Close</a>
                        </div>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table v-show="currentElement.title" id="table-titleSettings" class="table">
                    <thead>
                        <tr>
                        <th><small><a>Title Settings</a></small></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><small>Button Text</small></td>
                        <td><small><input v-model="currentElement.title.text" placeholder="Button Title"></small></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import { Chrome } from 'vue-color'
    import { mapGetters } from 'vuex'

    export default {
      name: 'DashboardRightBar',
      data: function () {
        return {
          currentPicker: 'NONE'
        }
      },
      components: {
        FontAwesomeIcon,
        'chrome-picker': Chrome
      },
      computed: {
        ...mapGetters([
          'getCurrentSelectedElementID',
          'getCurrentProjectScreen'
        ]),
        currentScreen: {
          get () {
            if (!this.$store.getters.getCurrentProjectScreen) {
              return
            }
            return this.$store.getters.getCurrentProjectScreen
          },
          set (value) {
            this.$store.dispatch('setCurrentProjectScreen', value)
          }
        },
        currentElement: {
          get () {
            if (!this.$store.getters.getCurrentSelectedElementID) {
              return
            }
            return this.$store.getters.getCurrentProjectScreen.elements[this.$store.getters.getCurrentSelectedElementID.elementID]
          },
          set (value) {
            this.$store.dispatch('setCurrentProjectScreen', value)
          }
        }
      },
      methods: {
        setCurrentPicker: function (pickerId) {
          if (this.currentPicker === 'NONE') {
            this.currentPicker = pickerId
          } else {
            this.currentPicker = 'NONE'
          }
        }
      }
    }
</script>
<style scoped>
    #rightBar {
        background-color: #ffffff;
        position: absolute;
        top: 80px;
        right: 0px;
        width: 250px;
        bottom: 0px;
        border-left: 1px solid #eaeaea;
    }
    #viewSettingsContainer {
      padding-left: 20px;
      padding-top: 20px;
      padding-right: 20px;
    }

    #inspectorEmptyDiv {
        background-color: #ffffff;
    }

    .colorBug {
        width: 20px;
        height: 20px;
        border-color: #dfdfdf;
        border-width: 2px;
        border-style: solid;
    }

    .colorPicker {
        position: absolute;
        top: 100px;
        right:260px;
    }

    .btn-ClosePicker {
        width: 100%;
    }
</style>