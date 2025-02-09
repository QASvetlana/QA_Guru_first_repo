/* import { test, expect } from '@playwright/test';
 import { faker } from '@faker-js/faker';

 const URL_UI = 'https://realworld.qa.guru/';

function getUsername() {
  return faker.person.firstName();
};

const getEmail = function () {
  return faker.internet.email();
};

const getPassword = () => {
  return faker.internet.password({length: 10});
};

test.describe('Авторизация', () => {
test('Пользователь может авторизоваться используя логин и пароль', async ({ 
  page }) => {
  const USERNAME = getUsername();
  const EMAIL = getEmail();
  const PASSWORD = getPassword();
  await page.goto(URL_UI);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').fill(USERNAME);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(USERNAME);
});
});*/