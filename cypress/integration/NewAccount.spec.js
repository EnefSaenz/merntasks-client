/// <reference types="cypress" />

describe("<NewAccount />", () => {
  it("<NewAccount /> - Verify validation, alerts and create new account", () => {
    // Visiting the page
    cy.visit("/new-account");

    // Testing form validation
    cy.get("[data-cy=signup-form-submit").click();

    // Testing the alert shown
    cy.get("[data-cy=signup-alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "All fields are required!");
    cy.get("[data-cy=signup-alert]").should("have.class", "alert-error");

    // Filling form inputs
    cy.get("[data-cy=signup-form-name]").type("Francisco");
    cy.get("[data-cy=signup-form-email]").type("francisco@react.com");
    cy.get("[data-cy=signup-form-password]").type("1234567");
    cy.get("[data-cy=signup-form-confirm]").type("1234567");

    // Testing form validation
    cy.get("[data-cy=signup-form-submit").click();

    // Testing the alert shown
    cy.get("[data-cy=signup-alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "Password's min length is 8 characters");
    cy.get("[data-cy=signup-alert]").should("have.class", "alert-error");

    // Filling form inputs
    cy.get("[data-cy=signup-form-password]").clear().type("12345678");
    cy.get("[data-cy=signup-form-confirm]").clear().type("12345679");

    // Testing form validation
    cy.get("[data-cy=signup-form-submit").click();

    // Testing the alert shown
    cy.get("[data-cy=signup-alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "Both passwords must be the same");
    cy.get("[data-cy=signup-alert]").should("have.class", "alert-error");

    // Filling form inputs
    cy.get("[data-cy=signup-form-confirm]").clear().type("12345678");

    // Testing form validation
    cy.get("[data-cy=signup-form-submit").click();

    // Testing the next page
    cy.get("[data-cy=tasks-toSelect]")
      .should("exist")
      .invoke("text")
      .should("equal", "Select a project");

    // Clicking on sign out button
    cy.get("[data-cy=navbar-signout]").click();
  });
});
