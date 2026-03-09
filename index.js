document.addEventListener('DOMContentLoaded', () => {

    // ===== LOADER =====
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });

    // ===== CURSEUR PERSONNALISÉ =====
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        const hoverElements = document.querySelectorAll('a, button, .projet-card, .service-card');
        
        hoverElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('hover');
            });
        });
    }

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== MENU MOBILE =====
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        
        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== SMOOTH SCROLL =====
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMATIONS AU SCROLL =====
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const delay = el.dataset.delay || 0;
            
            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay);
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ===== COMPTEUR STATISTIQUES =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.getElementById('resultats');
        
        if (statsSection) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                statsAnimated = true;
                
                statNumbers.forEach((stat) => {
                    const target = parseInt(stat.dataset.target);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    function updateCounter() {
                        current += step;
                        
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target;
                        }
                    }
                    
                    updateCounter();
                });
            }
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();

    // ===== FILTRE PROJETS =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projetCards = document.querySelectorAll('.projet-card');
    
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projetCards.forEach((card) => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach((faq) => {
                faq.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== SLIDER TÉMOIGNAGES =====
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    if (testimonialSlider && dots.length > 0) {
        let currentSlide = 0;
        const totalSlides = dots.length;
        
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                const cardWidth = testimonialSlider.querySelector('.testimonial-card').offsetWidth + 30;
                testimonialSlider.scrollTo({
                    left: cardWidth * index,
                    behavior: 'smooth'
                });
                updateDots();
            });
        });
        
        testimonialSlider.addEventListener('scroll', () => {
            const cardWidth = testimonialSlider.querySelector('.testimonial-card').offsetWidth + 30;
            const scrollPosition = testimonialSlider.scrollLeft;
            currentSlide = Math.round(scrollPosition / cardWidth);
            updateDots();
        });
        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            const cardWidth = testimonialSlider.querySelector('.testimonial-card').offsetWidth + 30;
            testimonialSlider.scrollTo({
                left: cardWidth * currentSlide,
                behavior: 'smooth'
            });
            updateDots();
        }, 5000);
    }

    // ===== FORMULAIRE CONTACT =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            const whatsappMessage = 
                `Bonjour Créa 2.0!\n\n` +   
                `Je suis ${name}.\n` +
                `Email: ${email}\n` +
                `Service souhaité: ${service}\n\n` +
                `Message:\n${message}`;
            
            const whatsappUrl = `https://wa.me/+22952410190?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(whatsappUrl, '_blank');
            
            contactForm.reset();
            
            showNotification('Message envoyé avec succès!');
        });
    }

    // ===== NOTIFICATION =====
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #6c5ce7, #00cec9);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            animation: slideInRight 0.5s ease forwards;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // ===== STYLES ANIMATIONS NOTIFICATION =====
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(notificationStyles);

    // ===== PARALLAX HERO =====
    const heroSection = document.getElementById('hero');
    const spheres = document.querySelectorAll('.gradient-sphere');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (heroSection && scrollY < window.innerHeight) {
            spheres.forEach((sphere, index) => {
                const speed = (index + 1) * 0.1;
                sphere.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
    });

    // ===== EFFET MAGNETIC BUTTONS =====
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-contact');
    
    magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ===== TILT EFFECT SUR CARTES =====
    const tiltCards = document.querySelectorAll('.service-card, .projet-card, .stat-card');
    
    tiltCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===== TEXT TYPING EFFECT =====
    const typingText = document.querySelector('.hero-subtitle span');
    
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 50);
            }
        }
        
        setTimeout(typeText, 2000);
    }

    // ===== LAZY LOADING IMAGES =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach((img) => {
            imageObserver.observe(img);
        });
    }

    // ===== PRELOAD HOVER IMAGES =====
    const projectImages = document.querySelectorAll('.projet-thumbnail img');
    
    projectImages.forEach((img) => {
        const preloadImg = new Image();
        preloadImg.src = img.src;
    });

});