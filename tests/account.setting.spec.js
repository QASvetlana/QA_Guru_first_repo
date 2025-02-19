import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, YourfeedPage, SettingPage, LoginPage} from '../src/pages/index';
import { UserBuilder } from '../src/helpers/builder/index';

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

    const userBuilder = new UserBuilder()
          .addEmail()
          .addUsername()
          .addPassword(11)
          .generate();
    
          await mainPage.open(URL_UI);
          await mainPage.gotoRegister();
          await registerPage.register(
            userBuilder.username,
            userBuilder.email,
            userBuilder.password,
          );

    const newpassword = {
        newpass: faker.internet.password({ length: 10 }),
    };

    await yourfeedPage.gotoNavigationDropdown();
    await yourfeedPage.chooseUserSetting();
    await settingPage.changePassword(newpassword.newpass);
    await settingPage.updateUserSetting();
    await settingPage.gotoNavigationDrop();
    await expect(settingPage.profileDrop).toBeVisible();
    await expect(settingPage.settingDrop).toBeVisible();
    await expect(settingPage.logoutBotton).toBeVisible();
    await settingPage.logout();
    await mainPage.open(URL_UI);
    await mainPage.gotoLogin();
    await loginPage.login( userBuilder.email, newpassword.newpass);  
    await expect(yourfeedPage.profileNameField).toBeVisible();
    await expect(yourfeedPage.profileNameField).toContainText(userBuilder.username);  
});

});
