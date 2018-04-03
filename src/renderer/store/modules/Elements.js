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
  }
}

const getters = {
  getAvailableElements: function (state) {
    return state.elements
  }
}

export default {
  state,
  getters
}
