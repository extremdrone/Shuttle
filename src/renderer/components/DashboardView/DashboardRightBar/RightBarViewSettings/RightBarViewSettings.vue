<template>
    <table id="table-viewSettings" class="table">
        <thead @click="toggleShowSection('showView')" class="c-hand unselectable">
            <tr>
            <th>
              <small>
                  <font-awesome-icon v-show="getSettingsShowState.showView" icon='chevron-circle-up' class="settings-show-arrow"/>
                  <font-awesome-icon v-show="!getSettingsShowState.showView" icon='chevron-circle-down' class="settings-show-arrow"/>
                  <a>View</a>
              </small>
            </th>
            <th></th>
            </tr>
        </thead>
        <tbody v-show="getSettingsShowState.showView">
            <tr>
                <td><small>Background Color</small></td>
                <td><div v-on:click="setCurrentPicker('view.backgroundColor')" class="circle colorBug c-hand" v-bind:style="{'background-color': currentElement.view.backgroundColor.hex}"></div></td>
                <div v-show="currentPicker == 'view.backgroundColor'" id="view.backgroundColor" class="colorPicker">
                    <chrome-picker v-model="currentElement.view.backgroundColor" />
                    <a v-on:click="setCurrentPicker('view.backgroundColor')" class="btn btn-primary btn-ClosePicker">Close</a>
                </div>
            </tr>
            <tr>
                <td><small>Hidden:</small></td>
                <td>
                    <div class="form-group">
                    <label class="form-switch">
                        <input type="checkbox">
                        <i class="form-icon"></i>
                    </label>
                    </div>
                </td>
            </tr>
            <tr>
                <td><small>Allow User Interaction:</small></td>
                <td>
                    <div class="form-group">
                    <label class="form-switch">
                        <input type="checkbox">
                        <i class="form-icon"></i>
                    </label>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import { Chrome } from 'vue-color'

    import { mapGetters } from 'vuex'

    export default {
      name: 'RightBarViewSettings',
      data: function () {
        return {
          currentPicker: 'NONE'
        }
      },
      components: {
        'chrome-picker': Chrome
      },
      computed: {
        ...mapGetters([
          'getCurrentSelectedElementID',
          'getCurrentProjectScreen',
          'getSettingsShowState'
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
            this.$store.dispatch('setSelectedElementID', value.elementID)
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
        },
        setHidden: function () {
        },
        setUserInteraction: function () {
        },
        toggleShowSection: function (showID) {
          const dict = { itemID: showID, show: !this.$store.getters.getSettingsShowState[showID] }
          this.$store.dispatch('setShowStateSettingsItem', dict)
        }
      }
    }
</script>
<style scoped>

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
    
    .settings-show-arrow {
        color: #029FDD;
        margin-right: 0px;
    }

    .table {
        width: 90%;
        margin-left: 5%;
        background: #F0F1F4;
        border-radius: 10px;
        overflow: hidden;
        table-layout:fixed;
    }

</style>

