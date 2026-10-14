const { By, until } = require("selenium-webdriver");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.emailInput = By.id("email-input");
    this.passwordInput = By.id("password-input");
    this.loginBtn = By.id("login-btn");
  }

  async open() {
    await this.driver.get("http://127.0.0.1:5500/index.html");
  }

  async login(email, password) {
    await this.driver.findElement(this.emailInput).sendKeys(email);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginBtn).click();
  }
}
module.exports = LoginPage;
