const { L18_URL: urls } = require('../urls')
const { first_login_data } = require('./test_data/user_login_credentials')
const { authHandler: auth } = require('./helpers/auth_helper')
const {
  headerSelectors: header,
  footerSelectors: footer,
  pageInnerElements,
  modals
} = require('./test_data/selectors')
const { homePageTexts } = require('./test_data/page_texts')

describe('Header', () => {
  beforeEach(() => {
    auth(urls.homePage, first_login_data.username, first_login_data.password)
  })

  it('should show Logo which leads to home page', () => {
    cy.get(header.logo)
      .should('be.visible')
      .click()
    cy.url().should('equal', urls.homePage)
  })

  it('should show active Home button which leads to home page', () => {
    cy.get(header.homeBtn)
      .should('be.visible')
      .should('have.text', homePageTexts.header.homeBtn)
      .should('have.class', '-active')
      .click()
    cy.url().should('equal', urls.homePage)
  })

  it('should show inactive About button which leads to About section', () => {
    cy.get(header.aboutBtn)
      .should('be.visible')
      .should('have.text', homePageTexts.header.aboutBtn)
      .click()
    cy.get(pageInnerElements.aboutSection)
      .should('be.visible')
  })

  it('should show inactive Contacts button which leads to Contacts section', () => {
    cy.get(header.contactsBtn)
      .should('be.visible')
      .should('have.text', homePageTexts.header.contactsBtn)
      .click()
    cy.get(pageInnerElements.contactsSection)
      .should('be.visible')
  })

  it('should show Guest LogIn button which leads Garage page', () => {
    cy.get(header.guestLogIn)
      .should('be.visible')
      .should('have.text', homePageTexts.header.guestLogIn)
      .click()
    cy.url().should('equal', urls.garagePage)
  })

  it('should show SignIn button which opens LogIn modal', () => {
    cy.get(header.signIn)
      .should('be.visible')
      .should('have.text', homePageTexts.header.signIn)
      .click()
    //checking the correct modal is opened on click
    cy.get(modals.logInModal.container)
      .should('be.visible')
    cy.get(modals.logInModal.header)
      .should('have.text', homePageTexts.loginModal.header)
    cy.get(modals.logInModal.email)
      .should('have.text', homePageTexts.loginModal.email)
    cy.get(modals.logInModal.password)
      .should('have.text', homePageTexts.loginModal.password)

  })
})

describe('Footer', () => {
  beforeEach(() => {
    auth(urls.homePage, first_login_data.username, first_login_data.password)
  })

  it('should show Contacts header', () => {
    cy.get(footer.contactsHeader)
      .should('be.visible')
      .should('have.text', homePageTexts.footer.contactsHeader)
  })

  it('should show correct Facebook button', () => {
    cy.get(footer.faceBookBtn)
      .should('be.visible')
      .parent()
      .should('have.attr', 'href', urls.facebook)
  })

  it('should show correct Telegram button', () => {
    cy.get(footer.telegramBtn)
      .should('be.visible')
      .parent()
      .should('have.attr', 'href', urls.telegram)
  })

  it('should show correct YouTube button', () => {
    cy.get(footer.youTubeBtn)
      .should('be.visible')
      .parent()
      .should('have.attr', 'href', urls.youtube)
  })

  it('should show correct Instagram button', () => {
    cy.get(footer.instagramBtn)
      .should('be.visible')
      .parent()
      .should('have.attr', 'href', urls.instagram)
  })

  it('should show correct LinkedIn button', () => {
    cy.get(footer.linkedInBtn)
      .should('be.visible')
      .parent()
      .should('have.attr', 'href', urls.linkedin)
  })

  it('should show correct button to ITHillel home site, opened in a new tab', () => {
    cy.get(footer.itHillelBtn)
      .should('be.visible')
      .should('have.text', homePageTexts.footer.itHillelBtn)
      .should('have.attr', 'href', urls.ITHillelHome)
      .should('have.attr', 'target', '_blank')
  })

  it('should show correct support button, that opens mail client', () => {
    cy.get(footer.supportBtn)
      .should('be.visible')
      .should('have.text', homePageTexts.footer.ITHillelSupportBtn)
      .should('have.text', homePageTexts.footer.ITHillelSupportBtn)
      .should('have.attr', 'href', urls.ITHillelSupport)
      
  })

})