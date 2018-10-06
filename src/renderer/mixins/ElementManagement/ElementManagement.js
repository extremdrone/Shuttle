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
    }
  }
}
