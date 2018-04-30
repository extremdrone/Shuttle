const state = {
  currentProject: {},
  currentProjectPath: '',
  currentScreen: {},
  currentScreenID: {},
  currentElementID: '',
  currentScreenPointers: []
}

const mutations = {
  RESET_CURRENT_PROJECT (state) {
    state.currentProject = {}
    state.currentScreen = {}
    state.currentScreenPointers = []
    state.currentElementID = ''
    state.currentProjectPath = ''
  },
  SET_CURRENT_PROJECT (state, project, screen, screenPointers) {
    state.currentProject = project
    state.currentScreenID = screen.id
    state.currentScreen[state.currentScreenID] = screen
    state.currentScreenPointers = screenPointers
  },
  SET_CURRENT_PROJECT_PATH (state, path) {
    state.currentProjectPath = path
  },
  SET_CURRENT_PROJECT_INFORMATION (state, project) {
    state.currentProject = project
  },
  SET_CURRENT_PROJECT_SCREEN (state, screen) {
    state.currentScreenID = screen.id
    state.currentScreen[screen.id] = screen
  },
  SET_CURRENT_PROJECT_SCREEN_POINTERS (state, screenPointers) {
    state.currentScreenPointers = screenPointers
  },
  SET_CURRENT_ELEMENT_ID (state, elementID) {
    state.currentElementID = elementID
  },
  SET_CURRENT_ELEMENT_CONTENT (state, elementJSON) {
    state.currentScreen[state.currentScreenID].elements[elementJSON.id] = elementJSON
  }
}

const actions = {
  resetCurrentProject ({ commit }) {
    commit('RESET_CURRENT_PROJECT')
  },
  setCurrentProject ({ commit }, project, screen, screenPointers) {
    commit('SET_CURRENT_PROJECT', project, screen, screenPointers)
  },
  setCurrentProjectPath ({ commit }, path) {
    commit('SET_CURRENT_PROJECT_PATH', path)
  },
  setCurrentProjectInformation ({ commit }, project) {
    commit('SET_CURRENT_PROJECT_INFORMATION', project)
  },
  setCurrentProjectScreen ({ commit }, screen) {
    commit('SET_CURRENT_PROJECT_SCREEN', screen)
  },
  setCurrentProjectScreenPointers ({ commit }, screenPointers) {
    commit('SET_CURRENT_PROJECT_SCREEN_POINTERS', screenPointers)
  },
  setSelectedElementID ({ commit }, elementID) {
    commit('SET_CURRENT_ELEMENT_ID', elementID)
  }
}

const getters = {
  getCurrentProjectPath: function (state) {
    return state.currentProjectPath
  },
  getCurrentProjectInformation: function (state) {
    return state.currentProject
  },
  getCurrentScreenID: function (state) {
    return state.currentScreenID
  },
  getCurrentProjectScreen: function (state) {
    return state.currentScreen[state.currentScreenID]
  },
  getCurrentProjectElementsAsArray: function (state) {
    var elementsAsArray = []
    for (const elementKey in state.currentScreen[state.currentScreenID].elements) {
      if (state.currentScreen[state.currentScreenID].elements.hasOwnProperty(elementKey)) {
        elementsAsArray.push(state.currentScreen[state.currentScreenID].elements[elementKey])
      }
    }
    return elementsAsArray
  },
  getCurrentProjectScreenPointers: function (state) {
    return state.currentScreenPointers
  },
  getCurrentSelectedElementID: function (state) {
    return state.currentElementID
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
