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

  it.skip("Deve acessar página de orçamento personalizado", () => {
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

  it.skip("Não permitir avançar os steps com campos em branco", () => {
    cy.get("a, button")
      .contains(/orçamento/i)
      .first()
      .click();

    cy.get("p, button")
      .contains(/Personalizar/)
      .first()
      .click();

    cy.get("p, button")
      .contains(/Casamento/)
      .first()
      .click();

    cy.contains('span', '→')
      .closest('button')
      .should('be.disabled')
  });

  it("Cadastra Casamento Natacha e Otavio", () => {
    cy.get("a, button")
      .contains(/orçamento/i)
      .first()
      .click();

    cy.get("p, button")
      .contains(/Personalizar/)
      .first()
      .click();

    cy.get("p, button")
      .contains(/Casamento/)
      .first()
      .click();

    cy.contains('label', 'Nome do Evento')
      .next('input')
      .type('Casamento Natacha e Otavio');

    cy.contains('label', 'Data do Evento')
      .next('input')
      .click()
      .type('2025-07-12');

    cy.contains('label', 'Hora de Início')
      .next('input')
      .click()
      .type('18:15');

    cy.contains('label', 'Número de Convidados')
      .next('input')
      .type('250');

    cy.contains('label', 'Duração do Evento')
      .next('input')
      .click()
      .type('10:00');

    cy.contains('span', '→')
      .closest('button')
      .should('be.enabled')
      .click();

    cy.get('.grid > :nth-child(1)').click();

    cy.get('.grid > :nth-child(4)').click();

    cy.contains('span', '→')
      .closest('button')
      .should('be.enabled')
      .click();

    cy.wait(500);

    cy.get('.grid > :nth-child(1)').click();

    cy.contains('span', '→')
      .closest('button')
      .should('be.enabled')
      .click();

    cy.wait(500);

    cy.get('.grid > :nth-child(1)')
      .find('button')
      .eq(1)
      .click()
      .click()
      .click();

    cy.contains('span', '→')
      .closest('button')
      .should('be.enabled')
      .click();

    cy.wait(500);

    cy.contains('span', '→')
      .closest('button')
      .should('be.enabled')
      .click();

    cy.wait(500);

    cy.get('.grid > .flex').click();

    cy.contains('span', '→')
      .closest('button')
      .should('be.enabled')
      .click();

    cy.wait(500);

    cy.get('.grid > :nth-child(1) > .p-4')
      .find('button')
      .eq(1)
      .click();

    cy.get('span:contains("Quantidade:")')
      .eq(1)
      .next()
      .find('button')              
      .eq(1)                    
      .click()
      .click()
      .click()
      .click()
      .click();

    cy.get('.px-6').click();

    cy.wait(500);

    cy.contains('button', 'Enviar Pedido')
      .should('be.enabled')
      .click();
    
  });

});
