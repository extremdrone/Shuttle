<template>
  <div>
    <div id="elementsContainer" class="columns">
      <div class="column col-12">
        <small class="unselectable c-default"><font-awesome-icon icon="toggle-on"/> Elements (Drag to add)</small>
        <div class="divider"></div>
      </div>
      <div id="elementsScroll">
        <div v-for="element in getAvailableElements" @mousedown="elementMousedown(element)" @mouseup="showElementIdModal(true, element)" v-bind:key="element.type">
          <div class="columns">
            <div class="column col-10 c-move element-row">
            <div class="panel">
            <div class="panel-header text-center">
              <font-awesome-icon class="icon-element" :icon="element.icon" size="m"/>
              <div class="panel-title unselectable"><a>{{ element.name }}</a></div>
              <div class="panel-subtitle unselectable"><small>{{ element.description }}</small></div>
            </div>
            </div>
            </div>
            <div @click="showElementIdModal(true, element)" class="column col-2 c-add">
              <font-awesome-icon icon="plus-square" class="addButton"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-bind:class="{ 'modal': true, 'modal-sm': true, 'active': getShowElementModalID }" id="example-modal-2">
      <a @click="showElementIdModal(false)" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container" role="document">
        <div class="modal-header">
          <a @click="showElementIdModal(false)" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5">Name your Element</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <form>
              <div class="form-group">
                <label class="form-label" for="input-example-7">Element Name</label>
                <input :value="this.getNewElement.newElementName" @input="updatedNewElementName" class="form-input" type="text" id="input-example-7" placeholder="Name">
                <div class="divider"></div>
                <!-- <p class="elementIDLabel">Element ID: {{this.getNewElement.filteredID}}</p> -->
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="addElementClick()" class="btn btn-primary">Create</button>
          <a @click="showElementIdModal(false)" class="btn btn-link" aria-label="Close">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import ScreenManagement from '../../../../mixins/ScreenManagement/ScreenManagement'
    import ElementManagement from '../../../../mixins/ElementManagement/ElementManagement'
    import { mapGetters } from 'vuex'
    import draggable from 'vuedraggable'

    export default {
      name: 'DashboardElementsView',
      components: {
        draggable
      },
      mixins: [
        ScreenManagement,
        ElementManagement
      ],
      computed: {
        ...mapGetters([
          'getAvailableElements',
          'getAvailableElementsAsArray',
          'getShowElementModalID',
          'getPlaceholderElement',
          'getNewElement'
        ])
      },
      methods: {
        checkMove: function (evt) {
          // console.log(evt)
        },
        elementMousedown: function (elementPlaceholder) {
          if (typeof elementPlaceholder !== 'undefined') {
            this.$store.dispatch('setPlaceholderDragElement', elementPlaceholder)
          }
        },
        showElementIdModal: function (bool, elementPlaceholder) {
          if (typeof elementPlaceholder !== 'undefined') {
            this.$store.dispatch('setPlaceholderElement', elementPlaceholder)
          }

          this.$store.dispatch('setShowElementModalID', bool)
        },
        updatedNewElementName: function (event) {
          this.$store.dispatch('setNewElementName', {
            name: event.target.value,
            filteredID: ElementManagement.methods.filterElementID(event.target.value)
          })
        },
        addElementClick: function () {
          const store = this.$store
          const placeholderElement = this.$store.getters.getPlaceholderElement
          const newElement = this.$store.getters.getNewElement
          const projectPath = this.$store.getters.getCurrentProjectPath

          const currentScreen = this.$store.getters.getCurrentProjectScreen

          const element = JSON.parse(JSON.stringify(placeholderElement))
          element.id = newElement.filteredID
          element.name = newElement.name
          element.index = (currentScreen.elements ? 1 : currentScreen.elements.count + 1)

          if (element.type === 'IMAGEVIEW') {
            if (element.image.onlineResource === false) {
              const newURL = element.image.url.replace('%PROJECT_PATH%', 'file:///' + projectPath)
              element.image.url = newURL
              element.image.data = this.$store.getters.getSHImageViewPlaceholder
            }
          }

          ScreenManagement.methods.screenWithNewElement(element, projectPath, currentScreen).then(function (newScreen) {
            store.dispatch('setCurrentProjectScreen', newScreen)
            store.dispatch('setShowElementModalID', false)
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    }
</script>
<style scoped>

    #elementsContainer {
      padding-top: 20px;
      padding-left: 10px;
      padding-right: 10px;
      
    }

    #elementsScroll {
      margin-top: -10px;
      width: 100%;
      height: 300px;
      overflow-y:scroll; 
      overflow-x:hidden;
    }

    .element-row {
      background-color: #fdfdfd;
      border-radius: 10px;
      margin-top: 10px;
    }

    .element-row a:hover{
      text-decoration: none;
    }

    .addButton {
      color: #029FDD;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    .icon-element {
      color: #029FDD;
    }

    .elementIDLabel {
      color: lightgray;
    }

</style>