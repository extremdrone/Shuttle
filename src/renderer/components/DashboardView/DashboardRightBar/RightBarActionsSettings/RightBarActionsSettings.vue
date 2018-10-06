<template>
  <div>
    <table id="table-titleActions" class="table">
        <thead @click="toggleShowSection('showActions')" class="c-hand unselectable">
            <tr>
            <th>
              <small>
                  <font-awesome-icon v-show="getSettingsShowState.showActions" icon='chevron-circle-up' class="settings-show-arrow"/>
                  <font-awesome-icon v-show="!getSettingsShowState.showActions" icon='chevron-circle-down' class="settings-show-arrow"/>
                  <a>Actions</a>
              </small>
            </th>
            <th></th>
            </tr>
        </thead>
        <tbody v-show="getSettingsShowState.showActions">
            <tr>
            <td><small>On Touch:</small></td>
            <td><button @click="toogleShowActionsModal(true)" class="btn btn-primary btn-sm">Add Action</button></td>
            </tr>
        </tbody>
    </table>
    <div v-bind:class="{ 'modal': true, 'modal-sm': true, 'active': getShowActionModalID }" id="example-modal-2">
      <a @click="toogleShowActionsModal(false)" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container" role="document">
        <div class="modal-header">
          <a @click="toogleShowActionsModal(false)" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5 unselectable c-default"><strong>Create Action</strong></div>
        </div>
        <div class="modal-body">
          <div class="content">
            <label class="form-label unselectable" for="input-example-7">Action Type:</label>
            <div class="columns">
              <div v-bind:class="{'column': true, 'col-3': true, 's-rounded': true, 'c-hand': true, 'action-square': getPlaceholderAction.type !== buttonAction.type, 'action-square-active': getPlaceholderAction.type === buttonAction.type }" v-for="buttonAction in getAvailableActions" v-bind:key="buttonAction.type">
                <div @click="setPlaceholderAction(buttonAction)">
                  <font-awesome-icon class="icon-action-type unselectable" :icon="buttonAction.icon"/>
                  <small class="title-action-type unselectable">{{buttonAction.title}}</small>
                </div>
              </div>
            </div>
            <form>
              <div class="form-group" v-show="getPlaceholderAction.type === 'SEGUE'">
                <label class="form-label unselectable" for="input-example-7">Destination Screen:</label>
                <select :value="this.getNewAction.segue ? (this.getNewAction.segue.destinationScreenId ? this.getNewAction.segue.destinationScreenId : getCurrentProjectScreenPointers[0].id) : getCurrentProjectScreenPointers[0].id" @input="updatedNewActionDestScreen" class="form-select">
                  <option v-for="screen in getCurrentProjectScreenPointers" v-bind:key="screen.id"  v-bind:value="screen.id">{{ getCurrentProjectScreen.id == screen.id ? screen.name + ' (This same screen)':screen.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label unselectable" for="input-example-7">Action Name:</label>
                <input :value="this.getNewAction.name" @input="updatedNewActionName" class="form-input" type="text" id="input-example-7" placeholder="Ex: Show Settings Screen Action">
                <!-- <p class="elementIDLabel">Element ID: {{this.getNewElement.filteredID}}</p> -->
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button v-if="this.getNewAction && this.getNewAction.id && getPlaceholderAction.type == 'SEGUE' && this.getNewAction.segue.destinationScreenId" @click="addActionClick()" class="btn btn-primary">Add Screen Transition</button>
          <button v-else class="btn btn-primary disabled">Complete Required Fields</button>
          <a @click="toogleShowActionsModal(false)" class="btn btn-link" aria-label="Close">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import ElementManagement from '../../../../mixins/ElementManagement/ElementManagement'
    import ScreenManagement from '../../../../mixins/ScreenManagement/ScreenManagement'

    export default {
      name: 'RightBarActionsSettings',
      data: function () {
        return {
          showActionsModal: false,
          currentAction: {}
        }
      },
      mixins: [
        ScreenManagement,
        ElementManagement
      ],
      components: {
      },
      computed: {
        ...mapGetters([
          'getCurrentProjectScreenPointers',
          'getCurrentSelectedElementID',
          'getCurrentProjectScreen',
          'getSettingsShowState',
          'getAvailableActions',
          'getShowActionModalID',
          'getPlaceholderAction',
          'getNewAction'
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
        }
      },
      methods: {
        toggleShowSection: function (showID) {
          const dict = { itemID: showID, show: !this.$store.getters.getSettingsShowState[showID] }
          this.$store.dispatch('setShowStateSettingsItem', dict)
        },
        toogleShowActionsModal: function (show) {
          this.$store.dispatch('setIgnoreCanvasClicks', show)
          this.$store.dispatch('setShowActionModalID', show)
        },
        setPlaceholderAction: function (action) {
          this.$store.dispatch('setPlaceholderAction', action)
        },
        updatedNewActionName: function (event) {
          this.$store.dispatch('setNewActionName', {
            name: event.target.value,
            filteredID: ElementManagement.methods.filterElementID(event.target.value)
          })
        },
        updatedNewActionDestScreen: function (event) {
          this.$store.dispatch('setNewActionSegue', {
            sourceScreenId: this.currentScreen.id,
            destinationScreenId: event.target.value,
            payload: undefined
          })
        },
        addActionClick: function () {
          const store = this.$store
          const newActionMetadata = this.$store.getters.getNewScreen
          var newAction = this.$store.getters.getActionForSelectedPlaceholderType
          newAction.name = newActionMetadata.name
          newAction.id = newActionMetadata.filteredID

          if (newAction.type === 'SEGUE') {
            newAction.segue.segueId = this.currentScreen.id + '_' + newAction.segue.destinationScreenId + '_' + newAction.id
          }

          if (this.currentScreen) {
            var selectedElement = this.currentScreen.elements[this.getCurrentSelectedElementID.elementID]
            selectedElement = ElementManagement.methods.addActionToElement(selectedElement, 'onTouchUpInside', newAction)
            this.currentScreen.elements[selectedElement.id] = selectedElement
            var screensToSave = {}
            screensToSave[this.currentScreen.id] = this.currentScreen

            const projectPath = this.$store.getters.getCurrentProjectPath

            ScreenManagement.methods.screenWithNewElement(selectedElement, projectPath, this.currentScreen).then(function (newScreen) {
              store.dispatch('setCurrentProjectScreen', newScreen)
              store.dispatch('setShowActionModalID', false)
              store.dispatch('setIgnoreCanvasClicks', false)
            }).catch(function (error) {
              console.log(error)
              store.dispatch('setShowActionModalID', false)
              store.dispatch('setIgnoreCanvasClicks', false)
            })
          }
        }
      }
    }
</script>
<style scoped>
    
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

    .action-square {
      background-color: #f0f1f4;
      color: #667189;
      width: 80px;
      height: 80px;
      border-radius: 0.4rem;
      text-align: center;
      position: relative;
    }

    .action-square-active {
      background-color: #029FDD;
      color: #ffffff;
      width: 80px;
      height: 80px;
      border-radius: 0.4rem;
      text-align: center;
      position: relative;
    }

    .icon-action-type {
      width: 30px;
      height: 30px;
      margin-top: 8px;
    }

    .title-action-type {
      position: absolute;
      bottom: 1px;
      left: 1px;
      right: 1px;
    }

</style>


