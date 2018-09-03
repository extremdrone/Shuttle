const EmailValidator = require('email-validator')

export default {
  methods: {
    validateEmailAddress: function (email) {
      return EmailValidator.validate(email)
    }
  }
}
