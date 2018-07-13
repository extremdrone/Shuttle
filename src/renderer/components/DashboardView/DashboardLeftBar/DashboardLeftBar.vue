<template>
    <div id="leftBar">
        <div class="columns">
            <div id="viewHierarchyContainer" class="column col-12">
              <small class="unselectable c-default"><font-awesome-icon icon="sitemap"/> Screens Hierarchy</small>
              <div class="divider"></div>
              <div v-for="screen in getCurrentProjectScreenPointers" v-bind:key="screen.id" class="accordion">
                <input @click="setSelectedScreen(screen)" type="checkbox" :id="screen.id + 'accordeon'" name="accordion-checkbox" hidden="" :checked="screen.id == getCurrentProjectScreen.id">
                <label class="accordion-header c-hand unselectable" :for="screen.id + 'accordeon'">
                 <font-awesome-icon icon="th-large" v-bind:class="{ 'leftSelectedView': (getCurrentProjectScreen.id == screen.id) }" /> <span v-bind:class="{ 'leftSelectedView': (getCurrentProjectScreen.id == screen.id) }">{{screen.name}}</span>
                </label>
                <div class="accordion-body">
                  <ul class="menu menu-nav">
                    <draggable v-model="getCurrentProjectElementsAsArray" :options="{group:'Elements'}">
                      <li class="menu-item" v-for="element in getCurrentProjectScreen.elements" v-bind:key="element.id">
                        <a v-on:click="setSelectedElement(element.id)" href="#accordions">- <font-awesome-icon :icon="['far', 'image']"/> {{ element.id }}</a>
                      </li>
                    </draggable>
                  </ul>
                </div>
              </div>
              <span @click="showScreenIdModal(true)" class="chip c-hand">
                <span class="addScreenChipContent unselectable c-hand"> Add Screen&nbsp;<font-awesome-icon :icon="['far','plus-square']"/> </span>
              </span>
            </div>
        </div>
        <div v-bind:class="{ 'modal': true, 'modal-sm': true, 'active': getShowScreenModalID }" id="example-modal-2">
          <a @click="showScreenIdModal(false)" class="modal-overlay" aria-label="Close"></a>
          <div class="modal-container" role="document">
            <div class="modal-header">
              <a @click="showScreenIdModal(false)" class="btn btn-clear float-right" aria-label="Close"></a>
              <div class="modal-title h5 unselectable c-default"><strong>Name your Screen</strong></div>
            </div>
            <div class="modal-body">
              <div class="content">
                <label class="form-label unselectable" for="input-example-7">Screen Type:</label>
                <div class="columns">
                  <div class="column col-3" v-for="screenPlaceholder in getAvailableScreens" v-bind:key="screenPlaceholder.type">
                    <div @click="setPlaceHolderScreen(screenPlaceholder)" v-bind:class="{ 's-rounded': true, 'c-hand': true, 'screen-square': getPlaceholderScreen.type !== screenPlaceholder.type, 'screen-square-active': getPlaceholderScreen.type === screenPlaceholder.type }">
                      <font-awesome-icon class="icon-screen-type unselectable" :icon="screenPlaceholder.icon"/>
                      <small class="title-screen-type unselectable">{{screenPlaceholder.title}}</small>
                    </div>
                  </div>
                </div>
                <form>
                  <div class="form-group">
                    <label class="form-label unselectable" for="input-example-7">Screen Name:</label>
                    <input :value="this.getNewScreen.name" @input="updatedNewScreenName" class="form-input" type="text" id="input-example-7" placeholder="Settings View">
                    <div class="divider"></div>
                    <!-- <p class="elementIDLabel">Element ID: {{this.getNewElement.filteredID}}</p> -->
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="addScreenClick()" class="btn btn-primary">Create</button>
              <a @click="showScreenIdModal(false)" class="btn btn-link" aria-label="Close">Cancel</a>
            </div>
          </div>
        </div>
        <div id="viewElementsContainer">
          <DashboardElementsView id="dashboardElementsView"></DashboardElementsView>
        </div>
    </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import { mapGetters } from 'vuex'
    import draggable from 'vuedraggable'

    import DashboardElementsView from './DashboardElementsView/DashboardElementsView.vue'

    import ScreenManagement from '../../../mixins/ScreenManagement/ScreenManagement'
    import ElementManagement from '../../../mixins/ElementManagement/ElementManagement'

    export default {
      name: 'DashboardLeftBar',
      components: {
        FontAwesomeIcon,
        DashboardElementsView,
        draggable
      },
      mixins: [
        ScreenManagement,
        ElementManagement
      ],
      computed: {
        ...mapGetters([
          'getCurrentProjectScreenPointers',
          'getCurrentProjectScreen',
          'getCurrentProjectElementsAsArray',
          'getAvailableScreens',
          'getShowScreenModalID',
          'getPlaceholderScreen',
          'getNewScreen'
        ])
      },
      methods: {
        setSelectedScreen: function (screen) {
          const store = this.$store
          ScreenManagement.methods.getScreenWithID(this.$store.getters.getCurrentProjectPath, screen.id).then(function (screen) {
            store.dispatch('setCurrentProjectScreen', screen)
          }).catch(function (error) {
            console.log(error)
          })
        },
        setSelectedElement: function (elementID) {
          this.$store.dispatch('setSelectedElementID', {
            elementID
          })
        },
        showScreenIdModal: function (bool) {
          this.$store.dispatch('setShowScreenModalID', bool)
        },
        setPlaceHolderScreen: function (screen) {
          console.log(screen)
          this.$store.dispatch('setPlaceholderScreen', screen)
        },
        updatedNewScreenName: function (event) {
          this.$store.dispatch('setNewScreenName', {
            name: event.target.value,
            filteredID: ElementManagement.methods.filterElementID(event.target.value)
          })
        },
        addScreenClick: function () {
          console.log(this.$store.getters.getNewScreen)
          console.log(this.$store.getters.getPlaceholderScreen)
        }
      }
    }
</script>
<style scoped>
    #leftBar {
      background-color: #ffffff;
      position: absolute;
      top: 80px;
      left: 0px;
      width: 250px;
      bottom: 32px;
      border-right: 1px solid #eaeaea;
    }

    .leftSelectedView {
      color: #029FDD;
      font-weight: 500;
    }

    #viewHierarchyContainer {
      padding-left: 20px;
      padding-top: 20px;
      padding-right: 20px;
    }

    #dashboardElementsView {
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      height: 350px;
    }

    .chip {
      width: 100%;
      text-align: center;
    }

    .addScreenChipContent {
      margin: auto;
    }

    .screen-square {
      background-color: #f0f1f4;
      color: #667189;
      width: 80px;
      height: 80px;
      border-radius: 0.4rem;
      text-align: center;
      position: relative;
    }

    .screen-square-active {
      background-color: #029FDD;
      color: #ffffff;
      width: 80px;
      height: 80px;
      border-radius: 0.4rem;
      text-align: center;
      position: relative;
    }

    .icon-screen-type {
      width: 30px;
      height: 30px;
      margin-top: 8px;
    }

    .title-screen-type {
      position: absolute;
      bottom: 1px;
      left: 1px;
      right: 1px;
    }
</style>
