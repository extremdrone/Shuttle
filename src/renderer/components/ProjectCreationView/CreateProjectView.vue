<template>
    <div>
        <!-- Stepper containing the current active step -->
        <div id="stepperContainer">
            <ul class="step">
                <li v-for="(step, index) in getStepperInfo.steps" v-bind:item="step" v-bind:index="index" v-bind:key="step.position" v-bind:class="{ active: getStepperInfo.currentStep === step.position, 'step-item': true }">
                    <a href="#" class="tooltip" v-bind:data-tooltip="step.toolTip">{{ step.title }}</a>
                </li>
            </ul>
        </div>
        <router-view></router-view>
        <div class="columns">
            <div class="col-10 col-mx-auto" id="stepsBottomBar">
                <div class="divider"></div>
                <header class="navbar">
                    <section class="navbar-section">
                    </section>
                    <section class="navbar-center">
                    </section>
                    <section class="navbar-section">
                        <a href="#" v-bind:class="{ 'btn': true, 'btn-primary':true, 'disabled c-not-allowed': !isAppInformationDone()}">Next Step</a>
                    </section>
                </header>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      name: 'CreateProjectView',
      methods: {
        isAppInformationDone: function () {
          return this.$store.getters.isNewAppInformationComplete
        }
      },
      computed: {
        ...mapGetters([
          'getStepperInfo'
        ])
      }
    }
</script>

<style scoped>
    #stepsBottomBar {
        margin-top: 60px;
    }
</style>

