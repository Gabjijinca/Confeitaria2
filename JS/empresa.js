

document.addEventListener('DOMContentLoaded', function() {
    const corporateForm = document.getElementById('corporate-enquiry-form');

    if (corporateForm) {
        corporateForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const empresaNome = document.getElementById('empresa-nome').value;
            const contato = document.getElementById('contato').value;
            const produtoInteresse = document.getElementById('produto-interesse').value;
            const logoFile = document.getElementById('upload-logo').files[0];
            
            let message = `Sua solicitação de orçamento corporativo para a empresa ${empresaNome} foi recebida com sucesso!`;
            
            if (logoFile) {
                message += ` Incluindo o anexo: ${logoFile.name}.`;
            }

            
            alert(message + "\nAguarde nosso contato por e-mail em até 48 horas.");
            
            corporateForm.reset();
        });
    }
});