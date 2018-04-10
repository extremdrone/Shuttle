const state = {
  currentProject: {},
  currentScreen: {},
  currentScreenPointers: []
}

const mutations = {
  RESET_CURRENT_PROJECT (state) {
    state.currentProject = {}
    state.currentScreen = {}
    state.currentScreenPointers = []
  },
  SET_CURRENT_PROJECT (state, project, screen, screenPointers) {
    state.currentProject = project
    state.currentScreen = screen
    state.currentScreenPointers = screenPointers
  },
  SET_CURRENT_PROJECT_INFORMATION (state, project) {
    state.currentProject = project
  },
  SET_CURRENT_PROJECT_SCREEN (state, screen) {
    state.currentScreen = screen
  },
  SET_CURRENT_PROJECT_SCREEN_POINTERS (state, screenPointers) {
    state.currentScreenPointers = screenPointers
  }
}

const actions = {
  resetCurrentProject ({ commit }) {
    commit('RESET_CURRENT_PROJECT')
  },
  setCurrentProject ({ commit }, project, screen, screenPointers) {
    commit('SET_CURRENT_PROJECT', project, screen, screenPointers)
  },
  setCurrentProjectInformation ({ commit }, project) {
    commit('SET_CURRENT_PROJECT_INFORMATION', project)
  },
  setCurrentProjectScreen ({ commit }, screen) {
    commit('SET_CURRENT_PROJECT_SCREEN', screen)
  },
  setCurrentProjectScreenPointers ({ commit }, screenPointers) {
    commit('SET_CURRENT_PROJECT_SCREEN_POINTERS', screenPointers)
  }
}

const getters = {
  getCurrentProjectInformation: function (state) {
    return state.currentProject
  },
  getCurrentProjectScreen: function (state) {
    return state.currentScreen
  },
  getCurrentProjectScreenPointers: function (state) {
    return state.currentScreenPointers
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
