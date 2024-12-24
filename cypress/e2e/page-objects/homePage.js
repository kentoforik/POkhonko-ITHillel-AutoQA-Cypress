class HomePage {
  UserSignIn(userData, selectors) {

    if (!userData || !selectors) {
      return new Error('Data or selector is NOT provided')
    }
  
    cy.contains('Sign In').click()
  
    const {
      email,
      password
    } = userData
  
    const {
      emailInput,
      passwordInput,
      loginBtn
    } = selectors
  
    cy.get(emailInput).type(email)
    cy.get(passwordInput).type(password)
    cy.get(loginBtn).click()
  }
}

export default new HomePage()