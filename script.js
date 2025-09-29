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
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav a');

    function highlightMenu() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightMenu);

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
