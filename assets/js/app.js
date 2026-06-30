document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Sticky Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSection = '';
        const sections = document.querySelectorAll('section, header');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const body = item.querySelector('.faq-body');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-body').style.maxHeight = null;
                }
            });
            
            if (isActive) {
                item.classList.remove('active');
                body.style.maxHeight = null;
            } else {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Booking Form Validation & Modal Feedback
    const bookingForm = document.getElementById('bookingForm');
    const modalOverlay = document.getElementById('successModalOverlay');
    const modalCloseBtn = document.getElementById('closeModalBtn');
    const modalMessage = document.getElementById('successModalMessage');

    if (bookingForm && modalOverlay && modalCloseBtn) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form Fields
            const nameInput = document.getElementById('formName');
            const mobileInput = document.getElementById('formMobile');
            const emailInput = document.getElementById('formEmail');
            const travelersInput = document.getElementById('formTravelers');
            const dateInput = document.getElementById('formDate');

            // Clear previous errors
            document.querySelectorAll('.form-error-msg').forEach(el => el.remove());
            
            let isValid = true;

            // Helper function to show error
            const showError = (inputElement, message) => {
                isValid = false;
                const error = document.createElement('span');
                error.className = 'form-error-msg';
                error.style.color = '#800000';
                error.style.fontSize = '12px';
                error.style.fontWeight = '500';
                error.style.marginTop = '4px';
                error.style.paddingLeft = '4px';
                error.innerText = message;
                inputElement.parentNode.appendChild(error);
                inputElement.style.borderColor = '#800000';
            };

            // Reset borders
            [nameInput, mobileInput, emailInput, travelersInput, dateInput].forEach(input => {
                if (input) input.style.borderColor = 'rgba(128, 0, 0, 0.15)';
            });

            // Validations
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
            }

            const phonePattern = /^\+?[0-9\s-]{10,14}$/;
            if (!mobileInput.value.trim()) {
                showError(mobileInput, 'Mobile number is required');
            } else if (!phonePattern.test(mobileInput.value.trim())) {
                showError(mobileInput, 'Please enter a valid phone number (min 10 digits)');
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address');
            }

            if (!travelersInput.value || parseInt(travelersInput.value) < 1) {
                showError(travelersInput, 'Please select 1 or more travelers');
            }

            if (!dateInput.value) {
                showError(dateInput, 'Travel date is required');
            } else {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0,0,0,0);
                if (selectedDate < today) {
                    showError(dateInput, 'Travel date must be in the future');
                }
            }

            if (isValid) {
                // Determine API URL based on host/port
                const isLocalhost5000 = window.location.port === '5000';
                const apiUrl = isLocalhost5000 ? '/api/inquiries' : 'http://localhost:5000/api/inquiries';

                const submitBtn = bookingForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;

                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Submitting Request...';

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameInput.value.trim(),
                        phone: mobileInput.value.trim(),
                        email: emailInput.value.trim(),
                        travelers: parseInt(travelersInput.value, 10),
                        travelDate: dateInput.value
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errData => {
                            throw new Error(errData.message || 'Submission failed');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    // Populate Modal content
                    modalMessage.innerHTML = `Thank you, <strong>${nameInput.value.trim()}</strong>! Your pilgrimage request has been successfully received. A luxury travel concierge will call you at <strong>${mobileInput.value.trim()}</strong> within 2 hours to personalize your itinerary.`;
                    
                    // Show modal
                    modalOverlay.classList.add('active');
                    
                    // Reset form
                    bookingForm.reset();
                })
                .catch(error => {
                    console.error('Submission error:', error);
                    // Show validation or connection error at the bottom of the form
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'form-error-msg';
                    errorSpan.style.color = '#800000';
                    errorSpan.style.fontSize = '14px';
                    errorSpan.style.fontWeight = '600';
                    errorSpan.style.marginTop = '10px';
                    errorSpan.style.display = 'block';
                    errorSpan.style.textAlign = 'center';
                    errorSpan.innerText = error.message || 'An error occurred. Please try again.';
                    bookingForm.appendChild(errorSpan);
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
            }
        });

        // Close Modal
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Close Modal when clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
});
