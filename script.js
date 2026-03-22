<<<<<<< HEAD
/**
 * S R Sanjeevini Portfolio - Main JavaScript
 * Features: Dark mode, smooth scrolling, animations, mobile nav, scroll-to-top
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initTheme();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initScrollToTop();
    initActiveNavLinks();
    initSkillProgressAnimation();
});

/* ============================================
   THEME MANAGEMENT (Dark/Light Mode)
   ============================================ */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const html = document.documentElement;

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeIcon, savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);

        // Add rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional - uncomment if desired)
        // if (currentScroll > lastScroll && currentScroll > 100) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS (Reveal on Scroll)
   ============================================ */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on element index for staggered effect
                const index = Array.from(revealElements).indexOf(entry.target);
                const delay = index % 3 * 100; // Stagger every 3 elements

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                // Unobserve after revealing
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   ACTIVE NAV LINKS (Highlight on Scroll)
   ============================================ */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
}

/* ============================================
   SKILL PROGRESS ANIMATION
   ============================================ */
function initSkillProgressAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const targetWidth = progressBar.style.width;

                // Reset width to 0 and animate to target
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 200);

                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillCards.forEach(card => skillObserver.observe(card));
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add parallax effect to hero shapes (subtle)
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16));

// Typing effect for code editor (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Preload critical resources
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate skill progress bars if they're already in view on load
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Performance: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const shapes = document.querySelectorAll('.shape');

    if (document.hidden) {
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'paused';
        });
    } else {
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'running';
        });
    }
});

// Console greeting
console.log('%c👋 Hello there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome to S R Sanjeevini\'s portfolio website!', 'font-size: 14px; color: #64748b;');
console.log('%cFeel free to explore the code. 🚀', 'font-size: 14px; color: #64748b;');
document.addEventListener("DOMContentLoaded", () => {
    console.log("JS WORKING");
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            try {
                const response = await fetch("http://127.0.0.1:5000/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });

                const result = await response.text();
                alert(result);
                form.reset();

                loadMessages();

            } catch (error) {
                console.error("Error:", error);
                alert("something went wrong!");
            }
        });
    }
    async function loadMessages() {
        try {
            const res = await fetch("http://127.0.0.1:5000/messages");
            const data = await res.json();

            const container = document.getElementById("messageList");
            if (!container) return;

            container.innerHTML = "";

            data.forEach(msg => {
                const div = document.createElement("div");

                div.innerHTML = `
  <h4>${msg.name}</h4>
  <p>${msg.email}</p>
  <p>${msg.message}</p>

  <button onclick="deleteMsg(${msg.id})">Delete</button>
`;
                container.appendChild(div);
            });

        }
        catch (err) {
            console.error(err);
        }
    }

    window.deleteMsg = function (id) {
        fetch(`http://127.0.0.1:5000/delete/${id}`)
            .then(() => loadMessages());
    }
    loadMessages();
});
=======
/**
 * S R Sanjeevini Portfolio - Main JavaScript
 * Features: Dark mode, smooth scrolling, animations, mobile nav, scroll-to-top
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initTheme();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initScrollToTop();
    initActiveNavLinks();
    initSkillProgressAnimation();
});

/* ============================================
   THEME MANAGEMENT (Dark/Light Mode)
   ============================================ */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const html = document.documentElement;

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeIcon, savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);

        // Add rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional - uncomment if desired)
        // if (currentScroll > lastScroll && currentScroll > 100) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS (Reveal on Scroll)
   ============================================ */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on element index for staggered effect
                const index = Array.from(revealElements).indexOf(entry.target);
                const delay = index % 3 * 100; // Stagger every 3 elements

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                // Unobserve after revealing
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   ACTIVE NAV LINKS (Highlight on Scroll)
   ============================================ */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
}

/* ============================================
   SKILL PROGRESS ANIMATION
   ============================================ */
function initSkillProgressAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const targetWidth = progressBar.style.width;

                // Reset width to 0 and animate to target
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 200);

                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillCards.forEach(card => skillObserver.observe(card));
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add parallax effect to hero shapes (subtle)
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16));

// Typing effect for code editor (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Preload critical resources
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate skill progress bars if they're already in view on load
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Performance: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const shapes = document.querySelectorAll('.shape');

    if (document.hidden) {
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'paused';
        });
    } else {
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'running';
        });
    }
});

// Console greeting
console.log('%c👋 Hello there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome to S R Sanjeevini\'s portfolio website!', 'font-size: 14px; color: #64748b;');
console.log('%cFeel free to explore the code. 🚀', 'font-size: 14px; color: #64748b;');
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("messageForm");

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            console.log(name, email, message);

            if (!name || !email || !message) {
                alert("Please fill all fields");
                return;
            }

            // 🔥 PUT YOUR FIREBASE addDoc() CODE HERE

            alert("Message Sent Successfully!");
            form.reset();
        });
    }
});

>>>>>>> 9cb8ad6d2b93cb8753f9e9fb2bdeccc805e03bb5
