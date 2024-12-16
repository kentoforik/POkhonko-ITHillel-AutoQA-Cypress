export const headerSelectors = {
  logo: '.header_logo',
  homeBtn: 'a.btn.header-link',
  aboutBtn: 'button.btn.header-link:first',
  contactsBtn: 'button.btn.header-link:last',
  guestLogIn: 'button.header-link.-guest',
  signIn: 'button.header_signin',
}

export const footerSelectors = {
  contactsHeader: '#contactsSection h2',
  faceBookBtn: '.icon-facebook',
  telegramBtn: '.icon-telegram',
  youTubeBtn: '.icon-youtube',
  instagramBtn: '.icon-instagram',
  linkedInBtn: '.icon-linkedin',
  itHillelBtn: 'a.contacts_link.display-4',
  supportBtn: 'a.contacts_link.h4'
}

export const pageInnerElements = {
  aboutSection: '#aboutSection',
  contactsSection: '#contactsSection',
}

export const modals = {
  logInModal: {
    container: 'div.modal-content',
    header: 'h4.modal-title',
    email: 'label[for="signinEmail"]',
    password: 'label[for="signinPassword"]'
  }
}