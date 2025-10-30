
document.addEventListener('DOMContentLoaded', function() {
    
    const carrinhoButtons = document.querySelectorAll('.btn-carrinho');

    carrinhoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productName = this.getAttribute('data-product');
            alert(`"${productName.toUpperCase()}" adicionado ao carrinho!`);
        });
    });
});