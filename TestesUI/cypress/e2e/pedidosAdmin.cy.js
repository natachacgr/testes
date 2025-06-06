describe("Admin - Lista de Pedidos (Elo Drinks)", () => {
  const email = "gabriel@gabriel";
  const senha = "1234";

  beforeEach(() => {
    cy.visit("https://elodrinks.confianopai.com/");

    // Entrar na tela de login
    cy.get("body").then(($body) => {
      if (
        $body.find('[data-cy="login"], a[href*="login"], button')
          .length > 0
      ) {
        cy.contains("a, button", /login|entrar/i).first().click();
      } else {
        cy.visit("https://elodrinks.confianopai.com/login");
      }
    });

    // Fazer login
    cy.get('input[id^="email"]:visible').type(email);
    cy.get('input[id^="senha"]:visible').type(senha);

    cy.wait(500);

    cy.contains('button:visible', /Entrar/i).click({ force: true });

    cy.location("pathname", { timeout: 1000 }).should("eq", "/dashboard");
  });

  it("Deve abrir o sidebar, acessar /pedidos e encontrar Casamento Natacha e Otavio", () => {
    cy.get('button[class*="lg:hidden"]')
      .filter(":visible")
      .first()
      .click();

    cy.get(':nth-child(3) > .flex').first().click();

    cy.location("pathname").should("eq", "/pedidos");

    cy.wait(2000);

    cy.get("tbody")
      .contains(/Casamento\s+Natacha\s+e\s+Otavio/i)
      .scrollIntoView()
      .should("be.visible");
  });
});
