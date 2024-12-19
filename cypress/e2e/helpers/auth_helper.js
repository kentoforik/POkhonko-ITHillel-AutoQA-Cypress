export async function authHandler(url, username, password) {
  cy.visit(url, {
    auth: {
      username: username,
      password: password,
    }
  })
}

export function UserSignUpFiller(userData, selectors) {
  cy.contains('Sign up').click()
  
  const {
    name,
    lastName,
    email,
    password,
    passwordReEnter
  } = userData

  const {
    nameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    passwordReEnterInput
  } = selectors

  //handling the case of some of user data is NOT passed
  const ExistingDataFiller = (data, selector) => {
    if (data !== undefined) {
      cy.get(selector).type(data)
    }
  }

  ExistingDataFiller(name, nameInput)
  ExistingDataFiller(lastName, lastNameInput)
  ExistingDataFiller(email, emailInput)
  ExistingDataFiller(password, passwordInput)
  ExistingDataFiller(passwordReEnter, passwordReEnterInput)
}
