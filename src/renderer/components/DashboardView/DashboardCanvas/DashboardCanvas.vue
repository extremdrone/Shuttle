<template>
  <div>
    <div class="text-center" id="centerCanvas">
      <!-- <div id="screenName" class="unselectable c-default">
        <br/>
        <h5>{{getCurrentProjectScreen !== undefined ? getCurrentProjectScreen.name + ' Screen':'No screen selected'}}</h5>
      </div> -->
      <div id="processingArea"></div>
      <div class="zoom-area">
        <div class="columns">
          <div class="column col-4 c-hand" @click="reduceZoom()">
            <div class="text-center">
              <font-awesome-icon :icon="['fas', 'search-minus']"/>
            </div>
          </div>
          <div class="column col-4 c-hand">
            <div class="text-center">
              <font-awesome-icon :icon="['fas', 'mobile-alt']"/>
            </div>
          </div>
          <div class="column col-4 c-hand" @click="augmentZoom()">
            <div class="text-center">
              <font-awesome-icon :icon="['fas', 'search-plus']"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Pollock from '@appshuttle.io/pollock'

    export default {
      name: 'DashboardCanvas',
      data: function () {
        return {
          SelectedSize: {
            size: {
              width: 740,
              height: 1334
            },
            percentage: 0.5
          },
          ScreenSizes: {
            iOS: {
              Phone: {
                width: 740,
                height: 1334
              },
              PhonePlus: {
                width: 1242,
                height: 2208
              },
              PhoneX: {
                width: 1125,
                height: 2436
              },
              PhoneXMax: {
                width: 1242,
                height: 2688
              }
            }
          },
          needsResize: false,
          minPercentage: 0.2,
          maxPercentage: 1.2
        }
      },
      computed: {
        ...mapGetters([
          'getCurrentProjectScreenPointers',
          'getCurrentProjectScreen'
        ])
      },
      mounted () {
        this.loadProcessingArea()
      },
      methods: {
        loadProcessingArea: function () {
          const store = this.$store
          const thisRef = this
          const pollockConfig = {
            width: this.SelectedSize.size.width,
            height: this.SelectedSize.size.height,
            percentage: this.SelectedSize.percentage
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
            },
            resizeCallback: function () {
              let resizeDict = {
                needsResize: thisRef.needsResize,
                width: thisRef.SelectedSize.size.width * thisRef.SelectedSize.percentage,
                height: thisRef.SelectedSize.size.height * thisRef.SelectedSize.percentage
              }
              if (thisRef.needsResize) {
                thisRef.needsResize = false
              }
              return resizeDict
            }
          })
        },
        reduceZoom: function () {
          if (this.SelectedSize.percentage <= this.minPercentage) {
            return
          }
          this.SelectedSize.percentage = this.SelectedSize.percentage - 0.1
          this.needsResize = true
        },
        augmentZoom: function () {
          if (this.SelectedSize.percentage >= this.maxPercentage) {
            return
          }
          this.SelectedSize.percentage = this.SelectedSize.percentage + 0.1
          this.needsResize = true
        }
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
        overflow: scroll;
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

    .zoom-area {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background-color: #fafafa;
      border: 1px solid #d3d3d3;
      border-radius: 7px;
      max-width: 120px;
      width: 120px;
    }

</style>