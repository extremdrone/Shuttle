<template>
    <div class="text-center" id="centerCanvas">
      <div id="screenName" class="unselectable c-default">
        <br/>
        <h5>{{getCurrentProjectScreen != undefined ? getCurrentProjectScreen.name:'No screen selected'}}</h5>
      </div>
      <div id="processingArea"></div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import * as P5 from 'p5'

    export default {
      name: 'DashboardCanvas',
      computed: {
        ...mapGetters([
          'getCurrentProjectScreenPointers',
          'getCurrentProjectScreen'
        ])
      },
      mounted () {
        setUpCanvas('processingArea')
      }
    }

    function setUpCanvas (canvasViewId) {
      var newP5 = new P5(function (sketch) {
        var x = 100
        var y = 100

        sketch.setup = function () {
          sketch.createCanvas(375, 667)
        }

        sketch.draw = function () {
          sketch.background(0)
          sketch.fill(255)
          sketch.textSize(32)
          sketch.text('Hola Perrini!', x, y)
        }
      }, canvasViewId)
      return newP5
    }
</script>
<style scoped>
    #centerCanvas {
        background-color: #f4f4f4;
        position: absolute;
        top: 80px;
        left: 250px;
        right: 250px;
        bottom: 0px;
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