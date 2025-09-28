// Smooth scroll para links internos
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

// Alternar entre os estados do card
starterCard.addEventListener('click', function(e) {
    if (e.target.closest('.card-initial')) {
        cardInitial.style.display = 'none';
        cardSelection.style.display = 'block';
    }
});

// Função para selecionar perfil
function selectProfile(profileType) {
    // Aqui você pode redirecionar para páginas específicas ou mostrar conteúdo personalizado
    switch(profileType) {
        case 'micro':
            alert('Redirecionando para conteúdo para Microempreendedores...');
            // window.location.href = 'microempreendedor.html';
            break;
        case 'pequeno':
            alert('Redirecionando para conteúdo para Pequenos Negócios...');
            // window.location.href = 'pequeno-negocio.html';
            break;
    }
    
    // Voltar ao estado inicial após 2 segundos (apenas para demonstração)
    setTimeout(() => {
        cardSelection.style.display = 'none';
        cardInitial.style.display = 'block';
    }, 2000);
}

// Fechar o card de seleção ao clicar fora dele
document.addEventListener('click', function(e) {
    if (!starterCard.contains(e.target) && cardSelection.style.display === 'block') {
        cardSelection.style.display = 'none';
        cardInitial.style.display = 'block';
    }
});

// Efeito de destaque nas seções ao scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar observador às seções
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Aplicar observador aos cards
document.querySelectorAll('.objective-card, .solution-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
