<template>
    <div class="text-center" id="centerCanvas">
      <div id="screenName" class="unselectable c-default">
        <br/>
        <h5>{{getCurrentProjectScreen !== undefined ? getCurrentProjectScreen.name:'No screen selected'}}</h5>
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
          store.dispatch('setSelectedElementID', {
            elementID: selectedElement.id
          })
          console.log(selectedElement)
        }, function (modifiedContent) {
          store.dispatch('setCurrentProjectScreen', modifiedContent)
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