<template>
  <div>
    <div id="elementsContainer" class="columns">
            <div class="column col-12">
              <small class="unselectable c-default"><font-awesome-icon icon="toggle-on"/> Elements (Drag to add)</small>
              <div class="divider"></div>
            </div>
            <div id="elementsScroll">
            <draggable v-model="getAvailableElementsAsArray" :options="{group:'Elements'}">
              <div v-for="element in getAvailableElements" v-bind:key="element.type" class="column col-12 c-move element-row">
                <div class="panel">
                  <div class="panel-header text-center">
                    <font-awesome-icon icon="image" size="m"/>
                    <div class="panel-title unselectable"><a>{{ element.name }}</a></div>
                    <div class="panel-subtitle unselectable"><small>{{ element.description }}</small></div>
                  </div>
                </div>
              </div>
            </draggable>
           </div>
    </div>
  </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import { mapGetters } from 'vuex'
    import draggable from 'vuedraggable'

    export default {
      name: 'DashboardElementsView',
      components: {
        FontAwesomeIcon,
        draggable
      },
      computed: {
        ...mapGetters([
          'getAvailableElements',
          'getAvailableElementsAsArray'
        ])
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
</style>