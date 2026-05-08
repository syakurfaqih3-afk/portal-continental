// booking.js - The Continental Booking System
// Author: Continental Development Team
// Version: 1.0.0

class ContinentalBooking {
    constructor() {
        this.bookings = [];
        this.currentTab = 'accommodation';
        this.init();
    }

    init() {
        this.loadBookings();
        this.setupEventListeners();
        this.setupFormValidations();
        this.updateStats();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.textContent.toLowerCase().split(' ')[1]);
            });
        });

        // Form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission(e.target);
            });
        });

        // Real-time validation
        document.querySelectorAll('.form-input, .form-select').forEach(input => {
            input.addEventListener('blur', (e) => this.validateField(e.target));
            input.addEventListener('input', (e) => this.clearFieldError(e.target));
        });
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active class from buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.classList.add('active');
            this.currentTab = tabName;
        }

        // Add active class to clicked button
        event.target.classList.add('active');
    }

    setupFormValidations() {
        // Minimum guest validation for floor booking
        const guestInput = document.querySelector('input[placeholder*="jumlah"]');
        if (guestInput) {
            guestInput.addEventListener('input', (e) => {
                const bookingType = document.querySelector('select').value;
                if (bookingType.includes('Floor') && parseInt(e.target.value) < 10) {
                    this.showFieldError(e.target, 'Minimum 10 orang untuk floor booking');
                } else {
                    this.clearFieldError(e.target);
                }
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Field ini wajib diisi';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Format email tidak valid';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\-\(\)\s]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Format nomor telepon tidak valid';
            }
        }

        // Number validation
        if (field.type === 'number' && value) {
            const min = field.getAttribute('min');
            if (min && parseInt(value) < parseInt(min)) {
                isValid = false;
                errorMessage = `Minimum nilai adalah ${min}`;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ff4757';
        field.style.boxShadow = '0 0 0 2px rgba(255, 71, 87, 0.2)';

        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.color = '#ff4757';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.style.borderColor = '#d4af37';
        field.style.boxShadow = 'none';

        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleBookingSubmission(form) {
        const formData = new FormData(form);
        const bookingData = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            category: this.currentTab,
            status: 'pending'
        };

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            bookingData[key] = value;
        }

        // Validate all fields
        let isFormValid = true;
        form.querySelectorAll('.form-input, .form-select').forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Mohon lengkapi semua field dengan benar', 'error');
            return;
        }

        // Calculate total price
        bookingData.totalPrice = this.calculatePrice(bookingData);

        // Save booking
        this.saveBooking(bookingData);

        // Show success message
        this.showBookingConfirmation(bookingData);

        // Reset form
        form.reset();

        // Update stats
        this.updateStats();
    }

    calculatePrice(data) {
        let basePrice = 0;
        let multiplier = 1;

        switch (this.currentTab) {
            case 'accommodation':
                if (data['tipe-booking']?.includes('Hotel Room')) {
                    basePrice = 100000;
                    multiplier = parseInt(data.durasi || 1);
                } else if (data['tipe-booking']?.includes('Floor')) {
                    basePrice = 50000;
                    multiplier = parseInt(data.durasi || 1);
                }
                break;

            case 'casino':
                basePrice = 50000;
                multiplier = parseInt(data.durasi || 1);
                break;

            case 'fnb':
                const menuType = data['pilih-menu'] || '';
                if (menuType.includes('Main Package')) {
                    basePrice = 5000;
                } else if (menuType.includes('Special Package')) {
                    basePrice = 10000;
                }
                multiplier = parseInt(data['jumlah-tamu'] || 1);
                break;

            case 'spa':
                const spaType = data['tipe-paket'] || '';
                if (spaType.includes('VIP Ladies 30 Menit')) basePrice = 100000;
                else if (spaType.includes('VIP Ladies 60 Menit')) basePrice = 200000;
                else if (spaType.includes('Spa Package 10 Menit')) basePrice = 130000;
                else if (spaType.includes('Spa Package 30 Menit')) basePrice = 390000;
                else if (spaType.includes('Spa Package 60 Menit')) basePrice = 700000;
                break;
        }

        return basePrice * multiplier;
    }

    saveBooking(booking) {
        this.bookings.push(booking);
        localStorage.setItem('continental_bookings', JSON.stringify(this.bookings));
    }

    loadBookings() {
        const saved = localStorage.getItem('continental_bookings');
        if (saved) {
            this.bookings = JSON.parse(saved);
        }
    }

    showBookingConfirmation(booking) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        modal.innerHTML = `
            <div style="
                background: rgba(15, 52, 96, 0.95);
                border: 2px solid #d4af37;
                padding: 40px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                color: #e8d5b7;
            ">
                <h3 style="color: #d4af37; margin-bottom: 20px; font-size: 24px;">✅ Booking Confirmed!</h3>
                <div style="margin-bottom: 20px;">
                    <p><strong>Booking ID:</strong> #${booking.id}</p>
                    <p><strong>Category:</strong> ${booking.category.toUpperCase()}</p>
                    <p><strong>Total Price:</strong> $${booking.totalPrice.toLocaleString()}</p>
                    <p><strong>Status:</strong> Pending Confirmation</p>
                </div>
                <p style="font-size: 14px; margin-bottom: 30px;">
                    Tim Continental akan menghubungi Anda dalam 24 jam untuk konfirmasi.
                </p>
                <button onclick="this.parentNode.parentNode.remove()" style="
                    padding: 12px 30px;
                    background: #d4af37;
                    color: #0f3460;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">OK</button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: '#00d4ff',
            error: '#ff4757',
            info: '#d4af37'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(15, 52, 96, 0.95);
            border: 2px solid ${colors[type]};
            color: #e8d5b7;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 1000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    updateStats() {
        // Update booking stats if elements exist
        const totalBookings = document.getElementById('total-bookings');
        const pendingBookings = document.getElementById('pending-bookings');

        if (totalBookings) {
            totalBookings.textContent = this.bookings.length;
        }

        if (pendingBookings) {
            const pending = this.bookings.filter(b => b.status === 'pending').length;
            pendingBookings.textContent = pending;
        }
    }

    // API Integration methods
    async submitToAPI(bookingData) {
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                throw new Error('API submission failed');
            }
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to local storage if API fails
            return bookingData;
        }
    }

    // Export bookings data
    exportBookings() {
        const dataStr = JSON.stringify(this.bookings, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = `continental_bookings_${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
}

// Initialize booking system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.continentalBooking = new ContinentalBooking();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .field-error {
        animation: shake 0.3s ease;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Global functions for HTML onclick handlers
function switchTab(tabName) {
    if (window.continentalBooking) {
        window.continentalBooking.switchTab(tabName);
    }
}

function exportBookings() {
    if (window.continentalBooking) {
        window.continentalBooking.exportBookings();
    }
}