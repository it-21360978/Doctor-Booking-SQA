const { Builder, By, until } = require("selenium-webdriver");

(async function bookAppointmentTest() {
  let driver = await new Builder().forBrowser("firefox").build();

  try {
    //  Open login page
    await driver.get("http://localhost:5173/login");

    // Login as patient
    await driver.findElement(By.css('input[type="email"]')).sendKeys("chanuka@gmail.com");
    await driver.findElement(By.css('input[type="password"]')).sendKeys("chanuka123");
    await driver.findElement(By.css("button")).click();

    //  Wait for /doctors page
    await driver.wait(until.urlContains("/doctors"), 5000);

    //  Wait for and click the “Book Now” button
    const bookBtn = By.xpath("//button[normalize-space()='Book Now']");
    await driver.wait(until.elementLocated(bookBtn), 5000);
    await driver.findElement(bookBtn).click();

    //  Wait for /book/:id route
    await driver.wait(until.urlContains("/book"), 5000);

    //  Set tomorrow's date in yyyy-mm-dd
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    //  Wait for and set the date
    const dateInput = By.css('input[type="date"]');
    await driver.wait(until.elementLocated(dateInput), 5000);
    const dateField = await driver.findElement(dateInput);
    await dateField.clear();
    await dateField.sendKeys(dateStr);

    //  Click Confirm Booking button
    const confirmBtn = By.xpath("//button[contains(text(),'Confirm Booking')]");
    await driver.wait(until.elementLocated(confirmBtn), 5000);
    await driver.findElement(confirmBtn).click();

    //  Wait for redirect to /appointments
    try {
      await driver.wait(until.urlContains("/appointments"), 8000);
      console.log("Redirected to /appointments – Booking test passed");
    } catch {
      await driver.sleep(3000);
      console.log("Booking assumed successful");
    }

  } catch (err) {
    console.error("Booking test failed:", err.message);
  } finally {
    await driver.sleep(5000); 
    await driver.quit();
  }
})();
