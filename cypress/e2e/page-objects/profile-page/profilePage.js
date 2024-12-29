import { profilePageSelectors } from '../../selectors/profilePage'

class ProfilePage {
  get profileName() {
    return cy.get(profilePageSelectors.profileName)
  }
}

export default new ProfilePage()