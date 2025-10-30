
const FONT_STEP = 2;
const FONT_MAX = 24;
const FONT_MIN = 12;
const FONT_BASE = 16;
const body = document.body;

var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");


function showSlides() {
    if (slides.length === 0) return; 
    
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        slides[i].classList.remove('prev');
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    var currentSlide = slides[slideIndex - 1];
    var previousSlideIndex = slideIndex - 2;

    currentSlide.classList.add('active');

    if (previousSlideIndex < 0) {
        previousSlideIndex = slides.length - 1; 
    }
    var previousSlide = slides[previousSlideIndex];
    previousSlide.classList.add('prev');
    
    setTimeout(showSlides, 10000); 
}


if (slides.length > 0) {
    showSlides();
}



document.addEventListener('DOMContentLoaded', function() {
    

    var btn = document.getElementById('back-to-top');
    if (btn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    const accBtn = document.getElementById('accessibility-btn');
    const sidebar = document.getElementById('accessibility-sidebar');
    const closeBtn = document.getElementById('close-sidebar-btn');
    if (accBtn && sidebar && closeBtn) {
        accBtn.addEventListener('click', () => sidebar.classList.add('open'));
        closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));
        
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !accBtn.contains(e.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }



    const audio = document.getElementById('background-audio');
    const audioBtn = document.getElementById('toggle-audio-btn');

    if (audio && audioBtn) {
        const savedState = sessionStorage.getItem('audio_state');

        if (savedState === 'playing') {
            audio.muted = false;
            audio.play().catch(e => { audio.muted = true; }); 
            audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audio.muted = true;
            audio.pause();
            audioBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
        }
        
        document.body.addEventListener('click', function attemptPlay() {
            if (audio.muted) {
                audio.play().catch(e => console.log("Áudio não pôde iniciar automaticamente."));
            }
            document.body.removeEventListener('click', attemptPlay);
        });

        audioBtn.addEventListener('click', function() {
            if (audio.muted) {
                audio.muted = false;
                audio.play().catch(e => console.log("Play falhou."));
                audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                sessionStorage.setItem('audio_state', 'playing');
            } else {
                audio.muted = true;
                audio.pause(); 
                audioBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
                sessionStorage.setItem('audio_state', 'muted');
            }
        });
    }


    const contrastBtn = document.querySelector('[data-action="contrast"]');
    if (contrastBtn) {
        contrastBtn.addEventListener('click', function() {
            body.classList.toggle('high-contrast');
            const state = body.classList.contains('high-contrast') ? 'on' : 'off';
            state === 'on' ? sessionStorage.setItem('accessibility_contrast', 'on') : sessionStorage.removeItem('accessibility_contrast');
        });
        if (sessionStorage.getItem('accessibility_contrast') === 'on') {
            body.classList.add('high-contrast');
        }
    }


  
    const grayscaleBtn = document.querySelector('[data-action="grayscale"]');
    if (grayscaleBtn) {
        grayscaleBtn.addEventListener('click', function() {
            body.classList.toggle('grayscale-mode');
            const state = body.classList.contains('grayscale-mode') ? 'on' : 'off';
            state === 'on' ? sessionStorage.setItem('accessibility_grayscale', 'on') : sessionStorage.removeItem('accessibility_grayscale');
        });
        if (sessionStorage.getItem('accessibility_grayscale') === 'on') {
            body.classList.add('grayscale-mode');
        }
    }



    const fontUpBtn = document.querySelector('[data-action="font-size-up"]');
    const fontDownBtn = document.querySelector('[data-action="font-size-down"]');
    
    function getCurrentFontSize() {
        const currentSize = parseFloat(getComputedStyle(body).fontSize);
        return currentSize || FONT_BASE; 
    }
    
    function applyFontSize(newSize) {
        newSize = Math.round(newSize); 
        body.style.fontSize = `${newSize}px`;
        sessionStorage.setItem('accessibility_font_size', newSize);
    }

    if (fontUpBtn) {
        fontUpBtn.addEventListener('click', () => {
            let newSize = getCurrentFontSize() + FONT_STEP;
            if (newSize <= FONT_MAX) applyFontSize(newSize);
        });
    }

    if (fontDownBtn) {
        fontDownBtn.addEventListener('click', () => {
            let newSize = getCurrentFontSize() - FONT_STEP;
            if (newSize >= FONT_MIN) applyFontSize(newSize);
        });
    }
    
    const savedFontSize = sessionStorage.getItem('accessibility_font_size');
    if (savedFontSize) {
        body.style.fontSize = `${savedFontSize}px`;
    }

    

    const speechBtn = document.querySelector('[data-action="speech"]');
    if ('speechSynthesis' in window && speechBtn) {
        speechBtn.addEventListener('click', function() {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                speechBtn.classList.remove('active');
                speechBtn.innerHTML = '<i class="fas fa-volume-up"></i> Leitura por Voz';
                return;
            }

            const contentToRead = document.querySelector('main');
            let textToRead = contentToRead ? contentToRead.innerText : '';
            if (textToRead) {
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = 'pt-BR';
                utterance.rate = 1.1; 
                window.speechSynthesis.speak(utterance);
                speechBtn.classList.add('active');
                speechBtn.innerHTML = '<i class="fas fa-volume-up"></i> Parar Leitura';
            }
        });
    }
});