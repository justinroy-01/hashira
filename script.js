// Entry Animation Controller
document.addEventListener('DOMContentLoaded', () => {
    // Hide main content initially
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'none';
    
    // Show main content after entry animation
    setTimeout(() => {
        mainContent.style.display = 'block';
    }, 2500);
    
    // Remove entry animation element after it completes
    setTimeout(() => {
        const entryAnimation = document.getElementById('entry-animation');
        if (entryAnimation) {
            entryAnimation.remove();
        }
    }, 3000);
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Intersection Observer for Scroll Animations
function initializeScrollAnimations() {
    // Hero Section Observer
    const heroContent = document.querySelector('.hero-content');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                heroObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -150px 0px'
    });
    
    if (heroContent) {
        heroObserver.observe(heroContent);
    }
    
    // Event Cards Observer - Sequential Animation
    const eventCards = document.querySelectorAll('.event-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Get the index of the card in the NodeList
                const cardIndex = Array.from(eventCards).indexOf(entry.target);
                
                // Delay each card's animation based on its index
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, cardIndex * 200); // 200ms delay between each card
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    eventCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Smooth scroll for anchor links
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

// Add mouse movement effect for particles
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add button click animation
document.querySelectorAll('.event-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .event-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(233, 216, 166, 0.4);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
