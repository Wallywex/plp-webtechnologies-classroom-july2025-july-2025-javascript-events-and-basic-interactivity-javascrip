// Set the date of the event (Year, Month-1, Day, Hour, Minute)
const eventDate = new Date("2025-10-01T09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  if (timeLeft <= 0) {
    document.querySelector(".timer").innerHTML = "The event has started!";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown();

document.querySelectorAll('.acc-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.parentElement;
    item.classList.toggle('open');

    const body = head.nextElementSibling;
    if(item.classList.contains('open')){
      body.style.display = 'block';
    } else {
      body.style.display = 'none';
    }
  });
});

class EventSignupForm {
    constructor() {
        this.form = document.getElementById('eventSignupForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.btnText = document.getElementById('btnText');
        this.loading = document.getElementById('loading');
        this.successMessage = document.getElementById('successMessage');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        document.getElementById('fullName').addEventListener('blur', () => this.validateName());
        document.getElementById('email').addEventListener('blur', () => this.validateEmail());
        document.getElementById('ticketType').addEventListener('change', () => this.validateTicketType());
        
        // Clear error messages on input
        document.getElementById('fullName').addEventListener('input', () => this.clearError('nameError'));
        document.getElementById('email').addEventListener('input', () => this.clearError('emailError'));
        document.getElementById('ticketType').addEventListener('change', () => this.clearError('ticketError'));
    }

    validateName() {
        const name = document.getElementById('fullName').value.trim();
        const nameError = document.getElementById('nameError');
        
        if (name.length < 2) {
            this.showError('nameError', 'Please enter your full name (at least 2 characters)');
            return false;
        }
        
        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            this.showError('nameError', 'Name should only contain letters, spaces, hyphens, and apostrophes');
            return false;
        }
        
        this.hideError('nameError');
        return true;
    }

    validateEmail() {
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            return false;
        }
        
        this.hideError('emailError');
        return true;
    }

    validateTicketType() {
        const ticketType = document.getElementById('ticketType').value;
        
        if (!ticketType) {
            this.showError('ticketError', 'Please select a ticket type');
            return false;
        }
        
        this.hideError('ticketError');
        return true;
    }

    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error styling to input
        const input = errorElement.previousElementSibling;
        input.style.borderColor = '#e53e3e';
    }

    hideError(errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = 'none';
        
        // Remove error styling from input
        const input = errorElement.previousElementSibling;
        input.style.borderColor = '#e2e8f0';
    }

    clearError(errorId) {
        this.hideError(errorId);
    }

    showLoading() {
        this.submitBtn.disabled = true;
        this.btnText.style.opacity = '0';
        this.loading.style.display = 'block';
    }

    hideLoading() {
        this.submitBtn.disabled = false;
        this.btnText.style.opacity = '1';
        this.loading.style.display = 'none';
    }

    showSuccess() {
        this.successMessage.style.display = 'block';
        this.form.style.display = 'none';
        
        // Auto-hide success message and show form again after 5 seconds
        setTimeout(() => {
            this.successMessage.style.display = 'none';
            this.form.style.display = 'block';
            this.form.reset();
        }, 5000);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isTicketValid = this.validateTicketType();
        
        if (!isNameValid || !isEmailValid || !isTicketValid) {
            return;
        }

        this.showLoading();

        // Simulate API call
        try {
            await this.submitFormData();
            this.showSuccess();
        } catch (error) {
            alert('Registration failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async submitFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            ticketType: document.getElementById('ticketType').value
        };

        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted with data:', formData);
                resolve();
            }, 2000);
        });
    }
}

// Initialize the form when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EventSignupForm();
});