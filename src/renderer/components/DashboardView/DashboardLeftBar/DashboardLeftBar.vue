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

    export default {
      name: 'DashboardLeftBar',
      components: {
        FontAwesomeIcon,
        DashboardElementsView,
        draggable
      },
      computed: {
        ...mapGetters([
          'getCurrentProjectScreenPointers',
          'getCurrentProjectScreen',
          'getCurrentProjectElementsAsArray'
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
</style>
