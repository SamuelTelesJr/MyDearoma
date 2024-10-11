const { Builder, By, until } = require('selenium-webdriver');

(async function aplicarDesconto() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navega até a página de checkout
        await driver.get('https://mydearoma.com/61707813019/checkouts/754447a91a687b676612d453c40e48a8');

        // Função para inserir o código de desconto
        async function inserirDesconto(campoId, botaoSelector) {
            try {
                // Aguarda o campo de código de desconto estar presente
                await driver.wait(until.elementLocated(By.id(campoId)), 10000);
    
                // Localiza o campo de desconto pelo ID e insere o código
                const descontoField = await driver.findElement(By.id(campoId));
                await descontoField.clear(); // Limpa o campo antes de inserir o código
                await descontoField.sendKeys('DISCOUNT_66EE03122CD02');
    
                // Aguarda o botão de aplicar estar presente
                await driver.wait(until.elementLocated(By.css(botaoSelector)), 10000);
    
                // Localiza o botão e clica nele
                const applyButton = await driver.findElement(By.css(botaoSelector));
                await applyButton.click();

                // Aguarda um possível redirecionamento ou mudança de página
                await driver.wait(until.titleIs('Checkout'), 10000);

            } catch (error) {
                console.error('Erro ao inserir desconto:', error);
            }
        }

        // Primeira tentativa de inserir o código
        await inserirDesconto('checkout_reduction_code', '#checkout_submit');

        // Após o redirecionamento, tentamos inserir o código novamente com os novos IDs, utilizando o `aria-label`
        await inserirDesconto('ReductionsInput0', 'button[aria-label="Apply Discount Code"]');

    } catch (error) {
        console.error('Erro na requisição:', error);
    } finally {
        // O navegador permanecerá aberto para inspeção
        // Remova a linha abaixo para manter o navegador aberto
        // await driver.quit();
    }
})();
