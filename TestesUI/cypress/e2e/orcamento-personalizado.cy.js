describe("Testes de Orçamento Personalizado - Elo Drinks", () => {
  beforeEach(() => {
    cy.visit("https://elodrinks.confianopai.com/");
  });

  it("Deve acessar página de orçamento personalizado", () => {
    // Procurar por links/botões relacionados a orçamento
    cy.get("a, button").contains(/login/i).first().click();
  });

  it("Deve estar logado para acessar a pagina de pacotes", () => {
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
    // Procurar por links/botões relacionados a orçamento
    cy.get("a, button")
      .contains(/orçamento/i)
      .first()
      .click();

    cy.url().should("include", /pacotes/);
    cy.get("form, .form").should("be.visible");
  });
});
