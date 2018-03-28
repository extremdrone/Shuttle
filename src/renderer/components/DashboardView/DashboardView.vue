<template>
    <div>
        <DashboardTopBar></DashboardTopBar>
        <div>
            <div id="leftBar">
            </div>
            <div id="centerCanvas">
            </div>
            <div id="rightBar">
            </div>
        </div>
    </div>
</template>
<script>
    import DashboardTopBar from './DashboardTopBar/DashboardTopBar.vue'

    export default {
      name: 'DashboardView',
      components: {
        DashboardTopBar
      }
    }
</script>
<style scoped>
    
    #leftBar {
        background-color: #ffffff;
        position: absolute;
        top: 80px;
        left: 0px;
        width: 250px;
        bottom: 0px;
        border-right: 1px solid #eaeaea;
    }

    #rightBar {
        background-color: #ffffff;
        position: absolute;
        top: 80px;
        right: 0px;
        width: 250px;
        bottom: 0px;
        border-left: 1px solid #eaeaea;
    }

    #centerCanvas {
        background-color: #f4f4f4;
        position: absolute;
        top: 80px;
        left: 250px;
        right: 250px;
        bottom: 0px;
    }

</style>