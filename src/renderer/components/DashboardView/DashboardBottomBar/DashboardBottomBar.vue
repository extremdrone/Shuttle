<template>
  <div class="container" id="bottomBar">
      <div class="columns" id="bottomBarColumns">
        <div class="column col-6"></div>
        <div class="column col-2"></div>
        <div class="column col-2">{{ getBottomLoadingText }}</div>
        <div class="column col-2" v-show="getBottomLoadingMode == 'INDEFINITE'">
          <progress class="progress" max="100"></progress>
        </div>
        <div class="column col-2" v-show="getBottomLoadingMode == 'EXACT'">
          <progress class="progress" :value="getBottomLoadingPercentage" max="100"></progress>
        </div>
      </div>
    </div> 
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardTopBar',
  computed: {
    ...mapGetters([
      'getBottomLoadingText',
      'getBottomLoadingMode',
      'getBottomLoadingPercentage'
    ])
  }
}
</script>
<style scoped>

#bottomBar {
    background-color: #fff;
    position: absolute;
    left: 0px;
    width: 100%;
    bottom: 0px;
    height: 32px;
    max-height: 32px;
    border-top: 1px solid #eaeaea;
}

#bottomBarColumns {
    max-height: 32px;
    height: 32px;
}

</style>

