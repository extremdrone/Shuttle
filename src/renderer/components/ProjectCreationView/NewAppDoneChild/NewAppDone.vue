<template>
    <div v-show="getStepperInfo.currentStep === 3" id="doneContainer">
            <div class="columns">
                <div class="col-10 col-mx-auto unselectable c-default">
                    <h3 class="unselectable">You're all set! 🚀</h3>
                    <p> <span class="unselectable"> We know you will enjoy using <strong>Shuttle</strong>. Keep in mind this is a <strong>Beta version</strong>, we would ❤️ to hear from you. Any bugs, questions or even suggestions can be sent directly to: </span> <a href="mailto:hello@appshuttle.io">hello@appshuttle.io</a></p>
                </div>
            </div>
        </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
      name: 'NewDoneChild',
      computed: {
        ...mapGetters([
          'getNewProject',
          'getStepperInfo'
        ])
      }
    }
</script>
<style scoped>
    #doneContainer {
        margin-top: 60px;
    }
</style>