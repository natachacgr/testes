describe("Testes de Login Administrador - Elo Drinks", () => {
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

  it("Deve realizar login com credenciais válidas e ir para o dashboard", () => {
    cy.get("a, button").contains(/login/i).first().click();

    cy.get('input[id^="email"]:visible')
      .should("be.visible")
      .type("gabriel@gabriel");

    cy.get('input[id^="senha"]:visible').should("be.visible").type("1234");

    cy.contains('button:visible', /Entrar/i).click({ force: true });

    cy.location("pathname", { timeout: 15000 }).should("eq", "/dashboard");
  });
});
