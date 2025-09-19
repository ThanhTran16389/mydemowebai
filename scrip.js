// Smooth Scroll Functionality
// This script adds smooth scrolling behavior when clicking navigation links
// with a 70px offset to account for the fixed header

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links that have href starting with #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each navigation link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Prevent default anchor link behavior
            e.preventDefault();
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (home link)
            if (targetId === '#') {
                return;
            }
            
            // Find the target section element
            const targetSection = document.querySelector(targetId);
            
            // If target section exists, scroll to it smoothly
            if (targetSection) {
                // Get the current scroll position
                const currentScrollY = window.pageYOffset;
                
                // Get the target section's position
                const targetScrollY = targetSection.offsetTop;
                
                // Calculate the scroll position with 70px offset for fixed header
                const offsetPosition = targetScrollY - 70;
                
                // Smooth scroll to the calculated position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Optional: Add active class to navigation links based on scroll position
    // This highlights the current section in the navigation
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        // Get current scroll position with offset
        const scrollPosition = window.pageYOffset + 100;
        
        // Loop through sections to find which one is currently in view
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if section is in viewport
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Listen for scroll events to update active navigation link
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Call once on page load to set initial active state
    updateActiveNavLink();
});

// Additional utility function for programmatic smooth scrolling
// This can be used from other parts of the application
function smoothScrollToSection(sectionId, offset = 70) {
    const targetSection = document.querySelector(sectionId);
    
    if (targetSection) {
        const targetScrollY = targetSection.offsetTop;
        const offsetPosition = targetScrollY - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Export function for use in other scripts (if using modules)
// window.smoothScrollToSection = smoothScrollToSection;

// Form Submission Handler
// Xử lý việc gửi form liên hệ
document.addEventListener('DOMContentLoaded', function() {
    // Tìm form liên hệ
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Thêm event listener cho việc submit form với validation
        contactForm.addEventListener('submit', handleFormSubmission);
    }
});

// Utility function để validate form trước khi gửi
function validateContactForm(form) {
    const requiredFields = ['fullname', 'email'];
    const errors = [];
    
    // Kiểm tra các trường bắt buộc
    requiredFields.forEach(function(fieldName) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field || !field.value.trim()) {
            errors.push(`${fieldName} là trường bắt buộc`);
        }
    });
    
    // Kiểm tra định dạng email
    const emailField = form.querySelector('[name="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            errors.push('Email không đúng định dạng');
        }
    }
    
    return errors;
}

// Enhanced form submission với validation
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const validationErrors = validateContactForm(form);
    
    // Nếu có lỗi validation, hiển thị lỗi
    if (validationErrors.length > 0) {
        alert('Vui lòng kiểm tra lại thông tin:\n' + validationErrors.join('\n'));
        return;
    }
    
    // Nếu validation thành công, xử lý form
    const formData = new FormData(form);
    const formValues = {};
    
    for (let [key, value] of formData.entries()) {
        formValues[key] = value;
    }
    
    const fullName = formValues.fullname || 'Quý khách';
    alert(`Cảm ơn ${fullName}! Chúng tôi sẽ liên hệ sớm.`);
    
    // Xóa form
    form.reset();
    
    console.log('Form submitted successfully:', formValues);
}
