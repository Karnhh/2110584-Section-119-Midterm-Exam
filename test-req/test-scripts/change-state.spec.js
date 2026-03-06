import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";

test("1 Change drop down list", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );
    await page.locator('#state').click();
    await page.getByRole('option', { name: "NCR" }).click();
  
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
    await expect(
        page.getByRole('option', { name: 'Jaipur' })
    ).not.toBeVisible();
    await expect(
        page.getByRole('option', { name: 'Jaiselmer' })
    ).not.toBeVisible();

    await page.locator('#state').click();
    await page.getByRole('option', { name: "Rajasthan" }).click();
  
    await page.locator('#city').click();

    await expect(
        page.getByRole('option', { name: "Delhi" })
    ).not.toBeVisible();
    await expect(
        page.getByRole('option', { name: "Gurgaon" })
    ).not.toBeVisible();
    await expect(
        page.getByRole('option', { name: "Delhi" })
    ).not.toBeVisible();
    await expect(
        page.getByRole('option', { name: 'Jaipur' })
    ).toBeVisible();
    await expect(
        page.getByRole('option', { name: 'Jaiselmer' })
    ).toBeVisible();

});

test("2 Change text in drop down list", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );
    await page.locator('#state').click();
    await page.getByRole('option', { name: "NCR" }).click();
  
    await page.locator('#city').click();
  
    await page.getByRole('option', { name: "Delhi" }).click();

    const testtext = page.locator('.css-t3ipsp-control > .css-hlgwow > .css-1dimb5e-singleValue').textContent();
    console.log(testtext);

    await expect(
        page.locator('.css-t3ipsp-control > .css-hlgwow > .css-1dimb5e-singleValue')
    ).toContainText("Delhi");

    await page.locator('#state').click();
    await page.getByRole('option', { name: "Rajasthan" }).click();

    await expect(
        page.locator('.css-13cymwt-control > .css-hlgwow > .css-1dimb5e-singleValue')
    ).not.toContainText("Delhi");

});