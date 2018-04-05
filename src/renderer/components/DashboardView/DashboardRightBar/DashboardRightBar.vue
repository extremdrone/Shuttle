<template>
    <div id="rightBar">
        <div class="columns">
            <div id="viewSettingsContainer" class="column col-12">
              <small class="unselectable c-default"><font-awesome-icon icon="sliders-h"/> Inspector</small>
              <div class="divider"></div>
            </div>
            <div id="inspectorEmptyContent" class="column col-12">
                <div class="empty" id="inspectorEmptyDiv">
                    <div class="empty-icon">
                        <font-awesome-icon :icon="['far', 'hand-pointer']"/>
                    </div>
                    <p class="empty-subtitle unselectable c-default">Select a view or element first</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

    export default {
      name: 'DashboardRightBar',
      components: {
        FontAwesomeIcon
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