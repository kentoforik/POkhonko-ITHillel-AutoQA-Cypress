import { testLogins, testPassword } from './test_data/login-data'
import { loginPageSelectors, inventoryPageSelectors } from './test_data/selectors'
import inventoryPageUrl from './test_data/pagesPath'
import { inventoryPage, loginPageErrors } from './test_data/pageItems'
import { L17_URL } from '../base_urls'

describe('Lesson17: User login', () => {

  beforeEach(() => {
    cy.visit(L17_URL)
  })

  it('should successfully log in with correct credentials', () => {
    cy.get(loginPageSelectors.login).type(testLogins.standardUser)
    cy.get(loginPageSelectors.password).type(testPassword)
    cy.get(loginPageSelectors.loginButton).click()

    cy.url().should('eq', inventoryPageUrl)
    cy.get(inventoryPageSelectors.header).should('have.text', inventoryPage.header)
    cy.get(inventoryPageSelectors.title).should('have.text', inventoryPage.title)
    cy.get(inventoryPageSelectors.items).should('have.length', inventoryPage.items)
  })

  it('should fire error on login with locked out user', () => {
    cy.get(loginPageSelectors.login).type(testLogins.lockedOutUser)
    cy.get(loginPageSelectors.password).type(testPassword)
    cy.get(loginPageSelectors.loginButton).click()
    cy.get(loginPageSelectors.errorMessage).should('have.text', loginPageErrors.lockedUser)
  })
})