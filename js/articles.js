// Articles Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Articles Page Loaded Successfully!');
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize navbar scroll effect
    initNavbarScrollEffect();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize article interactions
    initArticleInteractions();
});

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
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
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.floating-navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

// Newsletter Form Handling
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.subscribe-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Show success message
                showNotification('Terima kasih! Anda berhasil berlangganan newsletter kami.', 'success');
                
                // Clear form
                emailInput.value = '';
                
                // In a real application, you would send this to your backend
                console.log('Newsletter subscription:', email);
            } else {
                showNotification('Mohon masukkan email yang valid.', 'error');
            }
        });
    }
}

// Article Interactions
function initArticleInteractions() {
    // Add click event to article cards
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on links or buttons
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
                e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // In a real application, this would navigate to the full article
            console.log('Article clicked:', this.querySelector('.article-title')?.textContent);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click event to read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const articleTitle = this.closest('.article-card').querySelector('.article-title').textContent;
            showNotification(`Membuka artikel: ${articleTitle}`, 'info');
            
            // In a real application, this would navigate to the full article
            console.log('Read more clicked for:', articleTitle);
        });
    });
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Set background color based on type
    let bgColor = '#17a2b8'; // info
    if (type === 'success') bgColor = '#28a745';
    if (type === 'error') bgColor = '#dc3545';
    if (type === 'warning') bgColor = '#ffc107';
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Tip Card Interactions
function initTipCardInteractions() {
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach(card => {
        card.addEventListener('click', function() {
            const tipTitle = this.querySelector('h3').textContent;
            showNotification(`Tip: ${tipTitle}`, 'info');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Culture Card Interactions
function initCultureCardInteractions() {
    const cultureCards = document.querySelectorAll('.culture-card');
    
    cultureCards.forEach(card => {
        card.addEventListener('click', function() {
            const cultureTitle = this.querySelector('h3').textContent;
            showNotification(`Budaya: ${cultureTitle}`, 'info');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Search Functionality (if needed)
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const articleCards = document.querySelectorAll('.article-card');
            
            articleCards.forEach(card => {
                const title = card.querySelector('.article-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
                const category = card.querySelector('.article-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Filter by Category (if needed)
function initCategoryFilter() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const articleCards = document.querySelectorAll('.article-card');
            
            articleCards.forEach(card => {
                const category = card.querySelector('.article-category').textContent;
                
                if (selectedCategory === 'all' || category === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Reading Time Calculator
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
}

// Add reading time to articles
function addReadingTime() {
    const articleExcerpts = document.querySelectorAll('.article-excerpt');
    
    articleExcerpts.forEach(excerpt => {
        const readingTime = calculateReadingTime(excerpt.textContent);
        const readingTimeElement = document.createElement('span');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
        readingTimeElement.style.cssText = `
            color: #666;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
        `;
        
        excerpt.appendChild(readingTimeElement);
    });
}

// Share Article Functionality
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-article');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const articleTitle = this.closest('.article-card').querySelector('.article-title').textContent;
            const shareUrl = window.location.href;
            
            // In a real application, this would open share dialog
            if (navigator.share) {
                navigator.share({
                    title: articleTitle,
                    url: shareUrl
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                showNotification('Fitur share akan segera hadir!', 'info');
            }
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initNewsletterForm();
    initArticleInteractions();
    initTipCardInteractions();
    initCultureCardInteractions();
    initSearch();
    initCategoryFilter();
    initLazyLoading();
    addReadingTime();
    initShareButtons();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Add CSS for notifications
    addNotificationStyles();
});

// Add notification styles
function addNotificationStyles() {
    const styles = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            font-size: 18px;
        }
        
        .notification-content span {
            font-size: 14px;
            font-weight: 500;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
            }
            to {
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(400px);
            }
        }
        
        .reading-time {
            color: #666;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

