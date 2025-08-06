// PA Kitchen Equipments - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to header when scrolled
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Contact info click handlers
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for phone links
            console.log('Calling:', this.textContent);
        });
    });

    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for email links
            console.log('Emailing:', this.textContent);
        });
    });

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service__card, .bestseller__card, .product__category, .customer__card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Hero buttons functionality
    const heroButtons = document.querySelectorAll('.hero__buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Product category hover effects
    const productCategories = document.querySelectorAll('.product__category');
    productCategories.forEach(category => {
        const items = category.querySelectorAll('.category__list li');
        
        category.addEventListener('mouseenter', function() {
            items.forEach(item => {
                item.style.transform = 'translateX(5px)';
            });
        });
        
        category.addEventListener('mouseleave', function() {
            items.forEach(item => {
                item.style.transform = 'translateX(0)';
            });
        });
    });

    // Service card interaction
    const serviceCards = document.querySelectorAll('.service__card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-brand-red)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-card-border)';
        });
    });

    // Bestseller card interaction
    const bestsellerCards = document.querySelectorAll('.bestseller__card');
    bestsellerCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.bestseller__title').textContent;
            console.log('Selected product:', title);
            // Here you could add functionality to show more details, contact form, etc.
        });
    });

    // Statistics counter animation (for overview section)
    const stats = document.querySelectorAll('.stat__number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const text = stat.textContent;
                
                // Simple animation for numbers
                if (text.includes('50+')) {
                    animateNumber(stat, 0, 50, '+');
                } else if (text.includes('7.3%')) {
                    animateNumber(stat, 0, 7.3, '%');
                }
                
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Number animation function
    function animateNumber(element, start, end, suffix = '') {
        const duration = 2000;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            const displayValue = suffix === '%' ? current.toFixed(1) : Math.floor(current);
            
            element.textContent = displayValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Initialize active nav link on page load
    updateActiveNavLink();

    // Add loading complete class to body
    document.body.classList.add('loaded');

    // Console log for debugging
    console.log('PA Kitchen Equipments website loaded successfully');
});

// CSS for active nav link (injected via JavaScript to avoid CSS conflicts)
const style = document.createElement('style');
style.textContent = `
    .nav__link.active {
        color: var(--color-brand-red) !important;
        font-weight: var(--font-weight-semibold);
    }
    
    .category__list li {
        transition: transform var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);
    }
    
    .service__card {
        transition: transform var(--duration-normal) var(--ease-standard), 
                   box-shadow var(--duration-normal) var(--ease-standard),
                   border-color var(--duration-fast) var(--ease-standard);
    }
    
    .bestseller__card {
        cursor: pointer;
        transition: transform var(--duration-normal) var(--ease-standard), 
                   box-shadow var(--duration-normal) var(--ease-standard);
    }
    
    .customer__card {
        transition: background-color var(--duration-fast) var(--ease-standard),
                   transform var(--duration-fast) var(--ease-standard);
    }
    
    .customer__card:hover {
        transform: translateY(-2px);
    }
    
    body.loaded {
        opacity: 1;
    }
    
    @media (max-width: 768px) {
        .fade-in-up {
            animation-delay: 0.1s;
        }
    }
`;
document.head.appendChild(style);

 const phoneNumber = "7030009000"; // 🔁 Replace with your number in international format
    const message = encodeURIComponent("I am connecting as per IBNSU LINK Hello! I would like to know more about your services.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    document.getElementById("whatsapp-icon").addEventListener("click", function () {
      window.open(whatsappUrl, "_blank");
    });