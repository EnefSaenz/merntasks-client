/// <reference types="cypress" />

describe("<Forms />", () => {
  it("<Login /> - Verify home page", () => {
    cy.visit("/");

    // Testing text
    cy.get("[data-cy=login-title]").invoke("text").should("equal", "Login");

    // Check for form existence
    cy.get("[data-cy=login-form").should("exist");

    // Check for inputs
    cy.get("[data-cy=login-form-email").should("exist");
    cy.get("[data-cy=login-form-password").should("exist");
    cy.get("[data-cy=login-form-submit")
      .should("exist")
      .should("have.value", "Login")
      .should("have.class", "btn")
      .and("have.class", "btn-primary");

    // Check for link to Sign up
    cy.get("[data-cy=login-signup]")
      .should("exist")
      .should("have.prop", "tagName")
      .should("eq", "A");
    cy.get("[data-cy=login-signup]")
      .should("have.attr", "href")
      .should("eq", "/new-account");

    // Going to /new-account
    cy.get("[data-cy=login-signup]").click();
  });

  it("<NewAccount /> - Verify NewAccount component", () => {
    // Testing text
    cy.get("[data-cy=signup-title]")
      .invoke("text")
      .should("equal", "New Account");

    // Check for form existence
    cy.get("[data-cy=signup-form").should("exist");

    // Check for inputs
    cy.get("[data-cy=signup-form-name").should("exist");
    cy.get("[data-cy=signup-form-email").should("exist");
    cy.get("[data-cy=signup-form-password")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "password");
    cy.get("[data-cy=signup-form-confirm")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "password");
    cy.get("[data-cy=signup-form-submit")
      .should("exist")
      .should("have.value", "Sign up")
      .should("have.class", "btn")
      .and("have.class", "btn-primary");

    // Check for link to Login
    cy.get("[data-cy=signup-login]")
      .should("exist")
      .should("have.prop", "tagName")
      .should("eq", "A");
    cy.get("[data-cy=signup-login]")
      .should("have.attr", "href")
      .should("eq", "/");

    // Going to login again
    cy.get("[data-cy=signup-login]").click();
  });
});
