const { By, until } = require("selenium-webdriver");

class DashboardPage {
  constructor(driver) {
    this.driver = driver;
    this.title = By.id("dashboard-title");
    this.loadBeersBtn = By.id("load-beers-btn");
    this.beerItems = By.css(".item-card");
  }

  async waitForDashboard() {
    await this.driver.wait(until.elementLocated(this.title), 5000);
  }

  async loadCatalog() {
    await this.driver.findElement(this.loadBeersBtn).click();
  }

  async getBeerCount() {
    await this.driver.wait(until.elementLocated(this.beerItems), 3000);
    let items = await this.driver.findElements(this.beerItems);
    return items.length;
  }
}
module.exports = DashboardPage;
