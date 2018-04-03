<template>
    <div>
        <DashboardTopBar></DashboardTopBar>
        <div>
            <DashboardLeftBar></DashboardLeftBar>
            <DashboardCanvas></DashboardCanvas>
            <DashboardRightBar></DashboardRightBar>
        </div>
    </div>
</template>
<script>
    import DashboardTopBar from './DashboardTopBar/DashboardTopBar.vue'
    import DashboardLeftBar from './DashboardLeftBar/DashboardLeftBar.vue'
    import DashboardRightBar from './DashboardRightBar/DashboardRightBar.vue'
    import DashboardCanvas from './DashboardCanvas/DashboardCanvas.vue'

    export default {
      name: 'DashboardView',
      components: {
        DashboardTopBar,
        DashboardLeftBar,
        DashboardRightBar,
        DashboardCanvas
      }
    }
</script>
<style scoped>
</style>