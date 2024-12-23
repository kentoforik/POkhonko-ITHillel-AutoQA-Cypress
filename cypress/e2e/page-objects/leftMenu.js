import { leftMenuSelectors } from '../selectors/leftMenu';

class LeftMenu {
  get garage() {
    return cy.get(leftMenuSelectors.garage)
  }

  get expenses() {
    return cy.get(leftMenuSelectors.expenses)
  }

  get instructions() {
    return cy.get(leftMenuSelectors.instructions)
  }

  get profile() {
    return cy.get(leftMenuSelectors.profile)
  }

  get settings() {
    return cy.get(leftMenuSelectors.settings)
  }

  get logOut() {
    return cy.get(leftMenuSelectors.logOut)
  }
}

export default new LeftMenu();