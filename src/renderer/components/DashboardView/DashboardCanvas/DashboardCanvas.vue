<template>
    <div class="text-center" id="centerCanvas">
      <div id="screenName" class="unselectable c-default">
        <br/>
        <h5>{{getCurrentProjectScreen !== undefined ? getCurrentProjectScreen.name + ' Screen':'No screen selected'}}</h5>
      </div>
      <div id="processingArea"></div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Pollock from '@appshuttle.io/pollock'

    export default {
      name: 'DashboardCanvas',
      computed: {
        ...mapGetters([
          'getCurrentProjectScreenPointers',
          'getCurrentProjectScreen'
        ])
      },
      mounted () {
        const store = this.$store
        const pollockConfig = {
          width: 375,
          height: 667
        }

        return new Pollock('processingArea', pollockConfig, function () {
          return store.getters.getCurrentProjectScreen
        }, function (selectedElement) {
          if (store.getters.getIgnoreCanvasClicks === false) {
            store.dispatch('setSelectedElementID', {
              elementID: selectedElement.id
            })
          } else {
            console.log('Clicks Ignored')
          }
        }, function (modifiedContent) {
          store.dispatch('setCurrentProjectScreen', modifiedContent)
        }, {
          mouseReleased: function (mouseResponse) {
            if (mouseResponse.mouseIsInsideCanvas === true && (store.getters.getPlaceholderDragElement !== undefined)) {
              if (store.getters.getIgnoreCanvasClicks === false) {
                store.dispatch('setPlaceholderElement', store.getters.getPlaceholderDragElement)
                store.dispatch('setShowElementModalID', true)
                store.dispatch('resetPlaceholderDragElement')
              } else {
                console.log('Clicks Ignored')
              }
            }
          }
        })
      }
    }
</script>
<style scoped>
    #centerCanvas {
        background-color: #f3f3f3;
        position: absolute;
        top: 80px;
        left: 250px;
        right: 250px;
        bottom: 32px;
    }

    #processingArea {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    #screenName {
        position: relative;
        bottom: 0px;
    }
</style>