// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing Aravind Eye Hospital website');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            console.log('Mobile menu toggle clicked');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Navigation link clicked:', this.getAttribute('href'));
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    console.log('Smooth scrolling to:', targetId);
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            console.log('FAQ item clicked');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log('Form data:', formObject);
            
            // Validate form
            if (validateForm(formObject)) {
                // Simulate form submission
                showNotification('Thank you for your message! We will contact you soon.', 'success');
                this.reset();
            }
        });
    }

    // Form validation
    function validateForm(data) {
        console.log('Validating form data');
        
        if (!data.name || data.name.trim().length < 2) {
            showNotification('Please enter a valid name (at least 2 characters)', 'error');
            return false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        if (!data.service) {
            showNotification('Please select a service', 'error');
            return false;
        }
        
        return true;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        console.log('Showing notification:', message, type);
        
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element entering viewport:', entry.target.className);
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .location-card, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Statistics counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = counter.textContent;
            const numericValue = parseInt(target.replace(/[^\d]/g, ''));
            const suffix = target.replace(/[\d]/g, '');
            
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    counter.textContent = numericValue + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        });
    }

    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Hero section visible - starting counter animation');
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }

    // Appointment booking functionality
    const appointmentBtns = document.querySelectorAll('.appointment-btn, .btn-primary');
    appointmentBtns.forEach(btn => {
        if (btn.textContent.includes('Appointment') || btn.getAttribute('href') === '#appointment') {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Appointment booking clicked');
                showAppointmentModal();
            });
        }
    });

    // Appointment modal
    function showAppointmentModal() {
        console.log('Showing appointment modal');
        
        const modal = document.createElement('div');
        modal.className = 'appointment-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Book an Appointment</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="appointmentForm">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="patientName">Full Name *</label>
                                    <input type="text" id="patientName" name="patientName" required>
                                </div>
                                <div class="form-group">
                                    <label for="patientPhone">Phone Number *</label>
                                    <input type="tel" id="patientPhone" name="patientPhone" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="patientEmail">Email Address</label>
                                    <input type="email" id="patientEmail" name="patientEmail">
                                </div>
                                <div class="form-group">
                                    <label for="patientAge">Age *</label>
                                    <input type="number" id="patientAge" name="patientAge" min="1" max="120" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="appointmentService">Service Required *</label>
                                    <select id="appointmentService" name="appointmentService" required>
                                        <option value="">Select Service</option>
                                        <option value="general">General Consultation</option>
                                        <option value="cataract">Cataract Surgery</option>
                                        <option value="retinal">Retinal Services</option>
                                        <option value="glaucoma">Glaucoma Treatment</option>
                                        <option value="refractive">Refractive Surgery</option>
                                        <option value="pediatric">Pediatric Care</option>
                                        <option value="emergency">Emergency Care</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="appointmentLocation">Preferred Location *</label>
                                    <select id="appointmentLocation" name="appointmentLocation" required>
                                        <option value="">Select Location</option>
                                        <option value="madurai">Madurai (Main Campus)</option>
                                        <option value="chennai">Chennai</option>
                                        <option value="coimbatore">Coimbatore</option>
                                        <option value="tirunelveli">Tirunelveli</option>
                                        <option value="tirupati">Tirupati</option>
                                        <option value="pondicherry">Pondicherry</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="appointmentDate">Preferred Date *</label>
                                    <input type="date" id="appointmentDate" name="appointmentDate" required>
                                </div>
                                <div class="form-group">
                                    <label for="appointmentTime">Preferred Time *</label>
                                    <select id="appointmentTime" name="appointmentTime" required>
                                        <option value="">Select Time</option>
                                        <option value="09:00">9:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="14:00">2:00 PM</option>
                                        <option value="15:00">3:00 PM</option>
                                        <option value="16:00">4:00 PM</option>
                                        <option value="17:00">5:00 PM</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="appointmentNotes">Additional Notes</label>
                                <textarea id="appointmentNotes" name="appointmentNotes" rows="3" placeholder="Please describe your symptoms or concerns..."></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary modal-cancel">Cancel</button>
                                <button type="submit" class="btn btn-primary">Book Appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Modal event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.modal-cancel');
        const overlay = modal.querySelector('.modal-overlay');
        const appointmentForm = modal.querySelector('#appointmentForm');
        
        function closeModal() {
            console.log('Closing appointment modal');
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        // Set minimum date to today
        const dateInput = modal.querySelector('#appointmentDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Handle appointment form submission
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Appointment form submitted');
            
            const formData = new FormData(this);
            const appointmentData = {};
            formData.forEach((value, key) => {
                appointmentData[key] = value;
            });
            
            console.log('Appointment data:', appointmentData);
            
            // Simulate appointment booking
            showNotification('Appointment request submitted successfully! We will contact you within 24 hours to confirm.', 'success');
            closeModal();
        });
    }

    // Add modal styles to document
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .appointment-modal .modal-overlay {
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 20px;
        }
        
        .appointment-modal .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.3s ease;
        }
        
        .appointment-modal .modal-header {
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .appointment-modal .modal-header h2 {
            margin: 0;
            color: #1f2937;
        }
        
        .appointment-modal .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .appointment-modal .modal-body {
            padding: 2rem;
        }
        
        .appointment-modal .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .appointment-modal .form-group {
            margin-bottom: 1rem;
        }
        
        .appointment-modal .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #374151;
        }
        
        .appointment-modal .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @media (max-width: 768px) {
            .appointment-modal .form-row {
                grid-template-columns: 1fr;
            }
            
            .appointment-modal .modal-content {
                margin: 10px;
                max-height: calc(100vh - 20px);
            }
            
            .appointment-modal .modal-header,
            .appointment-modal .modal-body {
                padding: 1.5rem;
            }
        }
    `;
    document.head.appendChild(modalStyles);

    // Emergency contact functionality
    const emergencyBtn = document.createElement('div');
    emergencyBtn.className = 'emergency-btn';
    emergencyBtn.innerHTML = `
        <i class="fas fa-phone"></i>
        <span>Emergency</span>
    `;
    emergencyBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    `;
    
    emergencyBtn.addEventListener('click', function() {
        console.log('Emergency button clicked');
        window.open('tel:+914524356100', '_self');
    });
    
    emergencyBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    emergencyBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(emergencyBtn);

    console.log('Aravind Eye Hospital website initialization complete');
});