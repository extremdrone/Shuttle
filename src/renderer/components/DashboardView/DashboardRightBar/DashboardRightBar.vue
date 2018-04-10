<template>
    <div id="rightBar">
        <div class="columns">
            <div id="viewSettingsContainer" class="column col-12">
              <small class="unselectable c-default"><font-awesome-icon icon="sliders-h"/> Inspector</small>
              <div class="divider"></div>
            </div>
            <div v-show="getCurrentSelectedElementID == ''" id="inspectorEmptyContent" class="column col-12">
                <div class="empty" id="inspectorEmptyDiv">
                    <div class="empty-icon">
                        <font-awesome-icon :icon="['far', 'hand-pointer']"/>
                    </div>
                    <p class="empty-subtitle unselectable c-default">Select a view or element first</p>
                </div>
            </div>
            <div v-show="getCurrentSelectedElementID != ''" id="inspectorContent" class="column col-12">
                <table v-show="getCurrentProjectScreen.elements[getCurrentSelectedElementID.elementID].view" id="table-viewSettings" class="table">
                    <thead>
                        <tr>
                        <th><small><a>View Settings</a></small></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><small>Background Color</small></td>
                        <td><small>(Color Picker)</small></td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table v-show="getCurrentProjectScreen.elements[getCurrentSelectedElementID.elementID].title" id="table-titleSettings" class="table">
                    <thead>
                        <tr>
                        <th><small><a>Title Settings</a></small></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><small>Button Text</small></td>
                        <td><small><input v-model="getCurrentProjectScreen.elements[getCurrentSelectedElementID.elementID].title.text" placeholder="Button Title"></small></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import { mapGetters } from 'vuex'

    export default {
      name: 'DashboardRightBar',
      components: {
        FontAwesomeIcon
      },
      computed: {
        ...mapGetters([
          'getCurrentSelectedElementID',
          'getCurrentProjectScreen'
        ])
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
</style>