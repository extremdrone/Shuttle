<template>
    <table id="table-viewSettings" class="table">
        <thead>
            <tr>
            <th><small><a class="unselectable c-default a-unselectable">View</a></small></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><small>Background Color</small></td>
                <td><div v-on:click="setCurrentPicker('view.backgroundColor')" class="circle colorBug c-hand" v-bind:style="{'background-color': currentElement.view.backgroundColor.hex}"></div></td>
                <div v-show="currentPicker == 'view.backgroundColor'" id="view.backgroundColor" class="colorPicker">
                    <chrome-picker v-model="currentElement.view.backgroundColor" />
                    <a v-on:click="setCurrentPicker('view.backgroundColor')" class="btn btn-primary btn-ClosePicker">Close</a>
                </div>
            </tr>
            <tr>
                <td><small>Hidden:</small></td>
                <td>
                    <div class="form-group">
                    <label class="form-switch">
                        <input type="checkbox">
                        <i class="form-icon"></i>
                    </label>
                    </div>
                </td>
            </tr>
            <tr>
                <td><small>Allow User Interaction:</small></td>
                <td>
                    <div class="form-group">
                    <label class="form-switch">
                        <input type="checkbox">
                        <i class="form-icon"></i>
                    </label>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import { Chrome } from 'vue-color'

    import { mapGetters } from 'vuex'

    export default {
      name: 'RightBarViewSettings',
      data: function () {
        return {
          currentPicker: 'NONE'
        }
      },
      components: {
        FontAwesomeIcon,
        'chrome-picker': Chrome
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
        setCurrentPicker: function (pickerId) {
          if (this.currentPicker === 'NONE') {
            this.currentPicker = pickerId
          } else {
            this.currentPicker = 'NONE'
          }
        },
        setHidden: function () {
        },
        setUserInteraction: function () {
        }
      }
    }
</script>
<style scoped>

    .colorBug {
        width: 20px;
        height: 20px;
        border-color: #dfdfdf;
        border-width: 2px;
        border-style: solid;
    }

    .colorPicker {
        position: absolute;
        top: 100px;
        right:260px;
    }

    .btn-ClosePicker {
        width: 100%;
    }

</style>

