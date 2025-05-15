const { Builder, By, until } = require("selenium-webdriver");

(async function viewAppointmentsTest() {
  let driver = await new Builder().forBrowser("firefox").build();

  try {
    // Open login page
    await driver.get("http://localhost:5173/login");

    //  Login as patient
    await driver.findElement(By.css('input[type="email"]')).sendKeys("patient@example.com");
    await driver.findElement(By.css('input[type="password"]')).sendKeys("patient1");
    await driver.findElement(By.css("button")).click();

    // Wait for /doctors page
    await driver.wait(until.urlContains("/doctors"), 5000);

    //  Navigate to /appointments page
    await driver.get("http://localhost:5173/appointments");
    await driver.wait(until.urlContains("/appointments"), 5000);

    //  Check for appointments
    const appointments = await driver.findElements(By.css("h2"));

    if (appointments.length > 0) {
      console.log(` Appointments page loaded successfully with ${appointments.length} - test passed`);
    } else {
      console.log("Appointments page loaded, but no appointments found.");
    }

  } catch (err) {
    console.error("View appointments test failed:", err.message);
  } finally {
    await driver.sleep(5000); 
    await driver.quit();
  }
})();
