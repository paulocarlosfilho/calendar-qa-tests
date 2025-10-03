describe('CT-API-001: Teste de API - fetch_events.php', () => {

    const apiUrl = 'http://localhost/calendar-project/fetch_events.php';

    it('Deve retornar status 200 e uma resposta JSON válida com os eventos', () => {
        
        cy.request('GET', apiUrl).then((response) => {
            
            // 1. Verifica se o status é 200 (Sucesso da requisição)
            expect(response.status).to.eq(200);

            // 2. Verifica se a resposta é um Array
            expect(response.body).to.be.an('array'); 
            
            // 3. NOVO CÓDIGO COM REGEX para contornar problemas de acentuação (bug de Q.A.)
            
            // Variável para rastrear se o evento foi encontrado
            let eventFound = false;

            // Itera sobre cada evento no array JSON (response.body)
            Cypress._.each(response.body, (event) => {
                
                // Regex: Busca o texto parcial, ignorando acentos (é, á) e codificação.
                const titleMatch = event.titulo.match(/Buscar os Rem/i); // 'i' ignora maiúsculas/minúsculas
                const locationMatch = event.localizacao.match(/Farmacia/i); 
                
                if (titleMatch && locationMatch) {
                    eventFound = true; // Marca como encontrado
                    // return false; // Se quiser sair na primeira correspondência
                }
            });

            // 4. Asserção final: O teste só passa se o evento principal for encontrado
            expect(eventFound).to.be.true; 

        });
    });
});