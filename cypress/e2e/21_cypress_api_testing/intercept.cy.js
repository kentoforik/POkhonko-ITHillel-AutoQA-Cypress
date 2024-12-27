/// <reference types="cypress" />

import { authHandler } from '../helpers/auth_helper'
import HomePage from '../page-objects/homePage'
import { homePageSelectors } from '../selectors/homePage'
import { path } from '../apiPath'
import LeftMenu from '../page-objects/leftMenu'
import ProfilePage from '../page-objects/profile-page/profilePage'

describe('Intercepting request cypress', () => {
  beforeEach(() => {
    const preLoginUserName = Cypress.env('preLoginUserName')
    const preLoginUserPassword = Cypress.env('preLoginUserPassword')
    authHandler('/', preLoginUserName, preLoginUserPassword)

    const userLoginData = {
      email: Cypress.env('username'),
      password: Cypress.env('password')
    }
    HomePage.UserSignIn(userLoginData, homePageSelectors)
  })

  it('changes actual data, received by user', () => {
    const changedResponse = {
      status: "ok",
      data: {
        userId: 165413,
        photoFilename: "default-user.png",
        name: "Polar",
        lastName: "Bear"
      }
    }
    cy.intercept(path.users.profile, changedResponse).as('getUserProfile')
    LeftMenu.profile.click()
    cy.wait('@getUserProfile')

    ProfilePage.profileName.should('have.text', `${changedResponse.data.name} ${changedResponse.data.lastName}`)
  })
})
