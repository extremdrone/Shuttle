<template>
    <div>
        <header id="navbar" class="navbar">
            <section class="navbar-section">
                <a href="#" class="btn btn-link">Docs</a>
                <a href="#" class="btn btn-link">Examples</a>
            </section>
            <section class="navbar-center">
                <img class="centered" id="logo" src="~@/assets/logo.png" alt="electron-vue"/>
            </section>
            <section class="navbar-section">
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