Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the login page
    When I login with "<username>" and "<password>"
    Then I should see a flash message saying <message>

    Examples:
      | username          | password     | message                        |
      | testing@only.com  | testingonly | Signed in successfully |
      | foobar@gmail.com  | barfoofit    | Invalid email or password.     |
  
  Scenario: Get categories from the API
    Given I make a GET request to the categories API
    Then the response should contain the expected categories