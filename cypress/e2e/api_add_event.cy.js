describe('CT-API-002: Adicionar Novo Evento via API (POST)', () => {

    // Endereço do script PHP que manipula a inserção (calendar.php)
    const postUrl = 'http://localhost/calendar-project/calendar.php';
    // Cria um título único para garantir que não haja conflitos de teste
    const newTitle = 'Evento Teste POST ' + Date.now(); 
    
    // Dados que serão enviados para o script calendar.php
    const eventData = {
        action: 'add',
        titulo: newTitle,
        localizacao: 'API Teste QA',
        descricao: 'Teste de inserção de dados via requisição Cypress.',
        startDate: '2025-10-31', 
        endDate: '2025-10-31',
        startTime: '10:00:00',
        endTime: '11:00:00'
    };

    it('Deve enviar um evento via POST, receber sucesso e confirmar a persistência no banco', () => {
        
        // 1. Requisição POST para inserção
        cy.request({
            method: 'POST',
            url: postUrl,
            form: true,
            body: eventData 
        }).then((response) => {
            
            // 2. Verifica se o script retornou um status 200 (Sucesso HTTP)
            expect(response.status).to.eq(200);

            // Ignoramos o corpo da resposta aqui devido ao bug do XAMPP.
        });

        // 4. Verificação de Persistência (Teste em cadeia): 
        // Chama a API GET. O Cypress deve converter o JSON do PHP automaticamente.
        cy.request('GET', 'http://localhost/calendar-project/fetch_events.php').then((response) => {
    
            // Se o Cypress não conseguiu converter o body, ele estará como uma string.
            // Usamos o response.body diretamente. Ele deve ser um array ou string JSON.
            const events = (typeof response.body === 'string' && response.body.length > 0) 
                ? JSON.parse(response.body) 
                : response.body;
                
            let eventFound = false;
        
            // Itera sobre o array de eventos, que agora deve ser um objeto JS
            Cypress._.each(events, (event) => { 
                if (event.titulo === newTitle) {
                    eventFound = true;
                }
            });
            
            // Asserção final: O teste só passa se o evento for encontrado
            expect(eventFound).to.be.true;
        });

    });
});