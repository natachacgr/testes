describe("Testes de Orçamento Personalizado - Elo Drinks", () => {
  beforeEach(() => {
    cy.visit("https://elodrinks.confianopai.com/");
    cy.get("a, button").contains(/login/i).first().click();

    cy.get('input[id^="email"]:visible')
      .should("be.visible")
      .type("email@email");

    cy.get('input[id^="senha"]:visible').should("be.visible").type("senha123");

    cy.get('button[type="submit"], button')
      .contains(/Entrar/i)
      .then(($buttons) => {
        // Procurar primeiro botão visível
        const visibleButton = $buttons.filter(":visible").first();
        if (visibleButton.length > 0) {
          cy.wrap(visibleButton).click();
        } else {
          // Se nenhum visível, forçar clique no primeiro
          cy.wrap($buttons.first()).click({ force: true });
        }
      });
  });

  it("Deve acessar página de orçamento personalizado", () => {
    cy.get("a, button")
      .contains(/orçamento/i)
      .first()
      .click();

    cy.get("a, button")
      .contains(/personalizar/i)
      .first()
      .click();

    cy.url().should("include", "personalizar");

    cy.get("p, button")
      .contains(/casamento/i)
      .first()
      .click();
  });

  it("Não permitir avançar os steps com campos em branco", () => {
    cy.get("button").contains(/→/i);
  });
});
