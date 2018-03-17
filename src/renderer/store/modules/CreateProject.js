const state = {
  newProject: {
    appInformation: {
      appName: undefined,
      appCategory: undefined,
      appPlatforms: 'BOTH'
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
  }
}

const mutations = {
  INCREMENT_PAGE (state) {
    if (state.pages.lenght > state.currentPage) {
      state.currentPage++
    }
  },
  DECREMENT_PAGE (state) {
    if (state.currentPage > 1) {
      state.currentPage--
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
  }
}

const actions = {
  setNewAppName ({ commit }, name) {
    commit('SET_APP_NAME', name)
  },
  setNewAppCategory ({ commit }, category) {
    commit('SET_APP_CATEGORY', category)
  },
  setNewAppPlatform ({ commit }, platform) {
    commit('SET_APP_PLATFORM', platform)
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
