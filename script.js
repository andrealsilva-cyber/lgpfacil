// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Controle da faixa fixa interativa
    const starterCard = document.getElementById('starterCard');
    const cardInitial = document.getElementById('cardInitial');
    const cardSelection = document.getElementById('cardSelection');

    if (starterCard && cardInitial && cardSelection) {
        // Alternar entre os estados do card
        starterCard.addEventListener('click', function(e) {
            if (e.target.closest('.card-initial')) {
                cardInitial.style.display = 'none';
                cardSelection.style.display = 'block';
            }
        });

        // Fechar o card de seleção ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!starterCard.contains(e.target) && cardSelection.style.display === 'block') {
                cardSelection.style.display = 'none';
                cardInitial.style.display = 'block';
            }
        });
    }

    // Função para selecionar perfil
    window.selectProfile = function(profileType) {
        // Redirecionar para a página específica
        switch(profileType) {
            case 'micro':
                window.location.href = 'micro.html';
                break;
            case 'pequeno':
                window.location.href = 'pequeno.html';
                break;
        }
    };

    // Efeito de destaque nas seções ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Adicionar classe de animação para elementos filhos
                if (entry.target.classList.contains('principles-grid')) {
                    const cards = entry.target.querySelectorAll('.principle-card');
                    cards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.classList.add('fade-in');
                    });
                }
                
                if (entry.target.classList.contains('stats-grid')) {
                    const stats = entry.target.querySelectorAll('.stat-item');
                    stats.forEach((stat, index) => {
                        stat.style.animationDelay = `${index * 0.1}s`;
                        stat.classList.add('fade-in');
                    });
                }
            }
        });
    }, observerOptions);

    // Aplicar observador às seções principais
    const sectionsToObserve = [
        '.intro-callout',
        '.lgpd-explanation',
        '.principles-section',
        '.purpose-section',
        '.stats-section'
    ];

    sectionsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });

    // Aplicar observador aos cards de princípios
    document.querySelectorAll('.principle-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Aplicar observador aos itens de estatística
    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Contador animado para estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.round(current) + (stat.textContent.includes('%') ? '%' : '');
        }, 40);
    });

    // Adicionar classe active ao menu conforme scroll
        const navLinks = document.querySelectorAll('.nav a');

        function setActiveMenuByUrl() {
            const currentPage = window.location.pathname.split('/').pop();
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (
                    (href === 'index.html' && (currentPage === '' || currentPage === 'index.html')) ||
                    (href === 'micro.html' && currentPage === 'micro.html') ||
                    (href === 'pequeno.html' && currentPage === 'pequeno.html') ||
                    (href === 'contato.html' && currentPage === 'contato.html') ||
                    (href === 'soluções.html' && currentPage === 'soluções.html') ||
                    (href === 'recursos.html' && currentPage === 'recursos.html')
                ) {
                    link.classList.add('active');
                }
            });
        }

        setActiveMenuByUrl();
        window.addEventListener('popstate', setActiveMenuByUrl);

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio do formulário
            const formData = new FormData(contactForm);
            const name = formData.get('name') || document.getElementById('name').value;
            
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            contactForm.reset();
        });
    }

    // Checklist interativo
    const checklistItems = document.querySelectorAll('.checklist-item input');
    checklistItems.forEach(item => {
        item.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.7';
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
            }
        });
    });

    // Observa quando o footer entra na viewport e esconde o card flutuante
    try {
        const starterBar = document.querySelector('.fixed-starter-bar');
        const footer = document.querySelector('.footer');

        if (starterBar && footer && 'IntersectionObserver' in window) {
            const io = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        starterBar.classList.add('hidden');
                    } else {
                        starterBar.classList.remove('hidden');
                    }
                });
            }, { root: null, threshold: 0 });

            io.observe(footer);
        }
    } catch (e) {
        // falha silenciosa sem quebrar outras funcionalidades
        console.error('Starter bar observer error:', e);
    }
});

// Preloader simples (opcional)
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Remover estilos de animação após o carregamento
    setTimeout(() => {
        document.querySelectorAll('.section, .principle-card, .stat-item').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 1000);
});

{ /* Adição: TTS (Web Speech API) para ler o conteúdo da página */ }

(function () {
    if (!('speechSynthesis' in window)) return; // se não suportado, sai

    const synth = window.speechSynthesis;
    let utterance = null;
    let voices = [];
    const toggleBtn = document.querySelector('.tts-toggle');
    const controls = document.querySelector('.tts-controls');
    const voicesSelect = document.querySelector('.tts-voices');
    const playBtn = document.querySelector('.tts-play');
    const pauseBtn = document.querySelector('.tts-pause');
    const stopBtn = document.querySelector('.tts-stop');
    const ttsFloating = document.querySelector('.tts-floating');
    const footer = document.querySelector('.footer');

    function getReadableText() {
        const main = document.querySelector('main') || document.querySelector('.unified-content') || document.body;
        // remove elementos que não devem ser lidos
        const clones = main.cloneNode(true);
        clones.querySelectorAll('script, style, noscript, .fixed-starter-bar, .tts-floating').forEach(n => n.remove());
        return clones.innerText.trim();
    }

    function populateVoices() {
        voices = synth.getVoices().filter(v => v.lang && v.name);
        voicesSelect.innerHTML = '';
        voices.forEach((v, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = `${v.name} — ${v.lang}`;
            voicesSelect.appendChild(opt);
        });
    }

    // carregar vozes (alguns browsers carregam async)
    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoices;
    }

    function createUtterance(text) {
        if (!text) return null;
        const u = new SpeechSynthesisUtterance(text);
        const selected = voicesSelect.value ? voices[+voicesSelect.value] : voices.find(v => v.lang.startsWith('pt')) || voices[0];
        if (selected) u.voice = selected;
        u.rate = 1; // ajustar se desejar
        u.pitch = 1;
        u.lang = u.voice && u.voice.lang ? u.voice.lang : 'pt-BR';
        u.onend = () => { utterance = null; toggleBtn.textContent = '🔊'; };
        u.onerror = () => { utterance = null; toggleBtn.textContent = '🔊'; };
        return u;
    }

    function startReading() {
        if (synth.speaking) {
            // se estava pausado, retomar
            if (synth.paused) synth.resume();
            return;
        }
        const text = getReadableText();
        if (!text) return alert('Conteúdo não encontrado para leitura.');
        utterance = createUtterance(text);
        if (!utterance) return;
        synth.cancel();
        synth.speak(utterance);
        toggleBtn.textContent = '⏸';
    }

    function pauseReading() {
        if (synth.speaking && !synth.paused) synth.pause();
    }

    function stopReading() {
        if (synth.speaking || synth.paused) synth.cancel();
        utterance = null;
        toggleBtn.textContent = '🔊';
    }

    // toggle show/hide controles
    if (toggleBtn && controls) {
        toggleBtn.addEventListener('click', () => {
            const expanded = toggleBtn.getAttribute('aria-pressed') === 'true';
            toggleBtn.setAttribute('aria-pressed', String(!expanded));
            controls.hidden = expanded; // mostrar quando estava fechado
        });
    }

    if (playBtn) playBtn.addEventListener('click', startReading);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseReading);
    if (stopBtn) stopBtn.addEventListener('click', stopReading);

    // Esconder o card quando o footer entra na viewport (mesma lógica do starter-card)
    if (ttsFloating && footer && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ttsFloating.classList.add('hidden');
                } else {
                    ttsFloating.classList.remove('hidden');
                }
            });
        }, { root: null, threshold: 0 });
        io.observe(footer);
    }

    // limpar ao trocar de página/rota, evitar leitura em background
    window.addEventListener('beforeunload', () => { if (synth) synth.cancel(); });
})();
