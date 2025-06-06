describe("Testes de Login - Elo Drinks", () => {
  beforeEach(() => {
    cy.visit("https://elodrinks.confianopai.com/");
  });

  it("Deve acessar a página de login", () => {
    // Procurar por botões/links de login na página principal
    cy.get("body").then(($body) => {
      if (
        $body.find('[data-cy="login"], a[href*="login"], button').length > 0
      ) {
        cy.get('[id^="login"], a[href*="login"], button')
          .contains(/login|entrar/i)
          .first()
          .click();
      } else {
        // Se não encontrar, navegar diretamente
        cy.visit("https://elodrinks.confianopai.com/login");
      }
    });

    cy.url().should("include", "login");
    cy.get('input[id^="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
  });

  it("Deve mostrar erro com credenciais inválidas", () => {
    cy.visit("https://elodrinks.confianopai.com/login");

    // Preencher formulário com dados inválidos
    cy.get('input[id^="email"]:visible')
      .should("be.visible")
      .type("usuario@email.com");

    cy.get('input[id^="senha"]:visible')
      .should("be.visible")
      .type("senhaerrada123");

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

    cy.url({ timeout: 10000 }).should("not.include", /login/);
  });

  it("Deve realizar login com credenciais válidas", () => {
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
});
