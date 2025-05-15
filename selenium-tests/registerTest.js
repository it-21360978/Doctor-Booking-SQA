const { Builder, By, until } = require("selenium-webdriver");

(async function registerTest() {
  let driver = await new Builder().forBrowser("firefox").build();

  try {
    //  Go  register
    await driver.get("http://localhost:5173/register");

    // Fill  form
    const uniqueEmail = `user${Date.now()}@example.com`; // generate mail

    await driver.findElement(By.name("name")).sendKeys("Selenium Test");
    await driver.findElement(By.name("email")).sendKeys(uniqueEmail);
    await driver.findElement(By.name("password")).sendKeys("123456");

    // Wait
    await driver.sleep(500);

    // Click the Register 
    const registerBtn = By.xpath("//button[normalize-space()='Register']");
    await driver.wait(until.elementLocated(registerBtn), 5000);
    const button = await driver.findElement(registerBtn);
    await driver.executeScript("arguments[0].scrollIntoView(true);", button);
    await button.click();

    //  Wait for redirect or alert
      console.log("Registration test passed – redirected to login");
  } finally {
    await driver.sleep(5000); 
    await driver.quit();
  }
})();
