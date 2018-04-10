<template>
    <div id="leftBar">
        <div class="columns">
            <div id="viewHierarchyContainer" class="column col-12">
              <small class="unselectable c-default"><font-awesome-icon icon="sitemap"/> Screens Hierarchy</small>
              <div class="divider"></div>
              <div v-for="screen in getCurrentProjectScreenPointers" v-bind:key="screen.id" class="accordion">
                <input type="checkbox" :id="screen.id + 'accordeon'" name="accordion-checkbox" hidden="" :checked="screen.id == getCurrentProjectScreen.id">
                <label class="accordion-header c-hand unselectable" :for="screen.id + 'accordeon'">
                 <font-awesome-icon :icon="['far', 'square']"/> {{screen.name}}
                </label>
                <div class="accordion-body">
                  <ul class="menu menu-nav">
                    <li class="menu-item" v-for="element in getCurrentProjectScreen.elements" v-bind:key="element.id">
                      <a v-on:click="setSelectedElement(element.id)" href="#accordions">- <font-awesome-icon :icon="['far', 'image']"/> {{ element.id }}</a>
                    </li>
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

    import DashboardElementsView from './DashboardElementsView/DashboardElementsView.vue'

    export default {
      name: 'DashboardLeftBar',
      components: {
        FontAwesomeIcon,
        DashboardElementsView
      },
      computed: {
        ...mapGetters([
          'getCurrentProjectScreenPointers',
          'getCurrentProjectScreen'
        ])
      },
      methods: {
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
        bottom: 0px;
        border-right: 1px solid #eaeaea;
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
