const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    defaultBrowser: 'chrome',
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    
    specPattern: "./cypress/e2e/19*/**/*cy.js" //change this for each HW
  },

});
