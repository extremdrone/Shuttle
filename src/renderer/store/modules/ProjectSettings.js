const state = {
  projectSettingsTabHost: {
    currentTab: 0,
    tabs: [
      {
        title: 'App Settings',
        toolTip: 'App Information & Config.',
        position: 0
      },
      {
        title: 'Creator Settings',
        toolTip: 'Creator Information & Config',
        position: 1
      },
      {
        title: 'Other Settings',
        toolTip: 'Extras',
        position: 2
      }
    ]
  }
}

const mutations = {
  SET_CURRENT_PROJECT_SETTINGS_TAB (state, selectedTab) {
    state.projectSettingsTabHost.currentTab = selectedTab
  }
}

const actions = {
  setProjectSettingsSelectedTab ({ commit }, selectedTab) {
    commit('SET_CURRENT_PROJECT_SETTINGS_TAB', selectedTab)
  }
}

const getters = {
  getProjectSettingsTabHost: function (state) {
    return state.projectSettingsTabHost
  },
  getCurrentProjectSettingsSelectedTab: function (state) {
    return state.projectSettingsTabHost.currentTab
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
