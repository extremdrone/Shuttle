const state = {
  runModal: {
    showRunModal: false,
    runPlatform: undefined
  },
  runTargets: {
    iOS: undefined,
    Android: undefined
  },
  selectediOSRuntime: undefined,
  selectediOSDevice: undefined
}

const mutations = {
  SET_SHOW_RUN_MODAL (state, show) {
    state.runModal.showRunModal = show
  },
  SET_RUN_MODAL_PLATFORM (state, platform) {
    state.runModal.runPlatform = platform
  },
  SET_RUN_TARGETS (state, targets) {
    state.runTargets = targets
  },
  SET_SELECTED_IOS_RUNTIME (state, runtime) {
    state.selectediOSRuntime = runtime
  },
  SET_SELECTED_IOS_DEVICE (state, device) {
    state.selectediOSDevice = device
  }
}

const actions = {
  setShowRunModal ({ commit }, show) {
    commit('SET_SHOW_RUN_MODAL', show)
  },
  setRunModalPlatform ({ commit }, platform) {
    commit('SET_RUN_MODAL_PLATFORM', platform)
  },
  setRunTargets ({ commit }, targets) {
    commit('SET_RUN_TARGETS', targets)
  },
  setSelectediOSRuntime ({ commit }, runtime) {
    commit('SET_SELECTED_IOS_RUNTIME', runtime)
  },
  setSelectediOSDevice ({ commit }, device) {
    commit('SET_SELECTED_IOS_DEVICE', device)
  }
}

const getters = {
  getShowRunModal: function (state) {
    return state.runModal.showRunModal
  },
  getRunModalPlatform: function (state) {
    return state.runModal.runPlatform
  },
  getRunTargets: function (state) {
    return state.runTargets
  },
  getSelectediOSRuntime: function (state) {
    return state.selectediOSRuntime
  },
  getSelectediOSDevice: function (state) {
    return state.selectediOSDevice
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
