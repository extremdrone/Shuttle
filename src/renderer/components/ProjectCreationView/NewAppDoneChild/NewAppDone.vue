<template>
    <div v-show="getStepperInfo.currentStep === 3" id="doneContainer">
            <div class="columns">
                <div class="col-10 col-mx-auto">
                    <h3>You're all set! 🚀</h3>
                    <p>We know you will enjoy using <strong>Shuttle</strong>. Keep in mind this is an <strong>Alpha version</strong>, we would ❤️ to hear from you. Any bugs, questions or even suggestions can be sent directly to: <a href="mailto:david@appshuttle.io">david@appshutlle.io</a></p>
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