import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/mainPage';
import { RegisterPage } from '../src/pages/registerPage';
import { YourfeedPage } from '../src/pages/yourfeedPage';
import { ArticlePage } from '../src/pages/articlePage';
import { GlobalfeedPage } from '../src/pages/globalfeedPage';

const URL_UI = 'https://realworld.qa.guru/';


test.describe('Авторизация новым пользователем', () => {
   test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const yourfeedPage = new YourfeedPage(page);
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
});


 test('Пользователь может опубликовать статью', async ({ 
  page,
 }) => {
    const yourfeedPage = new YourfeedPage(page);
    const articlePage = new ArticlePage(page);
    const newarticle = {
      articletitle: faker.lorem.lines(1),
      articledescription: faker.lorem.lines(2),
      article: faker.lorem.lines(4),
      tag: faker.lorem.lines(1),
    };

    await yourfeedPage.gotoArticle();
    await yourfeedPage.creatArticle(newarticle.articletitle, newarticle.articledescription, newarticle.article, newarticle.tag);
    await yourfeedPage.clicktoPublishBtn();
    await expect(articlePage.banner).toContainText(newarticle.articletitle);

});

 test('Пользователь может оставить комментарий к статье', async ({ 
  page,
 }) => {
    const yourfeedPage = new YourfeedPage(page);
    const articlePage = new ArticlePage(page);
    const globalfeedPage = new GlobalfeedPage(page);
    const newarticle = {
      articletitle: faker.lorem.lines(1),
      articledescription: faker.lorem.lines(2),
      article: faker.lorem.lines(4),
      tag: faker.lorem.lines(1),
    };

    const newcomment = {
      commment: faker.lorem.lines(1),
    };

    await yourfeedPage.gotoArticle();
    await yourfeedPage.creatArticle(newarticle.articletitle, newarticle.articledescription, newarticle.article, newarticle.tag);
    await yourfeedPage.clicktoPublishBtn();
    await articlePage.creatComment(newcomment.commment);
    await articlePage.clicktoPublishCommentButton();
    await expect(articlePage.commentPublished).toContainText(newcomment.commment);

});


 test('Пользователь может поставить статье лайк', async ({ 
  page,
 }) => {
    const yourfeedPage = new YourfeedPage(page);
    const articlePage = new ArticlePage(page);
    const globalfeedPage = new GlobalfeedPage(page);
    const newarticle = {
      articletitle: faker.lorem.lines(1),
      articledescription: faker.lorem.lines(2),
      article: faker.lorem.lines(4),
      tag: faker.lorem.lines(1),
    };

    const newcomment = {
      commment: faker.lorem.lines(1),
    };

    const likenumber = {
      like: "1",
    };

    await yourfeedPage.gotoArticle();
    await yourfeedPage.creatArticle(newarticle.articletitle, newarticle.articledescription, newarticle.article, newarticle.tag);
    await yourfeedPage.clicktoPublishBtn();
    await articlePage.creatComment(newcomment.commment);
    await articlePage.clicktoPublishCommentButton();
    await articlePage.clicktoConduitLogo();
    await yourfeedPage.gotoGlobalField();
    await globalfeedPage.clicktoheartButton();
    await expect(globalfeedPage.heartCounter).toContainText(likenumber.like);

});
});
