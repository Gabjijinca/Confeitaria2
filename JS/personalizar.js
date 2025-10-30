

document.addEventListener('DOMContentLoaded', function() {



    const BASE_PRICES = {
        bolo: { baseKg: 55.00, adicionalMassa: 15.00, adicionalRecheio: 10.00, adicionalCobertura: 5.00 },
        doces: { baseDezena: 6.00, adicionalPeso: 3.00, adicionalTipo: 1.50, adicionalDecoracao: 1.00 },
        sobremesa: { basePorcao: 8.00, adicionalTipo: 15.00, adicionalSabor: 5.00, adicionalTamanho: 25.00 }
    };
    
    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };


    function calculateBoloPrice(fields) {
        const tamanho = parseFloat(fields.tamanho.value) || 0; // Kg
        const quantidade = parseFloat(fields.quantidade.value) || 1;
        
        if (tamanho === 0) return 0;

        let precoBase = tamanho * BASE_PRICES.bolo.baseKg;

        if (fields.massa.value !== "Baunilha" && fields.massa.value !== "") {
            precoBase += BASE_PRICES.bolo.adicionalMassa;
        }
        if (fields.recheio.value !== "Brigadeiro" && fields.recheio.value !== "") {
            precoBase += BASE_PRICES.bolo.adicionalRecheio;
        }
        if (fields.cobertura.value !== "Chantilly" && fields.cobertura.value !== "") {
            precoBase += BASE_PRICES.bolo.adicionalCobertura;
        }
        
        return precoBase * quantidade;
    }

    function calculateDocesPrice(fields) {
        const quantidadeDezenas = parseFloat(fields.quantidade.value) / 10 || 0; // Qtd em dezenas (ex: 10/10 = 1)
        const peso = parseFloat(fields.peso.value) || 10; // Peso em gramas
        
        if (quantidadeDezenas === 0) return 0;

        let precoPorDezena = BASE_PRICES.doces.baseDezena * 10; // Preço base para 10 doces

        precoPorDezena *= (peso / 10); 

        if (fields.tipo.value !== "Brigadeiro" && fields.tipo.value !== "") {
            precoPorDezena += BASE_PRICES.doces.adicionalTipo * 10;
        }
        if (fields.decoracao.value === "FolhaOuro") {
            precoPorDezena += BASE_PRICES.doces.adicionalDecoracao * 10; // Custo mais alto para ouro
        }
        
        return precoPorDezena * quantidadeDezenas;
    }

function calculateSobremesaPrice(fields) {
    const quantidade = parseFloat(fields.quantidade.value) || 1;
    
    const tipoSobremesa = fields.tipo.value;
    const tamanhoSobremesa = fields.tamanhoSobremesa.value;
    const sabor = fields.sabor.value;

    let precoBase = 50.00; 

    if (tipoSobremesa === "Pavê") {
        precoBase = 75.00;
    } else if (tipoSobremesa === "Torta") {
        precoBase = 90.00;
    } else if (tipoSobremesa === "BoloPote") {
        precoBase = 8.00; 
    }

    if (sabor !== "Chocolate" && sabor !== "Baunilha" && sabor !== "") {
         precoBase += 10.00; 
    }
    
    if (tamanhoSobremesa === "Média") {
        precoBase *= 1.5;
    } else if (tamanhoSobremesa === "Grande") {
        precoBase *= 2.0;
    } else if (tamanhoSobremesa === "ExtraG") {
        precoBase *= 2.5;
    }

    return precoBase * quantidade;
}


    function setupPersonalization(productType, calculateFunction) {
        const selectionBox = document.querySelector(`.selection-box[data-product-type="${productType}"]`);
        if (!selectionBox) return;

        const requiredFields = selectionBox.querySelectorAll('[required]');
        const submitButton = selectionBox.querySelector('.btn-carrinho');
        const priceDisplayElement = document.getElementById(`price-${productType}`);

        const fields = {
            tamanho: selectionBox.querySelector('#tamanho-bolo'),
            massa: selectionBox.querySelector('#massa-bolo'),
            recheio: selectionBox.querySelector('#recheio-bolo'),
            cobertura: selectionBox.querySelector('#cobertura-bolo'),
            quantidade: selectionBox.querySelector('#quantidade-bolo, #doce-quantidade, #sobremesa-quantidade'),
            
            peso: selectionBox.querySelector('#doce-peso'),
            tipo: selectionBox.querySelector('#doce-tipo, #sobremesa-tipo'),
            decoracao: selectionBox.querySelector('#doce-decoracao'),
            sabor: selectionBox.querySelector('#doce-sabor, #sobremesa-sabor'),
            tamanhoSobremesa: selectionBox.querySelector('#sobremesa-tamanho')
        };


        function checkAndCalculate() {
            let allFilled = true;
            requiredFields.forEach(field => {
                const isSelectDefault = field.tagName === 'SELECT' && field.value.startsWith('Selecione');
                const isInvalidInput = field.tagName === 'INPUT' && (field.value === "" || parseFloat(field.value) < 1);
                
                if (field.value === "" || isSelectDefault || isInvalidInput) {
                    allFilled = false;
                }
            });
            
            submitButton.disabled = !allFilled;

            if (allFilled) {
                const finalPrice = calculateFunction(fields);
                priceDisplayElement.textContent = formatCurrency(finalPrice);
            } else {
                priceDisplayElement.textContent = formatCurrency(0);
            }
        }

        requiredFields.forEach(field => {
            field.addEventListener('change', checkAndCalculate);
            field.addEventListener('input', checkAndCalculate);
        });
        
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`Personalização de ${productType.toUpperCase()} adicionada ao carrinho! Preço: ${priceDisplayElement.textContent}`);
        });

       
        checkAndCalculate();
    }

    setupPersonalization('bolo', calculateBoloPrice);
    setupPersonalization('doces', calculateDocesPrice);
    setupPersonalization('sobremesa', calculateSobremesaPrice);
});