const { Builder, By, until } = require("selenium-webdriver");

(async function logoutTest() {
  let driver = await new Builder().forBrowser("firefox").build();

  try {
    // Open login page
    await driver.get("http://localhost:5173/login");

    // Enter email and password
    await driver.findElement(By.css('input[type="email"]')).sendKeys("g@gmail.com");
    await driver.findElement(By.css('input[type="password"]')).sendKeys("Yasintha");

    // Click login button
    await driver.findElement(By.css("button")).click();

     // Wait for redirect to /doctors
    await driver.wait(until.urlContains("/doctors"), 5000);

    // click logout button
    await driver.findElement(By.xpath("//button[contains(text(),'Logout')]")).click();

    // Wait for redirect to /login
    await driver.wait(until.urlContains("/login"), 5000);
    console.log("Logout test passed: redirected to login");

  } catch (err) {
    console.error("Logout test failed:", err.message);
  } finally {
    await driver.sleep(5000); 
    await driver.quit();
  }
})();
