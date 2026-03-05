import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync(path.join(__dirname, "../test-data/csv/input2.csv")), {
  columns: true,
  skip_empty_lines: true,
});

for (const record of records) {
  test(`${record.test_case_id} ${record.test_case_name}`, async ({ page }) => {
    await page.goto(
      "https://demoqa.com/automation-practice-form",
    );

    await expect(
      await page.getByRole('heading', { name: 'Practice Form' })
    ).toBeVisible();

    await expect(
      await page.getByRole('heading', { name: 'Student Registration Form' })
    ).toBeVisible();
    
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill(record.first_name);

    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill(record.last_name);

    await page.getByRole('textbox', { name: 'name@example.com' }).click();
    await page.getByRole('textbox', { name: 'name@example.com' }).fill(record.email);

    if(record.test_case_id != 4)
    {
      await page.getByRole('radio', { name: `${record.gender}`, exact: true }).check();
    }

    await page.getByRole('textbox', { name: 'Mobile Number' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill(record.mobile);
    
    await page.locator('#dateOfBirthInput').click();
    await page.getByRole('gridcell', { name: `Choose ${record.birthday},` }).click();

    await page.locator('.subjects-auto-complete__input-container').click();
    await page.locator('#subjectsInput').fill('m');
    await page.getByRole('option', { name: `${record.subjects}` }).click();
    await page.locator('.subjects-auto-complete__input-container').click();

    await page.getByRole('checkbox', { name: `${record.hobbies}` }).check();

    await page.setInputFiles('#uploadPicture', 'test-data/pic/TomJerry.jpg');
    
    await page.getByRole('textbox', { name: 'Current Address' }).click();
    await page.getByRole('textbox', { name: 'Current Address' }).fill(record.address);

    await page.locator('#state > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
    await page.getByRole('option', { name: `${record.state}` }).click();
    await page.locator('#city > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
    await page.getByRole('option', { name: `${record.city}` }).click();

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(
      await page.getByText('Thanks for submitting the form')
    ).not.toBeVisible();
  });
}