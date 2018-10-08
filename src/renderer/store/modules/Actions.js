/* jshint esversion: 6 */

const state = {
  availableActions: [
    {
      id: '(ActionName)',
      type: 'SEGUE',
      title: 'Show Screen',
      segue: {
        segueId: '(sourceScreenID_destinationScreenID_actionId',
        sourceScreenId: undefined,
        destinationScreenId: undefined,
        payload: undefined
      },
      icon: ['fas', 'arrow-alt-circle-right']
    },
    {
      id: '(ActionName)',
      type: 'SYSTEM',
      title: 'System Action',
      systemAction: {
        event: '(System Event)',
        payload: undefined
      },
      icon: ['fas', 'mobile-alt']
    }
  ],
  availableSystemEvents: [
    {
      type: 'CALL',
      icon: ['fas', 'font']
    },
    {
      type: 'EMAIL',
      icon: ['fas', 'font']
    },
    {
      type: 'BROWSER',
      icon: ['fas', 'font']
    },
    {
      type: 'SMS',
      icon: ['fas', 'font']
    }
  ],
  newAction: {
    showActionsModal: false,
    name: '',
    filteredID: ''
  },
  placeholderAction: {
    type: 'SEGUE'
  }
}

const mutations = {
  SET_SHOW_ACTION_MODAL_ID (state, show) {
    state.newAction.showActionsModal = show
  },
  SET_SELECTED_ACTION_PLACEHOLDER (state, action) {
    state.placeholderAction = action
  },
  SET_NEW_ACTION_NAME (state, payload) {
    state.newAction.name = payload.name
    state.newAction.filteredID = payload.filteredID
  },
  SET_NEW_ACTION_SEGUE (state, payload) {
    state.newAction.segue = payload
  },
  RESET_NEW_ACTION (state) {
    state.newAction = {
      showActionsModal: false,
      name: '',
      filteredID: ''
    }
    state.placeholderAction = {
      type: 'SEGUE'
    }
  }
}

const actions = {
  setShowActionModalID ({ commit }, show) {
    commit('SET_SHOW_ACTION_MODAL_ID', show)
  },
  setPlaceholderAction ({ commit }, action) {
    commit('SET_SELECTED_ACTION_PLACEHOLDER', action)
  },
  setNewActionName ({ commit }, payload) {
    commit('SET_NEW_ACTION_NAME', payload)
  },
  setNewActionSegue ({ commit }, payload) {
    commit('SET_NEW_ACTION_SEGUE', payload)
  },
  resetNewAction ({ commit }) {
    commit('RESET_NEW_ACTION')
  }
}

const getters = {
  getAvailableActions: function (state) {
    return state.availableActions
  },
  getAvailableSystemEvents: function (state) {
    return state.availableSystemEvents
  },
  getShowActionModalID: function (state) {
    return state.newAction.showActionsModal
  },
  getPlaceholderAction: function (state) {
    return state.placeholderAction
  },
  getNewAction: function (state) {
    return state.newAction
  },
  getActionForSelectedPlaceholderType: function (state) {
    for (var actionTemplate of state.availableActions) {
      if (actionTemplate.type === state.placeholderAction.type) {
        return actionTemplate
      }
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
