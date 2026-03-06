import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";

test("1 Select one subject", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );
  await page.locator('.subjects-auto-complete__input-container').click();
  await page.locator('#subjectsInput').fill('m');
  await page.getByRole('option', { name: "Maths" }).click();

  await expect(
    page.getByText('Maths', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Civics', { exact: true })
  ).not.toBeVisible();

});

test("2 Select multiple subjects", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );
  await page.locator('.subjects-auto-complete__input-container').click();
  await page.locator('#subjectsInput').fill('m');
  await page.getByRole('option', { name: "Maths" }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Chemistry' }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Computer Science' }).click();

  await expect(
    page.getByText('Maths', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Chemistry', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Computer Science', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Civics', { exact: true })
  ).not.toBeVisible();

});

test("3 Select all subjects", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );
  await page.locator('.subjects-auto-complete__input-container').click();
  await page.locator('#subjectsInput').fill('m');
  await page.getByRole('option', { name: "Maths" }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Chemistry' }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Computer Science' }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Commerce' }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Civics' }).click();
  await page.locator('#subjectsInput').fill('a');
  await page.getByRole('option', { name: 'Accounting' }).click();
  await page.locator('#subjectsInput').fill('a');
  await page.getByRole('option', { name: 'Arts' }).click();
  await page.locator('#subjectsInput').fill('s');
  await page.getByRole('option', { name: 'Social Studies' }).click();
  await page.locator('#subjectsInput').fill('e');
  await page.getByRole('option', { name: 'English' }).click();
  await page.locator('#subjectsInput').fill('e');
  await page.getByRole('option', { name: 'Economics' }).click();
  await page.locator('#subjectsInput').fill('p');
  await page.getByRole('option', { name: 'Physics' }).click();
  await page.locator('#subjectsInput').fill('h');
  await page.getByRole('option', { name: 'Hindi' }).click();
  await page.locator('#subjectsInput').fill('h');
  await page.getByRole('option', { name: 'History' }).click();
  await page.locator('#subjectsInput').fill('b');
  await page.getByRole('option', { name: 'Biology' }).click();

  await expect(
    page.getByText('Maths', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Chemistry', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Computer Science', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Commerce', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Civics', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Accounting', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Arts', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Social Studies', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('English', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Economics', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Physics', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Hindi', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('History', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Biology', { exact: true })
  ).toBeVisible();
  
});

test("4 Delete one subject", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );

  await page.locator('.subjects-auto-complete__input-container').click();
  await page.locator('#subjectsInput').fill('m');
  await page.getByRole('option', { name: "Maths" }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Chemistry' }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Computer Science' }).click();

  await page.getByRole('button', { name: 'Remove Chemistry' }).click();

  await expect(
    page.getByText('Maths', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Chemistry', { exact: true })
  ).not.toBeVisible();
  await expect(
    page.getByText('Computer Science', { exact: true })
  ).toBeVisible();

});

test("5 Delete some subjects", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );

  await page.locator('.subjects-auto-complete__input-container').click();
  await page.locator('#subjectsInput').fill('m');
  await page.getByRole('option', { name: "Maths" }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Chemistry' }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Computer Science' }).click();

  await page.getByRole('button', { name: 'Remove Maths' }).click();
  await page.getByRole('button', { name: 'Remove Computer Science' }).click();

  await expect(
    page.getByText('Maths', { exact: true })
  ).not.toBeVisible();
  await expect(
    page.getByText('Chemistry', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText('Computer Science', { exact: true })
  ).not.toBeVisible();

});

test("6 Delete all subjects", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );

  await page.locator('.subjects-auto-complete__input-container').click();
  await page.locator('#subjectsInput').fill('m');
  await page.getByRole('option', { name: "Maths" }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Chemistry' }).click();
  await page.locator('#subjectsInput').fill('c');
  await page.getByRole('option', { name: 'Computer Science' }).click();

  await page.locator('.subjects-auto-complete__indicator > .css-8mmkcg > path').click();

  await expect(
    page.getByText('Maths', { exact: true })
  ).not.toBeVisible();
  await expect(
    page.getByText('Chemistry', { exact: true })
  ).not.toBeVisible();
  await expect(
    page.getByText('Computer Science', { exact: true })
  ).not.toBeVisible();

});

test("7 Do not select subjects", async ({ page }) => {
  await page.goto(
      "https://demoqa.com/automation-practice-form",
    );

  await expect(
    page.locator('.subjects-auto-complete__indicator > .css-8mmkcg > path')
  ).not.toBeVisible();

  await page.locator('#subjectsInput').fill('m');

  await expect(
    page.locator('.subjects-auto-complete__indicator > .css-8mmkcg > path')
  ).not.toBeVisible();

  await page.locator('#subjectsInput').fill('');

  await expect(
    page.locator('.subjects-auto-complete__indicator > .css-8mmkcg > path')
  ).not.toBeVisible();

});