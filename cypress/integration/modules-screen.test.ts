const waitForLoadingToFinish = () => {
    cy.findAllByLabelText(/loading/i).should("exist");
    cy.wait(10000);
    cy.findAllByLabelText(/loading/i).should("not.exist");

};

describe("modules screen", () => {
    it("should allow a typical user flow", () => {
        cy.visit("/");

        cy.findByRole("navigation", {name: /docs navigation/i}).within(() => {
            cy.findByRole("link", {name: /modules/i}).click();
        });

        waitForLoadingToFinish();
        cy.findAllByRole("row").should("have.length", 6);

        // Sort page
        cy.findByRole("link", {name: /star/i}).click();
        waitForLoadingToFinish();
        cy.findAllByRole("row").should("have.length", 6);

        // Next page
        cy.findByRole("link", {name: /next/i}).click();
        waitForLoadingToFinish();
        cy.findAllByRole("row").should("have.length", 6);

        // Search
        cy.findAllByRole("textbox", {
            name: /search projects/i
        }).type("lodash");
        cy.findByRole("button", {
            name: /search ︎/i
        }).click();
        waitForLoadingToFinish();
        cy.findAllByRole("row").should("have.length", 6);
    });
});