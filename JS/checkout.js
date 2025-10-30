

document.addEventListener('DOMContentLoaded', function() {

    const checkoutForm = document.getElementById('checkout-form');
    const finalizarBtn = document.getElementById('finalizar-compra-btn');


    const dataEntregaInput = document.getElementById('data-entrega');
    if (dataEntregaInput) {
        flatpickr(dataEntregaInput, {
            enableTime: true,
            minDate: new Date().fp_incr(2),
            dateFormat: "d/m/Y H:i",
            time_24hr: true,
            locale: "pt",
            
            minTime: "09:00",
            maxTime: "18:00",
            
            disable: [
                function(date) {
                    return (date.getDay() === 0); 
                }
            ]
        });
    }
    
   
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();


        alert('Pagamento processado e encomenda agendada! Você será redirecionado(a) para a página inicial.');
   
        sessionStorage.removeItem('simulated_cart'); 
      
        window.location.href = 'index.html';
    });
    

});