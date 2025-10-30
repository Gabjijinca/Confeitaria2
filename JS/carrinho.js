
document.addEventListener('DOMContentLoaded', function() {
    
    const cartBody = document.getElementById('cart-body');
    const subtotalValue = document.getElementById('subtotal-value');
    const totalValue = document.getElementById('total-value');
    const checkoutBtn = document.getElementById('checkout-btn');

    const simulatedCart = [
        { id: 1, name: "Bolo Red Velvet (2kg)", price: 150.00, qty: 1, image: "../Confeitaria/FOTOS/BOLO1.png" },
        { id: 2, name: "Mix Macarons Clássicos (12 un)", price: 80.00, qty: 2, image: "../Confeitaria/FOTOS/DOCE1.png" },
        { id: 3, name: "Pavê Crocante (Média)", price: 95.00, qty: 1, image: "../Confeitaria/FOTOS/PAVE2.png" },
    ];

    const SHIPPING_FEE = 25.00;

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
    
 
    function renderCart() {

        cartBody.innerHTML = '';
        let subtotal = 0;

        if (simulatedCart.length === 0) {
            cartBody.innerHTML = '<tr><td colspan="5" class="cart-empty-message">Seu carrinho está vazio. <a href="catalogo.html">Adicione produtos!</a></td></tr>';
            checkoutBtn.disabled = true;
            return;
        }

        simulatedCart.forEach(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="product-details">
                        <img src="${item.image}" alt="${item.name}" class="product-image">
                        <span class="product-name">${item.name}</span>
                    </div>
                </td>
                <td>${formatCurrency(item.price)}</td>
                <td>
                    <input type="number" value="${item.qty}" min="1" class="qty-input" data-id="${item.id}" style="width: 50px;">
                </td>
                <td>${formatCurrency(itemTotal)}</td>
                <td>
                    <button class="btn-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            cartBody.appendChild(row);
        });

        updateTotals(subtotal);
        checkoutBtn.disabled = false;
        
        attachEventListeners();
    }


    function updateTotals(subtotal) {
        const total = subtotal + SHIPPING_FEE;
        
        subtotalValue.textContent = formatCurrency(subtotal);
        document.getElementById('shipping-value').textContent = formatCurrency(SHIPPING_FEE);
        totalValue.textContent = formatCurrency(total);
    }

    function attachEventListeners() {
        document.querySelectorAll('.btn-remove').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeItem(itemId);
            });
        });

        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const newQty = parseInt(this.value);
                if (newQty > 0) {
                    updateQuantity(itemId, newQty);
                }
            });
        });

checkoutBtn.addEventListener('click', function() {
    window.location.href = 'checkout.html';
});
    }

  
    function removeItem(id) {
        const index = simulatedCart.findIndex(item => item.id === id);
        if (index > -1) {
            simulatedCart.splice(index, 1);
            renderCart(); 
        }
    }

    function updateQuantity(id, qty) {
        const item = simulatedCart.find(item => item.id === id);
        if (item) {
            item.qty = qty;
            renderCart(); 
        }
    }


    renderCart();
});