const { $ } = require("@wdio/globals");
const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $("#username");
  }

  get inputPassword() {
    return $('input[placeholder="Password"]');
  }

  get btnSubmit() {
    // Using a unique part of the class to locate the button
    return $("button.bg-primary.text-primary-foreground");
  }

  get inputEmail() {
    return $('input[name="email"]');
  }

  get errorMessage() {
    // Locate the error message div using the data-title attribute and class (if it's unique enough)
    return $('div[data-title=""]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.inputEmail.isDisplayed();
    await this.inputEmail.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("sign-in");
  }
}

module.exports = new LoginPage();
