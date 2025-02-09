import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/mainPage';
import { RegisterPage } from '../src/pages/registerPage';
import { YourfeedPage } from '../src/pages/yourfeedPage';
import { SettingPage } from '../src/pages/settingPage';
import { LoginPage } from '../src/pages/loginPage';

const URL_UI = 'https://realworld.qa.guru/';

test.describe('Авторизация новым пользователем', () => {


 test('Пользователь может изменить пароль', async ({ 
  page,
 }) => {
    const yourfeedPage = new YourfeedPage(page);
    const settingPage = new SettingPage(page);
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    const user = {
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        username: faker.person.firstName(),
      };
      await mainPage.open(URL_UI);
      await mainPage.gotoRegister();
      await registerPage.register(user.username, user.email, user.password);
      await expect(yourfeedPage.profileNameField).toBeVisible(); 
      await expect(yourfeedPage.profileNameField).toContainText(user.username);  


    const newpassword = {
        newpass: faker.internet.password({ length: 10 }),
    };

    await yourfeedPage.clicktoNavigationDropdown();
    await yourfeedPage.chooseUserSetting();
    await settingPage.changePassword(newpassword.newpass);
    await settingPage.clickUpdateSettingBotton();
    await settingPage.clicktoNavigationDrop();
    await expect(settingPage.profileDrop).toBeVisible();
    await expect(settingPage.settingDrop).toBeVisible();
    await expect(settingPage.logoutBotton).toBeVisible();
    await settingPage.clickLogoutBotton();
    await mainPage.open(URL_UI);
    await mainPage.gotoLogin();
    await loginPage.login(user.email, newpassword.newpass);  
    await expect(yourfeedPage.profileNameField).toBeVisible();
    await expect(yourfeedPage.profileNameField).toContainText(user.username);  
});


});
