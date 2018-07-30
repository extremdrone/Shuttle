<template>
    <table id="table-titleSettings" class="table">
        <thead>
            <tr>
            <th><small><a>Title</a></small></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td><small>Text</small></td>
            <td><small><input v-model="currentElement.title.text" placeholder="Text"></small></td>
            </tr>
            <tr>
                <td><small>Text Color</small></td>
                <td><div v-on:click="setCurrentPicker('title.textColor')" class="circle colorBug c-hand" v-bind:style="{'background-color': currentElement.title.textColor.hex}"></div></td>
                <div v-show="currentPicker == 'title.textColor'" id="title.textColor" class="colorPicker">
                    <chrome-picker v-model="currentElement.title.textColor" />
                    <a v-on:click="setCurrentPicker('title.textColor')" class="btn btn-primary btn-ClosePicker">Close</a>
                </div>
            </tr>
            <tr>
            <td><small>Text Size</small></td>
            <td><small><input type="number" v-model="currentElement.title.textSize" placeholder="--"></small></td>
            </tr>
            <tr>
            <td><small>Text Alignment</small></td>
            <td>
                <div class="btn-group btn-group-block">
                    <button @click="setTextAlignment('LEFT')" v-bind:class="{ 'btn-primary': currentElement.title.textAlignment == 'LEFT', 'btn-link': currentElement.title.textAlignment != 'LEFT', 'btn': true, 'btn-action': true, 'btn-sm': true }"><small><font-awesome-icon icon='align-left'/></small></button>
                    <button @click="setTextAlignment('CENTER')" v-bind:class="{ 'btn-primary': currentElement.title.textAlignment == 'CENTER', 'btn-link': currentElement.title.textAlignment != 'CENTER', 'btn': true, 'btn-action': true, 'btn-sm': true }"><small><font-awesome-icon icon='align-center'/></small></button>
                    <button @click="setTextAlignment('RIGHT')" v-bind:class="{ 'btn-primary': currentElement.title.textAlignment == 'RIGHT', 'btn-link': currentElement.title.textAlignment != 'RIGHT', 'btn': true, 'btn-action': true, 'btn-sm': true }"><small><font-awesome-icon icon='align-right'/></small></button>
                    <button @click="setTextAlignment('JUSTIFY')" v-bind:class="{ 'btn-primary': currentElement.title.textAlignment == 'JUSTIFY', 'btn-link': currentElement.title.textAlignment != 'JUSTIFY', 'btn': true, 'btn-action': true, 'btn-sm': true }"><small><font-awesome-icon icon='align-justify'/></small></button>
                </div> 
            </td>
            </tr>
            <tr>
            <td><small>Text Style</small></td>
            <td>
                <div class="btn-group btn-group-block">
                    <button @click="setTextStyle('DEFAULT')" v-bind:class="{ 'btn-primary': currentElement.title.textStyle == 'DEFAULT', 'btn-link': currentElement.title.textStyle != 'DEFAULT', 'btn': true, 'btn-action': true, 'btn-sm': true }"><small>Normal</small></button>
                    <button @click="setTextStyle('BOLD')" v-bind:class="{ 'btn-primary': currentElement.title.textStyle == 'BOLD', 'btn-link': currentElement.title.textStyle != 'BOLD', 'btn': true, 'btn-action': true, 'btn-sm': true }"><small><font-awesome-icon icon='bold'/></small></button>
                    <button @click="setTextStyle('ITALIC')" v-bind:class="{ 'btn-primary': currentElement.title.textStyle == 'ITALIC', 'btn-link': currentElement.title.textStyle != 'ITALIC', 'btn': true, 'btn-action': true, 'btn-sm': true }"><small><font-awesome-icon icon='italic'/></small></button>
                </div> 
            </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import { Chrome } from 'vue-color'

    import { mapGetters } from 'vuex'

    export default {
      name: 'RightBarTitleSettings',
      data: function () {
        return {
          currentPicker: 'NONE'
        }
      },
      components: {
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
        setTextAlignment: function (alignment) {
          this.currentElement.title.textAlignment = alignment
        },
        setTextStyle: function (style) {
          this.currentElement.title.textStyle = style
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


