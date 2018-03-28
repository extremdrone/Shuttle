<template>
    <div id="leftBar">
        <div class="columns">
            <div id="viewHierarchyContainer" class="column col-12">
              <small>View Hierarchy</small>
              <div class="divider"></div>
              <div class="accordion">
                <input type="checkbox" id="accordion-4" name="accordion-checkbox" hidden="" checked="">
                <label class="accordion-header c-hand" for="accordion-4">
                  Elements
                </label>
                <div class="accordion-body">
                  <ul class="menu menu-nav">
                    <li class="menu-item">
                      <a href="#accordions">Element 1</a>
                    </li>
                    <li class="menu-item">
                      <a href="#accordions">Element 2</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="accordion">
                <input type="checkbox" id="accordion-5" name="accordion-checkbox" hidden="">
                <label class="accordion-header c-hand" for="accordion-5">
                  Layout
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
                  Components
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
    </div>
</template>
<script>
    export default {
      name: 'DashboardLeftBar'
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
      padding-left: 20px;
    }
</style>
