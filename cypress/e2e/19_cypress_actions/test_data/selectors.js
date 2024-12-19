export const signUpModalSelectors = {
  nameInput: '#signupName',
  lastNameInput: '#signupLastName',
  emailInput: '#signupEmail',
  passwordInput: '#signupPassword',
  passwordReEnterInput: '#signupRepeatPassword',

  registerBtn: 'app-signup-modal .modal-footer button.btn.btn-primary',

  userAlreadyExist: 'app-signup-modal .alert.alert-danger',

  nameRequired: '#signupName + .invalid-feedback > p',
  lastNameRequired: '#signupLastName + .invalid-feedback > p',
  emailRequired: '#signupEmail + .invalid-feedback > p',
  passwordRequired: '#signupPassword + .invalid-feedback > p',
  passwordReEnterRequired: '#signupRepeatPassword + .invalid-feedback > p',

  nameInvalid: '#signupName + .invalid-feedback > p:first-of-type',
  lastNameInvalid: '#signupLastName + .invalid-feedback > p:first-of-type',
  emailInvalid: '#signupEmail + .invalid-feedback > p:first-of-type',
  passwordInvalid: '#signupPassword + .invalid-feedback > p:first-of-type',
  passwordReEnteredInvalid: '#signupRepeatPassword + .invalid-feedback > p:first-of-type',

  nameLengthInvalid: '#signupName + .invalid-feedback > p:last-of-type',
  lastNameLengthInvalid: '#signupLastName + .invalid-feedback > p:last-of-type'
}