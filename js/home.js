// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

// Initialize carousel
function initCarousel() {
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoSlide();
    }
}

// Show specific slide
function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.9)';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[n]) {
        slides[n].classList.add('active');
        slides[n].style.opacity = '1';
        slides[n].style.transform = 'scale(1)';
    }
    
    // Activate current dot
    if (dots[n]) {
        dots[n].classList.add('active');
    }
}

// Change slide
function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    showSlide(currentSlide);
}

// Go to specific slide
function goToSlide(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

// Auto slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event listeners for carousel controls
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    
    // Add event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index + 1);
        });
    });
    
    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
});

// Modal functionality
const modal = document.getElementById('promoModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Promo data
const promoData = {
    '12.12': {
        title: 'Promo 12.12 - Diskon Hingga 50%',
        description: 'Rayakan hari spesial dengan diskon terbesar tahun ini!',
        details: [
            'Diskon 50% untuk semua menu kopi premium',
            'Berlaku 12-15 Desember 2024',
            'Kode promo: KOPI12',
            'Minimal pembelian Rp 50.000',
            'Tidak dapat digabung dengan promo lain'
        ],
        terms: [
            'Promo berlaku untuk dine-in dan take away',
            'Tidak berlaku untuk delivery',
            'Promo dapat berakhir sewaktu-waktu',
            'Keputusan Kopi Kita bersifat final'
        ]
    },
    'Member': {
        title: 'Promo Member - Buy 2 Get 1 Free',
        description: 'Khusus untuk member setia Kopi Kita!',
        details: [
            'Buy 2 Get 1 Free untuk semua menu',
            'Berlaku setiap hari Senin',
            'Kode promo: MEMBER2X1',
            'Minimal pembelian 2 item',
            'Gratis item dengan harga terendah'
        ],
        terms: [
            'Hanya berlaku untuk member aktif',
            'Tidak dapat digabung dengan promo lain',
            'Berlaku untuk dine-in dan take away',
            'Promo berlaku sampai 31 Desember 2024'
        ]
    },
    'Weekend': {
        title: 'Promo Weekend - Diskon 30% Non-Kopi',
        description: 'Nikmati menu non-kopi dengan harga spesial!',
        details: [
            'Diskon 30% untuk semua menu non-kopi',
            'Berlaku setiap Sabtu dan Minggu',
            'Kode promo: WEEKEND30',
            'Berlaku untuk semua ukuran',
            'Tidak ada minimal pembelian'
        ],
        terms: [
            'Berlaku untuk dine-in dan take away',
            'Tidak berlaku untuk delivery',
            'Tidak dapat digabung dengan promo lain',
            'Promo berlaku sampai 31 Desember 2024'
        ]
    }
};

// Show promo details modal
function showPromoDetails(promoType) {
    const promo = promoData[promoType];
    if (!promo) return;
    
    modalContent.innerHTML = `
        <div class="promo-modal-header">
            <h2><i class="fas fa-fire"></i> ${promo.title}</h2>
            <p class="promo-description">${promo.description}</p>
        </div>
        
        <div class="promo-modal-body">
            <div class="promo-details-section">
                <h3><i class="fas fa-info-circle"></i> Detail Promo</h3>
                <ul class="promo-details-list">
                    ${promo.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </div>
            
            <div class="promo-terms-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Syarat & Ketentuan</h3>
                <ul class="promo-terms-list">
                    ${promo.terms.map(term => `<li>${term}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="promo-modal-footer">
            <button class="btn btn-primary" onclick="closeModal()">
                <i class="fas fa-check"></i>
                Saya Mengerti
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with close button
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Google Maps functionality (dummy)
function openMaps() {
    // In a real implementation, this would open Google Maps
    // For now, we'll show an alert
    alert('Fitur ini akan membuka Google Maps dengan lokasi Kopi Kita di Jl. Kopi No. 123, Jakarta Selatan.');
    
    // You can also use this to open actual Google Maps:
    // const address = 'Jl. Kopi No. 123, Jakarta Selatan, DKI Jakarta 12345';
    // const encodedAddress = encodeURIComponent(address);
    // window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
}

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.floating-navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile navigation toggle
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
}

// Add CSS for modal styling
const modalStyles = `
    .promo-modal-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #f0f0f0;
    }
    
    .promo-modal-header h2 {
        color: #5a3e2b;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }
    
    .promo-modal-header h2 i {
        color: #b6895b;
    }
    
    .promo-description {
        color: #666;
        font-size: 1.1rem;
    }
    
    .promo-modal-body {
        margin-bottom: 30px;
    }
    
    .promo-details-section,
    .promo-terms-section {
        margin-bottom: 25px;
    }
    
    .promo-details-section h3,
    .promo-terms-section h3 {
        color: #5a3e2b;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.2rem;
    }
    
    .promo-details-section h3 i {
        color: #28a745;
    }
    
    .promo-terms-section h3 i {
        color: #ffc107;
    }
    
    .promo-details-list,
    .promo-terms-list {
        list-style: none;
        padding-left: 0;
    }
    
    .promo-details-list li,
    .promo-terms-list li {
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
        color: #666;
        position: relative;
        padding-left: 25px;
    }
    
    .promo-details-list li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #28a745;
        font-weight: bold;
    }
    
    .promo-terms-list li:before {
        content: '•';
        position: absolute;
        left: 0;
        color: #ffc107;
        font-weight: bold;
        font-size: 1.5rem;
    }
    
    .promo-modal-footer {
        text-align: center;
        padding-top: 20px;
        border-top: 2px solid #f0f0f0;
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kopi Kita Home Page Loaded Successfully!');
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Initialize any additional features here
    initCarousel();
});

