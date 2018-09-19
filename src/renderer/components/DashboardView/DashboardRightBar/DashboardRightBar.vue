<template>
    <div id="rightBar">
        <div class="columns">
            <div id="viewSettingsContainer" class="column col-12">
              <small class="unselectable c-default"><font-awesome-icon icon="sliders-h"/> Inspector</small>
              <div class="divider"></div>
            </div>
            <div v-if="!currentElement || currentElement.elementID == ''" id="inspectorEmptyContent" class="column col-12">
                <div class="empty" id="inspectorEmptyDiv">
                    <div class="empty-icon">
                        <font-awesome-icon :icon="['far', 'hand-pointer']"/>
                    </div>
                    <p class="empty-subtitle unselectable c-default">Select a view or element first</p>
                </div>
            </div>
            <div v-if="currentElement && currentElement.elementID !== ''" id="inspectorContent" class="column col-12">
              <div id="settingsScroll">
                <RightBarActionsSettings v-show="currentElement.actions"></RightBarActionsSettings>
                <br/>
                <RightBarFrameSettings v-show="currentElement.frame"></RightBarFrameSettings>
                <br/>
                <RightBarViewSettings v-show="currentElement.view"></RightBarViewSettings>
                <br/>
                <RightBarTitleSettings v-show="currentElement.title"></RightBarTitleSettings>
                <br/>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    import RightBarViewSettings from './RightBarViewSettings/RightBarViewSettings.vue'
    import RightBarTitleSettings from './RightBarTitleSettings/RightBarTitleSettings.vue'
    import RightBarFrameSettings from './RightBarFrameSettings/RightBarFrameSettings.vue'
    import RightBarActionsSettings from './RightBarActionsSettings/RightBarActionsSettings.vue'

    export default {
      name: 'DashboardRightBar',
      data: function () {
        return {
          currentPicker: 'NONE'
        }
      },
      components: {
        RightBarViewSettings,
        RightBarTitleSettings,
        RightBarFrameSettings,
        RightBarActionsSettings
      },
      computed: {
        ...mapGetters([
          'getCurrentSelectedElementID',
          'getCurrentProjectScreen'
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
        },
        currentElement: {
          get () {
            if (!this.$store.getters.getCurrentSelectedElementID) {
              return
            }
            return this.$store.getters.getCurrentProjectScreen.elements[this.$store.getters.getCurrentSelectedElementID.elementID]
          },
          set (value) {
            this.$store.dispatch('setSelectedElementID', value.elementID)
          }
        }
      },
      methods: {
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
        bottom: 32px;
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

    #settingsScroll {
      margin-top: 0px;
      width: 100%;
      height: 79vh;
      overflow-y:scroll; 
      overflow-x:hidden;
    }

    .a-unselectable {
        text-decoration: none;
    }
</style>