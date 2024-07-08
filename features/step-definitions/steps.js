const { Given, When, Then } = require("@wdio/cucumber-framework");
const axios = require("axios");
const { expect, $ } = require("@wdio/globals");

const LoginPage = require("../pageobjects/login.page");

const pages = {
  login: LoginPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

When(/^I login with "([^"]*)" and "([^"]*)"$/, async (username, password) => {
  await LoginPage.login(username, password);
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
  await expect(LoginPage.errorMessage).toBeExisting();
  const actualMessage = await LoginPage.errorMessage.getText();
  await expect(actualMessage).toEqual(message);
});

Given("I make a GET request to the categories API", async () => {
  const response = await axios.get(
    "http://10.0.0.146:3000/api/proxy/getAllcategories"
  );
  browser.sharedData = { response };
});

Then("the response should contain the expected categories", async () => {
  const expectedCategories = [
    "Motor",
    "Food",
    "Drink",
    "Animals",
    "Lights",
    "Plants",
    "Crab",
    "Miller",
    "Machine",
    "Console",
    "Fruits",
    "Gown",
    "T-shirts",
    "Human",
    "Data",
  ];
  const { response } = browser.sharedData;
  expect(response.status).toBe(200);
  expect(response.data.categories).toEqual(expectedCategories);
});
