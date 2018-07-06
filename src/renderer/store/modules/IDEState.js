const state = {
  bottomBar: {
    loadingText: '',
    loadingMode: 'NONE',
    loadingPercentage: 0,
    loadingError: undefined
  }
}

const mutations = {
  SET_LOADING_TEXT_BOTTOM_BAR (state, loadingText) {
    state.bottomBar.loadingText = loadingText
  },
  SET_LOADING_MODE_BOTTOM_BAR (state, mode) {
    state.bottomBar.loadingMode = mode
  },
  SET_LOADING_PERCENTAGE_BOTTOM_BAR (state, percentage) {
    state.bottomBar.loadingPercentage = percentage
  },
  RESET_LOADING_BOTTOM_BAR (state) {
    state.bottomBar = {
      loadingText: '',
      loadingMode: 'NONE',
      loadingPercentage: 0,
      loadingError: undefined
    }
  },
  ERROR_LOADING_BOTTOM_BAR (state, errorMessage) {
    state.bottomBar.loadingError = errorMessage
  }
}

const actions = {
  setBottomLoadingTextMode ({ commit }, loadingText, loadingMode) {
    commit('RESET_LOADING_BOTTOM_BAR')
    commit('SET_LOADING_MODE_BOTTOM_BAR', loadingMode)
    commit('SET_LOADING_TEXT_BOTTOM_BAR', loadingText)
  },
  setBottomLoadingPercentage ({ commit }, percentage) {
    commit('SET_LOADING_PERCENTAGE_BOTTOM_BAR', percentage)
  },
  stopBottomLoadingMode ({ commit }) {
    commit('RESET_LOADING_BOTTOM_BAR')
  },
  stopBottomLoadingModeWithError ({ commit }, errorMessage) {
    commit('ERROR_LOADING_BOTTOM_BAR', errorMessage)
  }
}

const getters = {
  getBottomLoadingText: function (state) {
    return state.bottomBar.loadingText
  },
  getBottomLoadingMode: function (state) {
    return state.bottomBar.loadingMode
  },
  getBottomLoadingPercentage: function (state) {
    return state.bottomBar.loadingPercentage
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
