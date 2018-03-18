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
                        <a v-on:click="goToPage('BACK')" class="btn btn-gray">{{ getStepperInfo.currentStep === 1 ? 'Cancel':'Previous Step' }}</a>
                    </section>
                    <section class="navbar-center">
                    </section>
                    <section class="navbar-section">
                        <a v-on:click="goToPage('NEXT')" v-bind:class="{ 'btn': true, 'btn-primary':true, 'disabled c-not-allowed': !isInformationDone(getStepperInfo.currentStep)}">{{ getStepperInfo.currentStep === 3 ? 'Go to my App!':'Next Step' }}</a>
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
        isInformationDone: function (step) {
          switch (step) {
            case 1: {
              return this.$store.getters.isNewAppInformationComplete
            }
            case 2: {
              return this.$store.getters.isNewCreatorInformationComplete
            }
            case 3: {
              return true
            }
          }
        },
        goToPage: function (direction) {
          if (direction === 'NEXT') {
            this.$store.dispatch('goToNextPage')
          } else {
            if (this.$store.getters.getStepperInfo.currentStep === 1) {
              this.$store.dispatch('resetNewProject')
              this.$router.go(-1)
            } else {
              this.$store.dispatch('goToPreviousPage')
            }
          }
          switch (this.$store.getters.getStepperInfo.currentStep) {
            case 1: {
              this.$router.push('/createProject/newAppInformation')
              break
            }
            case 2: {
              this.$router.push('/createProject/newCreatorInformation')
              break
            }
            case 3: {
              this.$router.push('/createProject/newAppDone')
              break
            }
          }
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

