const { Builder, By, until } = require("selenium-webdriver");

(async function loginTest() {
  let driver = await new Builder().forBrowser("firefox").build();


  try {
    //  Open login page
    await driver.get("http://localhost:5173/login");

    // Enter email and password
    await driver.findElement(By.css('input[type="email"]')).sendKeys("chanuka@gmail.com");
    await driver.findElement(By.css('input[type="password"]')).sendKeys("chanuka123");
    
    // Click login button
    await driver.findElement(By.css("button")).click();

    // Wait for redirect to /doctors
    await driver.wait(until.urlContains("/doctors"), 5000);

    console.log("Login test passed");

  } catch (err) {
    console.error("Login test failed:", err.message);
  } finally {
    await driver.sleep(500000);
    await driver.quit();
  }
})();
