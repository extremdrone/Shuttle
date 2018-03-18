<template>
<div v-show="getStepperInfo.currentStep === 2" id="creatorInformationContainer">
            <div class="columns">
                <div class="col-10 col-mx-auto">
                    <h3>Creator Information: </h3>
                    <p>This is the basic info we need to create your mobile applications. Keep in mind you <strong>can</strong> change this information later.</p>
                </div>
                <div class="col-10 col-mx-auto">
                    <div class="divider"></div>
                    <form class="form-horizontal" id="creatorInformationForm">
                        <div class="form-group">
                            <div class="col-2 col-sm-12">
                            <label class="form-label" for="input-example-1"><strong>Creator Name *</strong></label>
                            </div>
                            <div class="col-9 col-sm-12 col-ml-auto">
                            <input :value="this.getNewProject.creatorInformation.name" @input="updatedCreatorName" class="form-input" type="text" id="input-example-1" placeholder="Ex: David Cruz">
                            </div>
                        </div>
                        <br>
                        <div class="form-group">
                            <div class="col-2 col-sm-12">
                            <label class="form-label" for="input-example-1"><strong>Creator Email *</strong></label>
                            </div>
                            <div class="col-9 col-sm-12 col-ml-auto">
                            <input :value="this.getNewProject.creatorInformation.email" @input="updatedCreatorEmail" class="form-input" type="text" id="input-example-1" placeholder="Ex: david@appshuttle.io">
                            </div>
                        </div>
                        <br>
                        <div class="form-group">
                            <div class="col-2 col-sm-12">
                            <label class="form-label" for="input-example-1"><strong>Creator Website</strong></label>
                            </div>
                            <div class="col-9 col-sm-12 col-ml-auto">
                            <input :value="this.getNewProject.creatorInformation.website" @input="updatedCreatorWebsite" class="form-input" type="text" id="input-example-1" placeholder="Ex: https://appshuttle.io">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
      name: 'NewCreatorInformationChild',
      methods: {
        updatedCreatorName (event) {
          this.$store.dispatch('setNewCreatorName', event.target.value)
        },
        updatedCreatorEmail (event) {
          this.$store.dispatch('setNewCreatorEmail', event.target.value)
        },
        updatedCreatorWebsite (event) {
          this.$store.dispatch('setNewCreatorWebsite', event.target.value)
        }
      },
      computed: {
        ...mapGetters([
          'getNewProject',
          'getStepperInfo'
        ])
      }
    }
</script>

<style scoped>
    #creatorInformationContainer {
        margin-top: 60px;
    }

    #creatorInformationForm {
        margin-top: 60px;
    }
</style>