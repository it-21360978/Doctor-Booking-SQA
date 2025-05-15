const { Builder, By, until } = require("selenium-webdriver");

(async function addDoctorTest() {
  let driver = await new Builder().forBrowser("firefox").build();


  try {
    //  Open login page
    await driver.get("http://localhost:5173/login");

    // Enter email and password
    await driver.findElement(By.css('input[type="email"]')).sendKeys("admin@gmail.com");
    await driver.findElement(By.css('input[type="password"]')).sendKeys("admin123");
    
    // Click login button
    await driver.findElement(By.css("button")).click();

    // Wait for redirect to /doctors
    await driver.wait(until.urlContains("/doctors"), 5000);

    // Go to add doctor
    await driver.get("http://localhost:5173/doctors/add");

    // Fill form fields
    await driver.findElement(By.name("name")).sendKeys("Dr. Selenium Test");
    await driver.findElement(By.name("specialty")).sendKeys("Dermatology");
    await driver.findElement(By.name("hospital")).sendKeys("Test Medical Center");
    await driver.findElement(By.name("contact")).sendKeys("0771234567");

    // Wait for update
    await driver.sleep(1000);

    // Find the button using class-based selector
    const addButton = By.css("button.bg-blue-600");
    await driver.wait(until.elementLocated(addButton), 5000);
    const addButtonEl = await driver.findElement(addButton);

    // Scroll to it
    await driver.executeScript("arguments[0].scrollIntoView(true);", addButtonEl);
    await driver.sleep(500); 

    // Click the button
    await addButtonEl.click();

    await driver.sleep(2000); 
    console.log("Add Doctor test passed");

  } catch (err) {
    console.error("Add Doctor test failed:", err.message);
  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
})();
