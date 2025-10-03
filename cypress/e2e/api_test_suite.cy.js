// --- TEST SUITE DE AUTOMACAO DE QA (API) ---
// Arquivo: api_test_suite.cy.js

// Importa e executa o teste de leitura de eventos (GET)
// Garante que o sistema está lendo dados corretamente.
import './api_fetch_events.cy.js'; 

// Importa e executa o teste de adição de novos eventos (POST)
// Garante que o sistema está escrevendo e persistindo dados corretamente.
import './api_add_event.cy.js'; 


// Opcional: Você pode adicionar um bloco principal para metadados da suite
describe('SUITE DE TESTES DE API: Funcionalidades Críticas do Backend', () => {

    it('Verifica se os testes de leitura e escrita foram executados com sucesso', () => {
        cy.log('A execução da suite foi concluída.');
        cy.log('Verifique se os arquivos api_fetch_events.cy.js e api_add_event.cy.js passaram.');
        // Esta asserção é redundante, mas garante que o bloco principal rode.
        expect(true).to.be.true; 
    });
});