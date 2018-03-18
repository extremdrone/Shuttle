const state = {
  projectPath: undefined
}

const mutations = {
  SET_PROJECT_PATH (state, newPath) {
    state.projectPath = newPath
  }
}

const actions = {
  setProjectPath ({ commit }, path) {
    commit('SET_PROJECT_PATH', path)
  }
}

const getters = {
  getProjectPath: function (state) {
    return state.projectPath
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
