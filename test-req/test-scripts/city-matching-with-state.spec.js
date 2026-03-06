import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync(path.join(__dirname, "../test-data/csv/input3.csv")), {
  columns: true,
  skip_empty_lines: true,
});

for (const record of records) {
  test(`${record.test_case_id} ${record.test_case_name}`, async ({ page }) => {
    await page.goto(
      "https://demoqa.com/automation-practice-form",
    );

    if(record.test_case_id == 1)
    {
      await expect(
        page.locator('#city input')
      ).toBeDisabled();

    }else if(record.test_case_id == 2)
    {
      await page.locator('#state').click();
      await page.getByRole('option', { name: `${record.state}` }).click();

      await page.locator('#city').click();

      await expect(
        page.getByRole('option', { name: "Delhi" })
      ).toBeVisible();
      await expect(
        page.getByRole('option', { name: "Gurgaon" })
      ).toBeVisible();
      await expect(
        page.getByRole('option', { name: "Delhi" })
      ).toBeVisible();

    }else if(record.test_case_id == 3)
    {
      await page.locator('#state').click();
      await page.getByRole('option', { name: `${record.state}` }).click();

      await page.locator('#city').click();

      await expect(
        page.getByRole('option', { name: 'Agra' })
      ).toBeVisible();
      await expect(
        page.getByRole('option', { name: 'Lucknow' })
      ).toBeVisible();
      await expect(
        page.getByRole('option', { name: 'Merrut' })
      ).toBeVisible();

    }else if(record.test_case_id == 4)
    {
      await page.locator('#state').click();
      await page.getByRole('option', { name: `${record.state}` }).click();

      await page.locator('#city').click();

      await expect(
        page.getByRole('option', { name: 'Karnal' })
      ).toBeVisible();
      await expect(
        page.getByRole('option', { name: 'Panipat' })
      ).toBeVisible();

    }else if(record.test_case_id == 5)
    {
      await page.locator('#state').click();
      await page.getByRole('option', { name: `${record.state}` }).click();

      await page.locator('#city').click();

      await expect(
        page.getByRole('option', { name: 'Jaipur' })
      ).toBeVisible();
      await expect(
        page.getByRole('option', { name: 'Jaiselmer' })
      ).toBeVisible();
    }
  });
}