const state = {
  elements: {
    label: {
      type: 'label',
      name: 'Text Label',
      description: 'Shows short text'
    },
    button: {
      type: 'button',
      name: 'Button',
      description: 'Handle user action'
    },
    image: {
      type: 'image',
      name: 'Image',
      description: 'Present an image'
    },
    view: {
      type: 'view',
      name: 'Empty View',
      description: 'Commonly used as a container for other elements'
    }
  },
  newElement: {
    showElementIDModal: false,
    name: '',
    filteredID: ''
  }
}

const mutations = {
  SET_SHOW_ELEMENT_MODAL_ID (state, show) {
    state.newElement.showElementIDModal = show
  },
  SET_NEW_ELEMENT_NAME (state, payload) {
    state.newElement.name = payload.name
    state.newElement.filteredID = payload.filteredID
  }
}

const actions = {
  setShowElementModalID ({ commit }, show) {
    commit('SET_SHOW_ELEMENT_MODAL_ID', show)
  },
  setNewElementName ({ commit }, payload) {
    commit('SET_NEW_ELEMENT_NAME', payload)
  }
}

const getters = {
  getAvailableElements: function (state) {
    return state.elements
  },
  getAvailableElementsAsArray: function (state) {
    var elementsAsArray = []
    for (const elementKey in state.elements) {
      if (state.elements.hasOwnProperty(elementKey)) {
        elementsAsArray.push(state.elements[elementKey])
      }
    }
    return elementsAsArray
  },
  getShowElementModalID: function (state) {
    return state.newElement.showElementIDModal
  },
  getNewElement: function (state) {
    return state.newElement
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
