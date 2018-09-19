<template>
    <table id="table-titleActions" class="table">
        <thead @click="toggleShowSection('showActions')" class="c-hand unselectable">
            <tr>
            <th>
              <small>
                  <font-awesome-icon v-show="getSettingsShowState.showActions" icon='chevron-circle-up' class="settings-show-arrow"/>
                  <font-awesome-icon v-show="!getSettingsShowState.showActions" icon='chevron-circle-down' class="settings-show-arrow"/>
                  <a>Actions</a>
              </small>
            </th>
            <th></th>
            </tr>
        </thead>
        <tbody v-show="getSettingsShowState.showActions">
            <tr>
            <td><small>On Touch:</small></td>
            <td><button class="btn btn-primary btn-sm">Add Action</button></td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
      name: 'RightBarActionsSettings',
      components: {
      },
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


