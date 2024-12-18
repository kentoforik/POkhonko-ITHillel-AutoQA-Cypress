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

  describe('is failed and shows appropriate errors', () => {
    it('for existing user', () => {
      UserSignUpFiller(validUser.common, signUpModalSelectors)
      cy.get(signUpModalSelectors.registerBtn).click()
      cy.get(signUpModalSelectors.userAlreadyExist)
        .should('have.text', signupModalErrorText.userAlreadyExist)
    })
  })

  describe('is forbidden and shows appropriate errors when NAME', () => {
    it('is empty', () => {
      UserSignUpFiller(inValidUser.withoutName, signUpModalSelectors)
      cy.get(signUpModalSelectors.nameInput)
        .type('1').clear().blur()
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.nameRequired)
        .should('have.text', signupModalErrorText.requiredName)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of invalid length and chars (2 errors simultaneously)', () => {
      UserSignUpFiller(inValidUser.withInvalidLengthAndCharsName, signUpModalSelectors)
      cy.get(signUpModalSelectors.nameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.nameInvalid)
        .should('have.text', signupModalErrorText.invalidName)

      cy.get(signUpModalSelectors.nameLengthInvalid)
        .should('have.text', signupModalErrorText.invalidNameLength)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of 1 char', () => {
      UserSignUpFiller(inValidUser.withShortName, signUpModalSelectors)
      cy.get(signUpModalSelectors.nameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.nameInvalid)
        .should('have.text', signupModalErrorText.invalidNameLength)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of 21 chars', () => {
      UserSignUpFiller(inValidUser.withLongName, signUpModalSelectors)
      cy.get(signUpModalSelectors.nameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.nameInvalid)
        .should('have.text', signupModalErrorText.invalidNameLength)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of valid length but contains NON english chars', () => {
      UserSignUpFiller(inValidUser.withNonEnglishCharsName, signUpModalSelectors)
      cy.get(signUpModalSelectors.nameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.nameInvalid)
        .should('have.text', signupModalErrorText.invalidName)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of valid length, but containing special characters and numbers', () => {
      UserSignUpFiller(inValidUser.withSpecialCharsName, signUpModalSelectors)
      cy.get(signUpModalSelectors.nameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.nameInvalid)
        .should('have.text', signupModalErrorText.invalidName)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })
  })

  describe('is forbidden and shows appropriate errors when LAST NAME', () => {
    it('is empty', () => {
      UserSignUpFiller(inValidUser.withoutLastName, signUpModalSelectors)
      cy.get(signUpModalSelectors.lastNameInput)
        .type('1').clear().blur()
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.lastNameRequired)
        .should('have.text', signupModalErrorText.requiredLastName)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of invalid length and chars (2 errors simultaneously)', () => {
      UserSignUpFiller(inValidUser.withInvalidLengthAndCharsLastName, signUpModalSelectors)
      cy.get(signUpModalSelectors.lastNameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.lastNameInvalid)
        .should('have.text', signupModalErrorText.invalidLastName)

      cy.get(signUpModalSelectors.lastNameLengthInvalid)
        .should('have.text', signupModalErrorText.invalidLastNameLength)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of 1 char', () => {
      UserSignUpFiller(inValidUser.withShortLastName, signUpModalSelectors)
      cy.get(signUpModalSelectors.lastNameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.lastNameLengthInvalid)
        .should('have.text', signupModalErrorText.invalidLastNameLength)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of 21 chars', () => {
      UserSignUpFiller(inValidUser.withLongLastName, signUpModalSelectors)
      cy.get(signUpModalSelectors.lastNameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.lastNameLengthInvalid)
        .should('have.text', signupModalErrorText.invalidLastNameLength)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of valid length but contains NON english chars', () => {
      UserSignUpFiller(inValidUser.withNonEnglishCharsLastName, signUpModalSelectors)
      cy.get(signUpModalSelectors.lastNameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.lastNameInvalid)
        .should('have.text', signupModalErrorText.invalidLastName)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of valid length, containing special characters and numbers', () => {
      UserSignUpFiller(inValidUser.withSpecialCharsLastName, signUpModalSelectors)
      cy.get(signUpModalSelectors.lastNameInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.lastNameInvalid)
        .should('have.text', signupModalErrorText.invalidLastName)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })
  })

  describe('is forbidden and shows appropriate errors when Email', () => {
    it('is empty', () => {
      UserSignUpFiller(inValidUser.withoutEmail, signUpModalSelectors)
      cy.get(signUpModalSelectors.emailInput)
        .type('1').clear().blur()
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.emailRequired)
        .should('have.text', signupModalErrorText.requiredEmail)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('missing \@ char within', () => {
      UserSignUpFiller(inValidUser.withIncorrectEmail, signUpModalSelectors)
      cy.get(signUpModalSelectors.emailInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.emailInvalid)
        .should('have.text', signupModalErrorText.invalidEmail)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

  })

  describe('is forbidden and shows appropriate errors when PASSWORD', () => {
    it('is empty', () => {
      UserSignUpFiller(inValidUser.withoutPassword, signUpModalSelectors)
      cy.get(signUpModalSelectors.passwordInput)
        .type('1').clear().blur()
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.passwordRequired)
        .should('have.text', signupModalErrorText.requiredPassword)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of 7 chars', () => {
      UserSignUpFiller(inValidUser.withShortPassword, signUpModalSelectors)
      cy.get(signUpModalSelectors.passwordInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.passwordInvalid)
        .should('have.text', signupModalErrorText.invalidPassword)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of 16 chars', () => {
      UserSignUpFiller(inValidUser.withLongPassword, signUpModalSelectors)
      cy.get(signUpModalSelectors.passwordInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.passwordInvalid)
        .should('have.text', signupModalErrorText.invalidPassword)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of valid length but has NO integer', () => {
      UserSignUpFiller(inValidUser.withNoIntegerInPassword, signUpModalSelectors)
      cy.get(signUpModalSelectors.passwordInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.passwordInvalid)
        .should('have.text', signupModalErrorText.invalidPassword)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of valid length but has NO capital letter', () => {
      UserSignUpFiller(inValidUser.withNoCapitalInPassword, signUpModalSelectors)
      cy.get(signUpModalSelectors.passwordInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.passwordInvalid)
        .should('have.text', signupModalErrorText.invalidPassword)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

    it('of valid length but has NO small letter', () => {
      UserSignUpFiller(inValidUser.withNoSmallInPassword, signUpModalSelectors)
      cy.get(signUpModalSelectors.passwordInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.passwordInvalid)
        .should('have.text', signupModalErrorText.invalidPassword)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })

  })

  describe('is forbidden and shows appropriate errors when RE-ENTERED PASSWORD', () => {
    it('is empty', () => {
      UserSignUpFiller(inValidUser.withoutReEnteredPassword, signUpModalSelectors)

      cy.get(signUpModalSelectors.passwordReEnterInput).focus().blur()

      cy.get(signUpModalSelectors.passwordReEnterInput)
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.passwordReEnterRequired)
        .should('have.text', signupModalErrorText.requiredReEnterPassword)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')

    })

    it('not matching main Password', () => {
      UserSignUpFiller(inValidUser.withNotMatchingReEnteredPassword, signUpModalSelectors)
      cy.get(signUpModalSelectors.passwordReEnterInput)
        .blur()
        .should('have.css', 'border-color', invalidInputProps.borderColor)
        .and('have.class', invalidInputProps.classProp)

      cy.get(signUpModalSelectors.passwordReEnteredInvalid)
        .should('have.text', signupModalErrorText.passwordNotMatch)

      cy.get(signUpModalSelectors.registerBtn).should('have.attr', 'disabled')
    })
  })

})