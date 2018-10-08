export default {
  methods: {
    filterElementID: function (elementName) {
      var filteredID = elementName.replace(/ /g, '')
      return filteredID
    },
    addActionToElement: function (element, touchType, action) {
      var newElement = element
      if (!newElement.actions[touchType]) {
        newElement.actions[touchType] = []
      }
      newElement.actions[touchType].push(action)
      return newElement
    },
    deleteActionFromElement: function (element, action) {
      var newElement = element
      for (var i = 0; i < newElement.actions.onTouchUpInside.length; i++) {
        const currentAction = newElement.actions.onTouchUpInside[i]
        if (action.id === currentAction.id) {
          newElement.actions.onTouchUpInside.splice(i, 1)
          break
        }
      }
      for (var j = 0; j < newElement.actions.onTouchUpOutside.length; j++) {
        const currentAction = newElement.actions.onTouchUpOutside[j]
        if (action.id === currentAction.id) {
          newElement.actions.onTouchUpInside.splice(j, 1)
          break
        }
      }
      for (var x = 0; x < newElement.actions.onTouchDown.length; x++) {
        const currentAction = newElement.actions.onTouchDown[x]
        if (action.id === currentAction.id) {
          newElement.actions.onTouchUpInside.splice(x, 1)
          break
        }
      }
      return newElement
    }
  }
}
