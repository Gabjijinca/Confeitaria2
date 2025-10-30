

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const formContent = document.querySelector('.form-content');

    const forms = {
        login: loginForm,
        cadastro: cadastroForm
    };

    function switchTab(targetTab) {
        tabButtons.forEach(button => {
            if (button.getAttribute('data-tab') === targetTab) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        for (const key in forms) {
            const form = forms[key];
            if (key === targetTab) {
                form.classList.add('active');
                form.style.display = 'block'; 
                
              
                formContent.style.minHeight = `${form.offsetHeight + 60}px`; 
            } else {
                form.classList.remove('active');
                form.style.display = 'none';
            }
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            switchTab(target);
        });
    });

        e.preventDefault();
        alert('Login realizado com sucesso! (Simulação)');
        window.location.href = 'index.html'; 
    });

    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cadastro efetuado! Você pode fazer login agora. (Simulação)');
        
        switchTab('login');
    });

    switchTab('login'); 
