<template>
    <div id="leftBar">
        <div class="columns">
            <div id="viewHierarchyContainer" class="column col-12">
              <small><font-awesome-icon icon="sitemap"/> Screens Hierarchy</small>
              <div class="divider"></div>
              <div class="accordion">
                <input type="checkbox" id="accordion-4" name="accordion-checkbox" hidden="" checked="">
                <label class="accordion-header c-hand" for="accordion-4">
                 <font-awesome-icon :icon="['far', 'square']"/> Home Screen
                </label>
                <div class="accordion-body">
                  <ul class="menu menu-nav">
                    <li class="menu-item">
                      <a href="#accordions"><font-awesome-icon :icon="['far', 'image']"/> Logo Image</a>
                    </li>
                    <li class="menu-item">
                      <a href="#accordions"><font-awesome-icon :icon="['fas', 'font']"/> Header Text</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="accordion">
                <input type="checkbox" id="accordion-5" name="accordion-checkbox" hidden="">
                <label class="accordion-header c-hand" for="accordion-5">
                  <font-awesome-icon :icon="['far', 'square']"/> Account Screen
                </label>
                <div class="accordion-body">
                  <ul class="menu menu-nav">
                    <li class="menu-item">
                      <a href="#accordions">Layout 1</a>
                    </li>
                    <li class="menu-item">
                      <a href="#accordions">Layout 2</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="accordion">
                <input type="checkbox" id="accordion-6" name="accordion-checkbox" hidden="">
                <label class="accordion-header c-hand" for="accordion-6">
                  <font-awesome-icon :icon="['far', 'square']"/> Settings Screen
                </label>
                <div class="accordion-body">
                  <ul class="menu menu-nav">
                    <li class="menu-item">
                      <a href="#accordions">Component 1</a>
                    </li>
                    <li class="menu-item">
                      <a href="#accordions">Component 2</a>
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

    import DashboardElementsView from './DashboardElementsView/DashboardElementsView.vue'

    export default {
      name: 'DashboardLeftBar',
      components: {
        FontAwesomeIcon,
        DashboardElementsView
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
