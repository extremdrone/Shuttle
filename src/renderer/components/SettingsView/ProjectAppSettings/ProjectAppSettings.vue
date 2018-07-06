<template>
    <div class="panel-body">
        <div class="tile tile-centered title-settings">
            <div class="tile-content">
                <div class="tile-subtitle"><small>App Name</small></div>
                <div class="tile-title text-bold">{{ getCurrentProjectInformation.appInformation.appName }}</div>
            </div>
            <div class="tile-action">
                <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
            </div>
        </div>
        <div class="tile tile-centered title-settings">
            <div class="tile-content">
                <div class="tile-subtitle"><small>App Category</small></div>
                <div class="tile-title text-bold">{{ getCurrentProjectInformation.appInformation.appCategory }}</div>
            </div>
            <div class="tile-action">
                <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
            </div>
        </div>
        <div class="tile tile-centered title-settings">
            <div class="tile-content">
                <div class="tile-subtitle"><small>App Platforms</small></div>
                <div class="tile-title text-bold">{{ getCurrentProjectInformation.appInformation.appPlatforms == 'BOTH' ? 'iOS &amp; Android': getCurrentProjectInformation.appInformation.appPlatforms }}</div>
            </div>
            <div class="tile-action">
                <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
      name: 'ProjectAppSettings',
      computed: {
        ...mapGetters([
          'getCurrentProjectInformation'
        ])
      }
    }
</script>
<style scoped>
    .title-settings {
        margin-top: 7px;
    }
</style>
