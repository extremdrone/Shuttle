<template>
    <div>
        <table id="table-frameSettings" class="table">
            <thead @click="toggleShowSection('showPosition')" class="c-hand unselectable">
                <tr>
                <th>
                    <small>
                        <font-awesome-icon v-show="getSettingsShowState.showPosition" icon='chevron-circle-up' class="settings-show-arrow"/>
                        <font-awesome-icon v-show="!getSettingsShowState.showPosition" icon='chevron-circle-down' class="settings-show-arrow"/>
                        <a>Position</a>
                    </small>
                </th>
                <th></th>
                </tr>
            </thead>
            <tbody v-show="getSettingsShowState.showPosition">
                <tr>
                <td><small>x:</small></td>
                <td><small><input type="number" v-model.number="currentElement.frame.x.value" placeholder="--"></small></td>
                </tr>
                <tr>
                <td><small>y:</small></td>
                <td><small><input type="number" v-model.number="currentElement.frame.y.value" placeholder="--"></small></td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table id="table-frameSettings" class="table">
            <thead @click="toggleShowSection('showSize')" class="c-hand unselectable">
                <tr>
                <th>
                    <small>
                        <font-awesome-icon v-show="getSettingsShowState.showSize" icon='chevron-circle-up' class="settings-show-arrow"/>
                        <font-awesome-icon v-show="!getSettingsShowState.showSize" icon='chevron-circle-down' class="settings-show-arrow"/>
                        <a>Size</a>
                    </small>
                </th>
                <th></th>
                </tr>
            </thead>
            <tbody v-show="getSettingsShowState.showSize">
                <tr>
                <td><small><font-awesome-icon icon='arrows-alt-h'/> Width: </small></td>
                <td><small><input type="number" v-model.number="currentElement.frame.width.value" placeholder="--"></small></td>
                </tr>
                <tr>
                <td><small><font-awesome-icon icon='arrows-alt-v'/> Height:</small></td>
                <td><small><input type="number" v-model.number="currentElement.frame.height.value" placeholder="--"></small></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
      name: 'RightBarFrameSettings',
      computed: {
        ...mapGetters([
          'getCurrentSelectedElementID',
          'getCurrentProjectScreen',
          'getSettingsShowState'
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
        toggleShowSection: function (showID) {
          const dict = { itemID: showID, show: !this.$store.getters.getSettingsShowState[showID] }
          this.$store.dispatch('setShowStateSettingsItem', dict)
        }
      }
    }
</script>
<style scoped>

.settings-show-arrow {
    color: #029FDD;
    margin-right: 0px;
}

.table {
    width: 90%;
    margin-left: 5%;
    background: #F0F1F4;
    border-radius: 10px;
    overflow: hidden;
    table-layout:fixed;
}



</style>
