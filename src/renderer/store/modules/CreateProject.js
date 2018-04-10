const state = {
  newProject: {
    appInformation: {
      appName: undefined,
      appCategory: undefined,
      appPlatforms: 'BOTH'
    },
    creatorInformation: {
      name: undefined,
      email: undefined,
      website: undefined
    }
  },
  stepper: {
    currentStep: 1,
    steps: [
      {
        title: 'App Information',
        toolTip: 'Step 1',
        position: 1
      },
      {
        title: 'Creator Information',
        toolTip: 'Step 2',
        position: 2
      },
      {
        title: 'Done',
        toolTip: 'Step 3',
        position: 3
      }
    ]
  },
  creationForm: {
    appInformation: {
      appCategories: [
        {
          title: 'Select Category',
          value: ''
        },
        {
          title: 'Books',
          value: 'BOOKS'
        },
        {
          title: 'Business',
          value: 'BUSINESS'
        },
        {
          title: 'Education',
          value: 'EDUCATION'
        },
        {
          title: 'Entertainment',
          value: 'ENTERTAINMENT'
        },
        {
          title: 'Finance',
          value: 'FINANCE'
        },
        {
          title: 'Food & Drink',
          value: 'FOOD_AND_DRINK'
        },
        {
          title: 'Games',
          value: 'GAMES'
        },
        {
          title: 'Health & Fitness',
          value: 'HEALTH_AND_FITNESS'
        },
        {
          title: 'Lifestyle',
          value: 'LIFESTYLE'
        },
        {
          title: 'Magazines & Newspapers',
          value: 'MAGAZINES_AND_NEWSPAPERS'
        },
        {
          title: 'Medical',
          value: 'MEDICAL'
        },
        {
          title: 'Music',
          value: 'MUSIC'
        },
        {
          title: 'Navigation',
          value: 'NAVIGATION'
        },
        {
          title: 'News',
          value: 'NEWS'
        },
        {
          title: 'Photo & Video',
          value: 'PHOTO_AND_VIDEO'
        },
        {
          title: 'Productivity',
          value: 'PRODUCTIVITY'
        },
        {
          title: 'Reference',
          value: 'REFERENCE'
        },
        {
          title: 'Shopping',
          value: 'SHOPPING'
        },
        {
          title: 'Social Networking',
          value: 'SOCIAL_NETWORKING'
        },
        {
          title: 'Sports',
          value: 'SPORTS'
        },
        {
          title: 'Travel',
          value: 'TRAVEL'
        },
        {
          title: 'Utilities',
          value: 'UTILITIES'
        },
        {
          title: 'Weather',
          value: 'WEATHER'
        }
      ],
      appPlatforms: [
        {
          title: 'Both iOS & Android',
          value: 'BOTH'
        },
        {
          title: 'iOS Only',
          value: 'IOS'
        },
        {
          title: 'Android Only',
          value: 'ANDROID'
        }
      ]
    }
  },
  sampleProjectScreens: {
    homeScreen: {
      id: 'homeScreen',
      name: 'Home',
      isInitialScreen: true,
      style: {
        backgroundColor: '#029FDD'
      },
      elements: {
        idButton1: {
          id: 'idButton1',
          frame: {
            x: {
              value: 0.25,
              scale: 'PERCENTAGE'
            },
            y: {
              value: 0.75,
              scale: 'PERCENTAGE'
            },
            width: {
              value: 0.5,
              scale: 'PERCENTAGE'
            },
            height: {
              value: 44,
              scale: 'EXACT'
            }
          },
          view: {
            backgroundColor: '#029FDD'
          },
          title: {
            text: 'View Examples',
            textColor: '#FFFFFF',
            textSize: 15
          }
        }
      }
    },
    elementsScreen: {
      id: 'elementsScreen',
      name: 'Elements',
      style: {
        backgroundColor: '#ffffff'
      }
    }
  }
}

const mutations = {
  INCREMENT_PAGE (state) {
    if (state.stepper.steps.length > state.stepper.currentStep) {
      state.stepper.currentStep = state.stepper.currentStep + 1
    }
  },
  DECREMENT_PAGE (state) {
    if (state.stepper.currentStep > 1) {
      state.stepper.currentStep = state.stepper.currentStep - 1
    }
  },
  RESET_NEW_PROJECT (state) {
    state.newProject = {
      appInformation: {
        appName: undefined,
        appCategory: undefined,
        appPlatforms: 'BOTH'
      },
      creatorInformation: {
        name: undefined,
        email: undefined,
        website: undefined
      }
    }
  },
  SET_APP_NAME (state, name) {
    state.newProject.appInformation.appName = name
  },
  SET_APP_CATEGORY (state, category) {
    state.newProject.appInformation.appCategory = category
  },
  SET_APP_PLATFORM (state, platform) {
    state.newProject.appInformation.appPlatforms = platform
  },
  SET_CREATOR_NAME (state, name) {
    state.newProject.creatorInformation.name = name
  },
  SET_CREATOR_EMAIL (state, email) {
    state.newProject.creatorInformation.email = email
  },
  SET_CREATOR_WEBSITE (state, website) {
    state.newProject.creatorInformation.website = website
  }
}

const actions = {
  goToNextPage ({ commit }) {
    commit('INCREMENT_PAGE')
  },
  goToPreviousPage ({ commit }) {
    commit('DECREMENT_PAGE')
  },
  resetNewProject ({ commit }) {
    commit('RESET_NEW_PROJECT')
  },
  setNewAppName ({ commit }, name) {
    commit('SET_APP_NAME', name)
  },
  setNewAppCategory ({ commit }, category) {
    commit('SET_APP_CATEGORY', category)
  },
  setNewAppPlatform ({ commit }, platform) {
    commit('SET_APP_PLATFORM', platform)
  },
  setNewCreatorName ({ commit }, name) {
    commit('SET_CREATOR_NAME', name)
  },
  setNewCreatorEmail ({ commit }, email) {
    commit('SET_CREATOR_EMAIL', email)
  },
  setNewCreatorWebsite ({ commit }, website) {
    commit('SET_CREATOR_WEBSITE', website)
  }
}

const getters = {
  getStepperInfo: function (state) {
    return state.stepper
  },
  getCreationFormValues: function (state) {
    return state.creationForm
  },
  getNewProject: function (state) {
    return state.newProject
  },
  getSampleProjectScreens: function (state) {
    return state.sampleProjectScreens
  },
  isNewAppInformationComplete: function (state) {
    if ((state.newProject.appInformation.appName === undefined) || (state.newProject.appInformation.appName === '')) {
      return false
    }
    if (state.newProject.appInformation.appCategory === undefined || state.newProject.appInformation.appCategory === '') {
      return false
    }
    if (state.newProject.appInformation.appPlatforms === undefined || state.newProject.appInformation.appPlatforms === '') {
      return false
    }
    return true
  },
  isNewCreatorInformationComplete: function (state) {
    if (state.newProject.creatorInformation.name === undefined || state.newProject.creatorInformation.name === '') {
      return false
    }
    if (state.newProject.creatorInformation.email === undefined || state.newProject.creatorInformation.email === '') {
      return false
    }
    return true
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
