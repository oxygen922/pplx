// Interactive elements for the Comet Browser landing page
document.addEventListener('DOMContentLoaded', function() {

    // Add smooth scrolling for anchor links
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

    // Add parallax effect to announcement badge
    const announcementBadge = document.querySelector('.announcement-badge');
    if (announcementBadge) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = 0.5;
            announcementBadge.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and steps
    document.querySelectorAll('.feature-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effect for feature cards with mouse tracking
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Add click tracking for CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const url = this.href;
            const buttonText = this.textContent.trim();

            // Log click event (you can replace this with analytics)
            console.log(`CTA clicked: ${buttonText} -> ${url}`);

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Set up intersection observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        const originalText = stat.textContent;
        if (!isNaN(parseInt(originalText))) {
            statObserver.observe(stat);
        }
    });

    // Add typing effect for the main title (optional)
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle && window.innerWidth > 768) {
        const text = mainTitle.innerHTML;
        mainTitle.innerHTML = '';
        mainTitle.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.innerHTML = text.slice(0, i + 1);
                i++;
                setTimeout(typeWriter, 30);
            }
        };

        setTimeout(typeWriter, 500);
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add copy link functionality for sharing
    function addCopyButton() {
        const shareButton = document.createElement('button');
        shareButton.innerHTML = '📋 Copy Link';
        shareButton.className = 'copy-link-button';
        shareButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-gradient);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
        `;

        shareButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                shareButton.innerHTML = '✅ Copied!';
                shareButton.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

                setTimeout(() => {
                    shareButton.innerHTML = '📋 Copy Link';
                    shareButton.style.background = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy link:', err);
            }
        });

        shareButton.addEventListener('mouseenter', () => {
            shareButton.style.transform = 'translateY(-2px)';
            shareButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        });

        shareButton.addEventListener('mouseleave', () => {
            shareButton.style.transform = '';
            shareButton.style.boxShadow = '';
        });

        document.body.appendChild(shareButton);
    }

    // Add copy button only on mobile devices
    if (window.innerWidth <= 768 && navigator.share === undefined) {
        addCopyButton();
    }

    // Add native share functionality for mobile
    if (navigator.share) {
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', async (e) => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    try {
                        await navigator.share({
                            title: 'Comet Browser - Earn $10 per Referral',
                            text: 'Join the AI browser revolution! Earn $10 for each friend you refer. Get 1 month free Pro with Claude 4.5.',
                            url: window.location.href
                        });
                    } catch (err) {
                        console.log('Share canceled or failed:', err);
                    }
                }
            });
        });
    }

    // Add performance optimization: lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Add CSS for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-nav *:focus {
            outline: 3px solid var(--accent) !important;
            outline-offset: 2px !important;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .copy-link-button {
            font-family: 'Inter', sans-serif;
        }

        body:not(.loaded) {
            opacity: 0;
        }

        body.loaded {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Add error handling for external resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
        console.warn(`Failed to load external resource: ${e.target.src || e.target.href}`);
    }
});

// Add service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the line below when you have a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}