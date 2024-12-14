export async function authHandler(url, username, password) {
  cy.visit(url, {
    auth: {
      username: username,
      password: password,
    }
  })
}
