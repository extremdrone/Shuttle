<template>
  <div v-show="getStepperInfo.currentStep === 1" id="appInformationContainer">
            <div class="columns">
                <div class="col-10 col-mx-auto">
                    <h3>App Information: </h3>
                    <p>This is the basic info we need to create your mobile applications. Keep in mind you <strong>can</strong> change this information later.</p>
                </div>
                <div class="col-10 col-mx-auto">
                    <div class="divider"></div>
                    <form class="form-horizontal" id="appInformationForm">
                        <div class="form-group">
                            <div class="col-2 col-sm-12">
                            <label class="form-label" for="input-example-1"><strong>App Name *</strong></label>
                            </div>
                            <div class="col-9 col-sm-12 col-ml-auto">
                            <input :value="this.getNewProject.appInformation.appName" @input="updatedAppName" class="form-input" type="text" id="input-example-1" placeholder="Ex: My Rocket App">
                            </div>
                        </div>
                        <br>
                        <div class="form-group">
                            <div class="col-2 col-sm-12">
                            <label class="form-label" for="input-example-1"><strong>App Category *</strong></label>
                            </div>
                            <div class="col-9 col-sm-12 col-ml-auto">
                            <select :value="this.getNewProject.appInformation.appCategory" @input="updatedAppCategory" class="form-select">
                                <option v-for="category in getCreationFormValues.appInformation.appCategories" v-bind:key="category.value" v-bind:value="category.value">{{category.title}}</option>
                            </select>
                            </div>
                        </div>
                        <br>
                        <div class="form-group">
                            <div class="col-2 col-sm-12">
                            <label class="form-label" for="input-example-1"><strong>App Platforms *</strong></label>
                            </div>
                            <div class="col-9 col-sm-12 col-ml-auto">
                            <select :value="this.getNewProject.appInformation.appPlatforms" @input="updatedAppPlatform" class="form-select">
                                <option v-for="platform in getCreationFormValues.appInformation.appPlatforms" v-bind:key="platform.value" v-bind:value="platform.value">{{platform.title}}</option>
                            </select>
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
      name: 'NewAppInformationChild',
      methods: {
        updatedAppName (event) {
          this.$store.dispatch('setNewAppName', event.target.value)
        },
        updatedAppCategory (event) {
          this.$store.dispatch('setNewAppCategory', event.target.value)
        },
        updatedAppPlatform (event) {
          this.$store.dispatch('setNewAppPlatform', event.target.value)
        }
      },
      computed: {
        ...mapGetters([
          'getCreationFormValues',
          'getNewProject',
          'getStepperInfo'
        ])
      }
    }
</script>

<style scoped>
    #appInformationContainer {
        margin-top: 60px;
    }

    #appInformationForm {
        margin-top: 60px;
    }
</style>
