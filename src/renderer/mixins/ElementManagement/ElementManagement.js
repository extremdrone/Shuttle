export default {
  methods: {
    filterElementID: function (elementName) {
      var filteredID = elementName.replace(/ /g, '')
      return filteredID
    }
  }
}
