<template>
    <div>
        <header id="navbar" class="navbar">
            <section class="navbar-section">
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Go back one step"><font-awesome-icon icon="undo"/><small> Undo</small></a>
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Go one step further"><font-awesome-icon icon="redo"/><small> Redo</small></a>
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Save your current project"><font-awesome-icon icon="save"/><small> Save</small></a>
            </section>
            <section class="navbar-center">
                <img class="centered" id="logo" src="~@/assets/logo.png" alt="electron-vue"/>
            </section>
            <section class="navbar-section">
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Project Settings"><font-awesome-icon icon="wrench"/><small> Settings</small></a>
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Run your app"><font-awesome-icon icon="play"/><small> Run</small></a>
                <a href="#" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Share your app"><font-awesome-icon icon="share-square"/><small> Share</small></a>

            </section>
        </header>
        <div class="divider"></div>
    </div>
</template>
<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

    export default {
      name: 'DashboardTopBar',
      components: {
        FontAwesomeIcon
      }
    }
</script>
<style scoped>

    #navbar {
        width: 98vw;
        margin-left: 1vw;
    }

    #logo {
        height: 30px;
        width: auto;
    }

</style>