<template>
    <div class="panel-body">
        <div class="tile tile-centered title-settings">
            <div class="tile-content">
                <div class="tile-subtitle"><small>Creator Name</small></div>
                <div class="tile-title text-bold">{{ getCurrentProjectInformation.creatorInformation.name }}</div>
            </div>
            <div class="tile-action">
                <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
            </div>
        </div>
        <div class="tile tile-centered title-settings">
            <div class="tile-content">
                <div class="tile-subtitle"><small>Creator Email</small></div>
                <div class="tile-title text-bold">{{ getCurrentProjectInformation.creatorInformation.email }}</div>
            </div>
            <div class="tile-action">
                <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
            </div>
        </div>
        <div class="tile tile-centered title-settings">
            <div class="tile-content">
                <div class="tile-subtitle"><small>Creator Website</small></div>
                <div class="tile-title text-bold">{{ getCurrentProjectInformation.creatorInformation.website ? getCurrentProjectInformation.creatorInformation.website: '-' }}</div>
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
      name: 'ProjectCreatorSettings',
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
