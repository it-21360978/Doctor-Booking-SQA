const { Builder, By, until } = require("selenium-webdriver");

(async function viewDoctorsTest() {
  let driver = await new Builder().forBrowser("firefox").build();
  try {
     //  Open login page
    await driver.get("http://localhost:5173/login");

    // Enter email and password
    await driver.findElement(By.css('input[type="email"]')).sendKeys("g@gmail.com");
    await driver.findElement(By.css('input[type="password"]')).sendKeys("Yasintha");
    
    // Click login button
    await driver.findElement(By.css("button")).click();

    // Wait for redirect to /doctors
    await driver.wait(until.urlContains("/doctors"), 5000);


    const cards = await driver.findElements(By.css("h2")); // Doctor card titles

    // check doctors card
    if (cards.length > 0) console.log("Doctors listed successfully");
    else throw new Error("No doctors visible");

  } catch (err) {
    console.error("Doctors page test failed:", err.message);
  } finally {
    await driver.sleep(5000); 
    await driver.quit();
  }
})();
