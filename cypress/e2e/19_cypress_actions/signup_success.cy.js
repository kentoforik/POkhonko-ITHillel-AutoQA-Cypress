const { L19_URL: urls, L19_URL } = require('../urls.js')
const { UserSignUpFiller, authHandler } = require('../helpers/auth_helper.js')
const { validUser, inValidUser } = require('./test_data/user_login_data.js')
const { first_login_data } = require('./test_data/user_login_credentials.js')
const { signUpModalSelectors } = require('./test_data/selectors.js')
const { invalidInputProps } = require('./test_data/element_props.js')
const { signupModalErrorText } = require('./test_data/texts.js')

describe('User Sign up', () => {
  beforeEach(() => {
    authHandler(urls.homePage, first_login_data.username, first_login_data.password)
  })

  describe('is successful', () => {
    it('with common user', () => {
      UserSignUpFiller(validUser.common, signUpModalSelectors)
      cy.get(signUpModalSelectors.registerBtn).click()
      cy.url().should('equal', L19_URL.garagePage)
    })

    it('with user Name of 2 chars, user Last name of 2 chars and password of 8 chars', () => {
      UserSignUpFiller(validUser.allInputsMinLength, signUpModalSelectors)
      cy.get(signUpModalSelectors.registerBtn).click()
      cy.url().should('equal', L19_URL.garagePage)
    })

    it('with user Name of 20 chars, Last name of 20 chars and Password of 15 chars', () => {
      UserSignUpFiller(validUser.allInputsMaxLength, signUpModalSelectors)
      cy.get(signUpModalSelectors.registerBtn).click()
      cy.url().should('equal', L19_URL.garagePage)
    })
  })

})