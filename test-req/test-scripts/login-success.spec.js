import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync(path.join(__dirname, "../test-data/csv/input1.csv")), {
  columns: true,
  skip_empty_lines: true,
});

for (const record of records) {
  test(`Submit-success ${record.test_case_id}`, async ({ page }) => {
    await page.goto(
      "https://demoqa.com/automation-practice-form",
    );
    //console.log(record.test_case_id, record.username, record.password);

    await expect(
      await page.getByRole('heading', { name: 'Practice Form' })
    ).toBeVisible();

    await expect(
      await page.getByRole('heading', { name: 'Student Registration Form' })
    ).toBeVisible();
    
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Tom');

    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Jerry');

    await page.getByRole('textbox', { name: 'name@example.com' }).click();
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('student007@gmail.com');

    await page.getByRole('radio', { name: 'Male', exact: true }).check();

    await page.getByRole('textbox', { name: 'Mobile Number' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('0936168895');
    
    await page.locator('#dateOfBirthInput').click();
    await page.getByRole('gridcell', { name: 'Choose Wednesday, March 4th,' }).click();

    await page.locator('.subjects-auto-complete__input-container').click();
    await page.locator('#subjectsInput').fill('m');
    await page.getByRole('option', { name: 'Maths' }).click();
    await page.locator('.subjects-auto-complete__input-container').click();
    await page.locator('#subjectsInput').fill('c');
    await page.getByRole('option', { name: 'Chemistry' }).click();
    await page.getByRole('button', { name: 'Remove Chemistry' }).click();

    await page.getByRole('checkbox', { name: 'Music' }).check();

    //await page.getByRole('button', { name: 'Choose File' }).click();
    await page.setInputFiles('#uploadPicture', 'test-data/pic/TomJerry.jpg');
    
    await page.getByRole('textbox', { name: 'Current Address' }).click();
    await page.getByRole('textbox', { name: 'Current Address' }).fill('address123');

    await page.locator('#state > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
    await page.getByRole('option', { name: 'NCR' }).click();
    await page.locator('#city > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
    await page.getByRole('option', { name: 'Delhi' }).click();

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(
      await page.getByText('Thanks for submitting the form')
    ).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();
  });
}
