// Business Website Configuration
// Edit this file to customize your website content and settings

const CONFIG = {
    // Business Information
    business: {
        name: "Moonlit Charms",
        tagline: "Timeless Beauty, Moonlit Elegance",
        description: "Moonlit Charms is a handcrafted jewelry and accessory brand that celebrates individuality through elegant, self-made designs. Specializing in bracelets, anklets, pendants, and phone charms, each piece is crafted with care and creativity. With a focus on quality, personalization, and charm, Moonlit Charms brings a touch of magic to everyday style.",
        founded: "2025",
        employees: "2",
        clients: "0"
    },

    // Contact Information
    contact: {
        address: "Azara, Guwahati, Assam 781017",
        phone: "+91 8638001078",
        email: "moonlitcharms25@gmail.com",
        hours: "Monday - Friday: 9:10 AM - 6:00 PM"
    },

    // Social Media Links
    social: {
        facebook: "https://facebook.com/yourbusiness",
        twitter: "https://twitter.com/yourbusiness",
        linkedin: "https://linkedin.com/company/yourbusiness",
        instagram: "https://instagram.com/yourbusiness",
        youtube: "https://youtube.com/yourbusiness"
    },

    // Services Offered
    services: [
        {
            title: "Business Consulting",
            description: "Strategic guidance to optimize your business operations and maximize profitability.",
            icon: "fas fa-cogs",
            price: "Starting at $500"
        },
        {
            title: "Digital Solutions",
            description: "Custom software and digital tools to streamline your business processes.",
            icon: "fas fa-laptop-code",
            price: "Starting at $1,000"
        },
        {
            title: "Analytics & Insights",
            description: "Data-driven insights to help you make informed business decisions.",
            icon: "fas fa-chart-bar",
            price: "Starting at $300"
        },
        {
            title: "Security Solutions",
            description: "Comprehensive security measures to protect your business assets.",
            icon: "fas fa-shield-alt",
            price: "Starting at $400"
        },
        {
            title: "24/7 Support",
            description: "Round-the-clock support to ensure your business runs smoothly.",
            icon: "fas fa-headset",
            price: "Starting at $200"
        },
        {
            title: "Growth Strategy",
            description: "Scalable strategies to accelerate your business growth and expansion.",
            icon: "fas fa-rocket",
            price: "Starting at $800"
        }
    ],

    // About Section Content
    about: {
        title: "Your Trusted Business Partner",
        description: "With years of experience in the industry, we understand the challenges businesses face today. Our team of experts is committed to delivering solutions that drive growth and success.",
        features: [
            "Professional Expertise",
            "Innovative Solutions",
            "24/7 Support",
            "Proven Results",
            "Client Satisfaction",
            "Industry Experience"
        ]
    },

    // Hero Section Content
    hero: {
        title: "Transform Your Business",
        subtitle: "We provide innovative solutions to help your business grow and succeed in today's competitive market.",
        primaryButton: "Our Services",
        secondaryButton: "Get Started"
    },

    // Color Scheme (CSS Variables)
    colors: {
        primary: "#2563eb",
        secondary: "#667eea",
        accent: "#764ba2",
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6"
    },

    // SEO Settings
    seo: {
        title: "Your Business Name - Professional Solutions",
        description: "Professional business solutions tailored to your needs. Contact us for expert services and innovative solutions.",
        keywords: "business consulting, digital solutions, analytics, security, growth strategy",
        author: "Your Business Name",
        ogImage: "https://yourwebsite.com/og-image.jpg"
    },

    // Form Settings
    form: {
        enabled: true,
        emailEndpoint: "https://formspree.io/f/your-form-id",
        successMessage: "Message sent successfully! We'll get back to you soon.",
        errorMessage: "Failed to send message. Please try again.",
        requiredFields: ["name", "email", "subject", "message"]
    },

    // Animation Settings
    animations: {
        enabled: true,
        duration: 600,
        easing: "ease-out"
    },

    // Analytics Settings
    analytics: {
        googleAnalytics: "GA_MEASUREMENT_ID",
        facebookPixel: "FACEBOOK_PIXEL_ID",
        linkedinInsight: "LINKEDIN_INSIGHT_TAG"
    },

    // Performance Settings
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        minifyCSS: true,
        minifyJS: true
    }
};

// Function to update website content based on configuration
function updateWebsiteContent() {
    // Update business name
    const businessNameElements = document.querySelectorAll('.nav-logo h2, .footer-section h3');
    businessNameElements.forEach(element => {
        element.textContent = CONFIG.business.name;
    });

    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroTitle) heroTitle.textContent = CONFIG.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = CONFIG.hero.subtitle;

    // Update about section
    const aboutTitle = document.querySelector('.about-text h3');
    const aboutDescription = document.querySelector('.about-text p');
    if (aboutTitle) aboutTitle.textContent = CONFIG.about.title;
    if (aboutDescription) aboutDescription.textContent = CONFIG.about.description;

    // Update contact information
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        const title = item.querySelector('h4');
        const content = item.querySelector('p');
        
        if (icon && title && content) {
            if (title.textContent === 'Address') {
                content.textContent = CONFIG.contact.address;
            } else if (title.textContent === 'Phone') {
                content.textContent = CONFIG.contact.phone;
            } else if (title.textContent === 'Email') {
                content.textContent = CONFIG.contact.email;
            }
        }
    });

    // Update footer contact info
    const footerContact = document.querySelectorAll('.footer-section:last-child p');
    if (footerContact.length >= 3) {
        footerContact[0].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${CONFIG.contact.address}`;
        footerContact[1].innerHTML = `<i class="fas fa-phone"></i> ${CONFIG.contact.phone}`;
        footerContact[2].innerHTML = `<i class="fas fa-envelope"></i> ${CONFIG.contact.email}`;
    }

    // Update social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks.length >= 4) {
        socialLinks[0].href = CONFIG.social.facebook;
        socialLinks[1].href = CONFIG.social.twitter;
        socialLinks[2].href = CONFIG.social.linkedin;
        socialLinks[3].href = CONFIG.social.instagram;
    }

    // Update page title and meta description
    document.title = CONFIG.seo.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = CONFIG.seo.description;
    }
}

// Function to apply color scheme
function applyColorScheme() {
    const root = document.documentElement;
    Object.entries(CONFIG.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });
}

// Function to setup analytics
function setupAnalytics() {
    if (CONFIG.analytics.googleAnalytics && CONFIG.analytics.googleAnalytics !== 'GA_MEASUREMENT_ID') {
        // Google Analytics setup
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.analytics.googleAnalytics}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', CONFIG.analytics.googleAnalytics);
    }
}

// Function to setup form handling
function setupFormHandling() {
    if (CONFIG.form.enabled && CONFIG.form.emailEndpoint) {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.action = CONFIG.form.emailEndpoint;
            contactForm.method = 'POST';
        }
    }
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateWebsiteContent();
    applyColorScheme();
    setupAnalytics();
    setupFormHandling();
    
    // Initialize editor if in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Add editable classes to elements
        document.querySelectorAll('.hero h1').forEach(el => el.classList.add('business-name'));
        document.querySelectorAll('.hero p').forEach(el => el.classList.add('business-tagline'));
        document.querySelectorAll('.contact-info .email').forEach(el => el.classList.add('business-email'));
        document.querySelectorAll('.contact-info .phone').forEach(el => el.classList.add('business-phone'));
    }
    
    console.log('Website configuration loaded successfully!');
    console.log('Business:', CONFIG.business.name);
    console.log('Contact:', CONFIG.contact.email);
});

// Export configuration for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 