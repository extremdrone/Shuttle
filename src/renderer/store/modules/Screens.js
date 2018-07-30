const state = {
  sampleScreens: [
    {
      type: 'BLANK',
      title: 'Blank Screen',
      icon: ['far', 'square'],
      screenElement: {
        name: 'Home',
        isInitialScreen: false,
        style: {
          backgroundColor: {
            hsl: { h: 0, s: 0, l: 1, a: 1 },
            hex: '#FFFFFF',
            rgba: { r: 255, g: 255, b: 255, a: 1 },
            hsv: { h: 0, s: 0, v: 1, a: 1 },
            oldHue: 0,
            source: 'hex',
            a: 1
          }
        },
        elements: {}
      }
    }
  ],
  newScreen: {
    showScreenIDModal: false,
    name: '',
    filteredID: ''
  },
  placeholderScreen: {
    type: 'BLANK'
  }
}

const mutations = {
  SET_SHOW_SCREEN_MODAL_ID (state, show) {
    state.newScreen.showScreenIDModal = show
  },
  SET_SELECTED_SCREEN_PLACEHOLDER (state, screen) {
    state.placeholderScreen = screen
  },
  SET_NEW_SCREEN_NAME (state, payload) {
    state.newScreen.name = payload.name
    state.newScreen.filteredID = payload.filteredID
  }
}

const actions = {
  setShowScreenModalID ({ commit }, show) {
    commit('SET_SHOW_SCREEN_MODAL_ID', show)
  },
  setPlaceholderScreen ({ commit }, screen) {
    commit('SET_SELECTED_SCREEN_PLACEHOLDER', screen)
  },
  setNewScreenName ({ commit }, payload) {
    commit('SET_NEW_SCREEN_NAME', payload)
  }
}

const getters = {
  getAvailableScreens: function (state) {
    return state.sampleScreens
  },
  getShowScreenModalID: function (state) {
    return state.newScreen.showScreenIDModal
  },
  getPlaceholderScreen: function (state) {
    return state.placeholderScreen
  },
  getNewScreen: function (state) {
    return state.newScreen
  },
  getScreenForSelectedPlaceholderType: function (state) {
    for (var screenTemplate of state.sampleScreens) {
      if (screenTemplate.type === state.placeholderScreen.type) {
        return screenTemplate
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
