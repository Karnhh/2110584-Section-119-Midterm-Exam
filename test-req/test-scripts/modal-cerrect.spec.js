import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync(path.join(__dirname, "../test-data/csv/input4.csv")), {
  columns: true,
  skip_empty_lines: true,
});

function convertDate(input) {
  const match = input.match(/([A-Za-z]+)\s(\d+)(st|nd|rd|th)?,?\s*(\d{4})?/);

  if (!match) throw new Error("Invalid date format");

  const month = match[1];
  const day = match[2].padStart(2, '0');
  const year = match[4] || new Date().getFullYear();

  return `${day} ${month},${year}`;
}

for (const record of records) {
  test(`${record.test_case_id} ${record.test_case_name}`, async ({ page }) => {
    await page.goto(
      "https://demoqa.com/automation-practice-form",
    );

    const formatted_birthday = convertDate(record.birthday);

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

    await page.getByRole('radio', { name: `${record.gender}`, exact: true }).check();

    await page.getByRole('textbox', { name: 'Mobile Number' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill(record.mobile);
    
    await page.locator('#dateOfBirthInput').click();
    await page.getByRole('gridcell', { name: `Choose ${record.birthday},` }).click();

    await page.locator('.subjects-auto-complete__input-container').click();
    await page.locator('#subjectsInput').fill('m');
    await page.getByRole('option', { name: `${record.subject_1}` }).click();
    await page.locator('#subjectsInput').fill('a');
    await page.getByRole('option', { name: `${record.subject_2}` }).click();

    await page.getByRole('checkbox', { name: `${record.hobby_1}` }).check();
    await page.getByRole('checkbox', { name: `${record.hobby_2}` }).check();

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
    ).toBeVisible();

    await expect(
      page.locator('tr', { hasText: 'Student Name' })
    ).toContainText(`${record.first_name} ${record.last_name}`);

    await expect(
      page.locator('tr', { hasText: 'Student Email' })
    ).toContainText(`${record.email}`);

    await expect(
      page.locator('tr', { hasText: 'Gender' })
    ).toContainText(`${record.gender}`);

    await expect(
      page.locator('tr', { hasText: 'Mobile' })
    ).toContainText(`${record.mobile}`);

    await expect(
      page.locator('tr', { hasText: 'Date of Birth' })
    ).toContainText(formatted_birthday);

    await expect(
      page.locator('tr', { hasText: 'Subjects' })
    ).toContainText(`${record.subject_1}, ${record.subject_2}`);

    await expect(
      page.locator('tr', { hasText: 'Hobbies' })
    ).toContainText(`${record.hobby_1}, ${record.hobby_2}`);

    await expect(
      page.locator('tr', { hasText: 'Picture' })
    ).toContainText("TomJerry.jpg");

    await expect(
      page.locator('tr', { hasText: 'Address' })
    ).toContainText(record.address);

    await expect(
      page.locator('tr', { hasText: 'State and City' })
    ).toContainText(`${record.state} ${record.city}`);
    
  });
}
