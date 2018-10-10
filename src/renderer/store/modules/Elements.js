const state = {
  elements: {
    label: {
      name: 'Text Label',
      icon: ['fas', 'font'],
      description: 'Shows short text',
      id: 'idLabel1',
      type: 'LABEL',
      index: 1,
      frame: {
        x: {
          value: 0.5,
          scale: 'PERCENTAGE'
        },
        y: {
          value: 0.5,
          scale: 'PERCENTAGE'
        },
        width: {
          value: 100,
          scale: 'EXACT'
        },
        height: {
          value: 44,
          scale: 'EXACT'
        }
      },
      view: {
        backgroundColor: {
          hsl: { h: 0, s: 0, l: 1, a: 1 },
          hex: '#FFFFFF',
          rgba: { r: 255, g: 255, b: 255, a: 1 },
          hsv: { h: 0, s: 0, v: 1, a: 1 },
          oldHue: 0,
          source: 'hex',
          a: 1
        },
        hidden: false,
        userInteraction: true
      },
      title: {
        text: 'Label',
        textColor: {
          hsl: { h: 196.98630136986304, s: 0.9820627802690584, l: 0.4372549019607843, a: 1 },
          hex: '#029FDD',
          rgba: { r: 2, g: 159, b: 221, a: 1 },
          hsv: { h: 196.98630136986304, s: 0.9909502262443439, v: 0.8666666666666667, a: 1 },
          oldHue: 196.98630136986304,
          source: 'hex',
          a: 1
        },
        textSize: 17,
        textAlignment: 'LEFT',
        textStyle: 'DEFAULT'
      }
    },
    button: {
      type: 'BUTTON',
      name: 'Button',
      description: 'Handle user action',
      id: 'idButton1',
      index: 2,
      frame: {
        x: {
          value: 0.5,
          scale: 'PERCENTAGE'
        },
        y: {
          value: 0.5,
          scale: 'PERCENTAGE'
        },
        width: {
          value: 100,
          scale: 'EXACT'
        },
        height: {
          value: 44,
          scale: 'EXACT'
        }
      },
      view: {
        backgroundColor: {
          hsl: { h: 196.98630136986304, s: 0.9820627802690584, l: 0.4372549019607843, a: 1 },
          hex: '#029FDD',
          rgba: { r: 2, g: 159, b: 221, a: 1 },
          hsv: { h: 196.98630136986304, s: 0.9909502262443439, v: 0.8666666666666667, a: 1 },
          oldHue: 196.98630136986304,
          source: 'hex',
          a: 1
        },
        hidden: false,
        userInteraction: true
      },
      title: {
        text: 'Label',
        textColor: {
          hsl: { h: 0, s: 0, l: 1, a: 1 },
          hex: '#FFFFFF',
          rgba: { r: 255, g: 255, b: 255, a: 1 },
          hsv: { h: 0, s: 0, v: 0, a: 1 },
          oldHue: 0,
          source: 'hex',
          a: 1
        },
        textSize: 17,
        textAlignment: 'CENTER',
        textStyle: 'DEFAULT'
      },
      actions: {
        onTouchUpInside: [],
        onTouchDown: [],
        onTouchUpOutside: []
      }
    },
    textfield: {
      type: 'TEXTFIELD',
      icon: ['fas', 'keyboard'],
      name: 'Text Field',
      description: 'Prompt the user for keyboard input'
    },
    image: {
      type: 'IMAGEVIEW',
      icon: ['far', 'image'],
      name: 'Image',
      description: 'Present an image',
      id: 'idImage1',
      index: 1,
      frame: {
        x: {
          value: 0.5,
          scale: 'PERCENTAGE'
        },
        y: {
          value: 0.5,
          scale: 'PERCENTAGE'
        },
        width: {
          value: 100,
          scale: 'EXACT'
        },
        height: {
          value: 100,
          scale: 'EXACT'
        }
      },
      view: {
        backgroundColor: {
          hsl: { h: 0, s: 0, l: 1, a: 1 },
          hex: '#FFFFFF',
          rgba: { r: 255, g: 255, b: 255, a: 1 },
          hsv: { h: 0, s: 0, v: 1, a: 1 },
          oldHue: 0,
          source: 'hex',
          a: 1
        },
        hidden: false,
        userInteraction: true
      },
      image: {
        onlineResource: false, // true if the resource is a URL to a image
        url: '%PROJECT_PATH%/assets/images/ShuttlePlaceholder.png', // Local URL if not an online resource
        data: undefined,
        scaleType: 'ASPECT_FILL'
      }
    },
    view: {
      type: 'VIEW',
      icon: ['far', 'square'],
      name: 'Empty View',
      description: 'Commonly used as a container for other elements',
      id: 'idView',
      index: 1,
      frame: {
        x: {
          value: 0.5,
          scale: 'PERCENTAGE'
        },
        y: {
          value: 0.5,
          scale: 'PERCENTAGE'
        },
        width: {
          value: 100,
          scale: 'EXACT'
        },
        height: {
          value: 100,
          scale: 'EXACT'
        }
      },
      view: {
        backgroundColor: {
          hsl: { h: 0, s: 0, l: 1, a: 1 },
          hex: '#FFFFFF',
          rgba: { r: 255, g: 255, b: 255, a: 1 },
          hsv: { h: 0, s: 0, v: 1, a: 1 },
          oldHue: 0,
          source: 'hex',
          a: 1
        },
        hidden: false,
        userInteraction: true
      },
      subviews: {}
    },
    webview: {
      type: 'WEBVIEW',
      icon: ['fab', 'safari'],
      name: 'Web View',
      description: 'Load and show websites and web content'
    }
  },
  newElement: {
    showElementIDModal: false,
    name: '',
    filteredID: ''
  },
  placeholderElement: undefined,
  placeholderDragElement: undefined
}

const mutations = {
  SET_SHOW_ELEMENT_MODAL_ID (state, show) {
    state.newElement.showElementIDModal = show
  },
  SET_SELECTED_ELEMENT_PLACEHOLDER (state, element) {
    state.placeholderElement = element
  },
  SET_SELECTED_DRAG_ELEMENT_PLACEHOLDER (state, element) {
    state.placeholderDragElement = element
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
  setPlaceholderElement ({ commit }, element) {
    commit('SET_SELECTED_ELEMENT_PLACEHOLDER', element)
  },
  setPlaceholderDragElement ({ commit }, element) {
    commit('SET_SELECTED_DRAG_ELEMENT_PLACEHOLDER', element)
  },
  setNewElementName ({ commit }, payload) {
    commit('SET_NEW_ELEMENT_NAME', payload)
  },
  resetPlaceholderDragElement ({ commit }) {
    commit('SET_SELECTED_DRAG_ELEMENT_PLACEHOLDER', undefined)
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
  getPlaceholderElement: function (state) {
    return state.placeholderElement
  },
  getPlaceholderDragElement: function (state) {
    return state.placeholderDragElement
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
