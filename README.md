# test_assignment1

UI & API Automation Framework

Playwright + TypeScript | Page Object Model

This repository contains an automation testing framework built with Playwright and TypeScript, covering both UI tests and API tests in a single unified setup.

The framework follows Page Object Model (POM) principles and supports:

* UI automation (SauceDemo)

* API automation (FakeStore API)

* Positive & negative test scenarios

* Separate execution for UI and API tests

## Project Structure 
```
├── api
│   ├── api-pages        # API Page Objects
│   └── api-utils        # API base utilities
│
├── pages                # UI Page Objects
│
├── tests
│   ├── ui-tests         # UI test cases
│   └── api-tests        # API test cases
│
├── test-data             # Test data (users, products, etc.)              
├── locators              # UI selectors
├── playwright.config.ts  # Playwright configuration
├── .env                  # Environment variables
└── README.md
```

# Tech Stack 
* Playwright

* TypeScript

* Node.js

* Page Object Model (POM)

* Dotenv (environment configuration)

# Applications Under Test 
* UI Application - SauceDemo

URL: https://www.saucedemo.com

* API Application - FakeStore API

Base URL: https://fakestoreapi.com

# Environment Setup 
## Prerequisites

* Make sure you have:

* Node.js (v18+ recommended)

* npm

* Install dependencies: npm install

## Environment variables 
Create a .env file in the root directory:

BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://fakestoreapi.com

# Running Tests 
* Run all tests (UI + API): npx playwright test

* Run only UI tests: npx playwright test --project=ui-tests

* Run only API tests: npx playwright test --project=api-tests


# UI Test Architecture 

* UI tests use Page Object Model

* Each page has its own class inside /pages

* Test files interact only with page methods (no selectors in tests)

# API Test Architecture 

* API tests use Playwright’s APIRequestContext

* API logic is separated into API Page Objects

* Shared logic lives in ApiBase

# Test Reports 

After execution, Playwright generates an HTML report.

To view it: npx playwright show-report
