const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    video: true,
    defaultBrowser: 'chrome',
    chromeWebSecurity: false

  },

});
