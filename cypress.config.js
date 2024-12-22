const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      preLoginUserName: 'guest',
      preLoginUserPassword: 'welcome2qauto',
      username: "kentoforik@gmail.com",
      password: "BATn!hBP9HRN8uN",
    },
    video: true,
    defaultBrowser: 'chrome',
    chromeWebSecurity: false,
    // retries: {
    //   runMode: 1,
    //   openMode: 1,
    // },
    
    specPattern: "./cypress/e2e/20*/**/*cy.js" //change this for each HW
  },

});
