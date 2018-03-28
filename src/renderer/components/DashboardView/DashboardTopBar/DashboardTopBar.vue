<template>
    <div>
        <header id="navbar" class="navbar">
            <section class="navbar-section">
                <a href="#" class="btn btn-link">Undo</a>
                <a href="#" class="btn btn-link">Redo</a>
                <a href="#" class="btn btn-link">Save</a>
            </section>
            <section class="navbar-center">
                <img class="centered" id="logo" src="~@/assets/logo.png" alt="electron-vue"/>
            </section>
            <section class="navbar-section">
                <a href="#" class="btn btn-link">Settings</a>
                <a href="#" class="btn btn-link">Run</a>
                <a href="#" class="btn btn-link">Share</a>
            </section>
        </header>
        <div class="divider"></div>
    </div>
</template>
<script>
    export default {
      name: 'DashboardTopBar'
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