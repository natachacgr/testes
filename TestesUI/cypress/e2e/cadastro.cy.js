describe("Testes de Cadastro - Elo Drinks", () => {
  beforeEach(() => {
    cy.visit("https://elodrinks.confianopai.com");
  });

  it("Deve acessar a página de cadastro", () => {
    cy.get("body").then(($body) => {
      if (
        $body
          .find("a, button")
          .filter(':contains("Cadastro"), :contains("Registrar")').length > 0
      ) {
        cy.get("a, button")
          .contains(/cadastro|registro/i)
          .first()
          .click();
      } else {
        cy.visit("https://elodrinks.confianopai.com/cadastro");
      }
    });

    cy.url().should("match", /cadastro|register|signup/);
    cy.get('input[name*="nomeCompleto"]').should("be.visible");
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[id^="celular"]').should("be.visible");
  });

  it("Deve validar campos obrigatórios", () => {
    cy.visit("https://elodrinks.confianopai.com/cadastro");

    // Tentar submeter formulário vazio
    cy.get('button[type="submit"]')
      .contains(/Cadastre-se|registrar|criar|enviar/i)
      .then(($buttons) => {
        const visibleButton = $buttons.filter(":visible").first();
        if (visibleButton.length > 0) {
          cy.wrap(visibleButton).click();
        } else {
          cy.wrap($buttons.first()).click({ force: true });
        }
      });
    // Verificar mensagens de validação
    cy.get("input[required]").each(($input) => {
      cy.wrap($input).then((el) => {
        expect(el[0].checkValidity()).to.be.false;
      });
    });
  });

  it("Deve validar formato de email", () => {
    cy.visit("https://elodrinks.confianopai.com/cadastro");

    cy.get('input[id^="nomeCompleto"]')
      .first()
      .type("nome usuario", { force: true });

    cy.get('input[id^="email"]:visible')
      .should("be.visible")
      .type("email-invalido");

    cy.get('input[id^="celular"]:visible')
      .should("be.visible")
      .type("35 99999-99999");

    cy.get('input[id^="senha"]:visible').should("be.visible").type("senha123");

    cy.get('button[type="submit"]')
      .contains(/Cadastre-se/i)
      .then(($buttons) => {
        const visibleButton = $buttons.filter(":visible").first();
        if (visibleButton.length > 0) {
          cy.wrap(visibleButton).click();
        } else {
          cy.wrap($buttons.first()).click({ force: true });
        }
      });

    cy.url().should("include", "/cadastro");
  });

  it("Deve realizar cadastro com dados válidos", () => {
    cy.visit("https://elodrinks.confianopai.com/cadastro");

    cy.get('input[id^="nomeCompleto"]')
      .first()
      .type("nome usuario", { force: true });

    cy.get('input[id^="email"]:visible')
      .should("be.visible")
      .type(gerarTimestamp() + "email@email");

    cy.get('input[id^="celular"]:visible')
      .should("be.visible")
      .type("35 99999-99999");

    cy.get('input[id^="senha"]:visible').should("be.visible").type("senha123");

    cy.get('button[type="submit"], button')
      .contains(/Cadastre-se/i)
      .then(($buttons) => {
        const visibleButton = $buttons.filter(":visible").first();
        if (visibleButton.length > 0) {
          cy.wrap(visibleButton).click();
        } else {
          cy.wrap($buttons.first()).click({ force: true });
        }
      });

    cy.url({ timeout: 10000 }).should("not.include", /cadastro/);
  });
});

function gerarTimestamp() {
  const agora = new Date();

  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = agora.getFullYear();

  const hora = String(agora.getHours()).padStart(2, '0');
  const minuto = String(agora.getMinutes()).padStart(2, '0');
  const segundo = String(agora.getSeconds()).padStart(2, '0');

  return `${ano}${mes}${dia}_${hora}${minuto}${segundo}`;
}