import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync(path.join(__dirname, "../test-data/csv/input5.csv")), {
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

function getCurrentDateFormatted() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${day} ${month},${year}`;
}

for (const record of records) {
  test(`${record.test_case_id} ${record.test_case_name}`, async ({ page }) => {
    await page.goto(
      "https://demoqa.com/automation-practice-form",
    );

    await expect(
      page.getByRole('heading', { name: 'Practice Form' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Student Registration Form' })
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

    let formatted_birthday;
    
    if(record.test_case_id != 15)
    {
        formatted_birthday = convertDate(record.birthday);
        await page.locator('#dateOfBirthInput').click();
        await page.getByRole('gridcell', { name: `Choose ${record.birthday},` }).click();
    }

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

    
    if(record.test_type == "happy_case")
    {
        await expect(
            page.getByText('Thanks for submitting the form')
        ).toBeVisible();
    }else{
        await expect(
            page.getByText('Thanks for submitting the form')
        ).not.toBeVisible();
    }

    if(record.test_case_id == 3)
    {
        await expect(
            page.locator('tr', { hasText: 'Mobile' })
        ).not.toContainText(`${record.mobile}`);

        const mobile_before_submit = record.mobile;
        const mobile_after_submit = mobile_before_submit.slice(0, 10);

        await expect(
            page.locator('tr', { hasText: 'Mobile' })
        ).toContainText(mobile_after_submit);
    }

    if(record.test_case_id == 15)
    {
        await expect(
            page.locator('tr', { hasText: 'Date of Birth' })
        ).toContainText(getCurrentDateFormatted());
    }

    if(record.test_case_id == 16)
    {
        await expect(
            page.locator('tr', { hasText: 'Date of Birth' })
        ).toContainText(formatted_birthday);
    }
    
  });
}
