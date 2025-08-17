document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrors();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Form is valid - you would typically send data to server here
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Form validation functions
    function validateForm() {
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('name-error', 'Name is required');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            showError('email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (optional but check format if provided)
        const phone = document.getElementById('phone').value.trim();
        if (phone !== '' && !isValidPhone(phone)) {
            showError('phone-error', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            showError('message-error', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message-error', 'Message should be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
});