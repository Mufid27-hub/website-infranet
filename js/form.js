/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modul Pengelolaan State, Validasi, dan Event Formulir
 * Sesuai SOP arsitektur.md & instruction.md
 */

import { NETWORK_DEVICES } from './data.js';
import { DEVICE_SYSTEM_TYPES, TIME_SLOTS, VENDOR_CONFIG } from './config.js';
import {
  getTodayLocalDateString,
  validateBookingForm,
  formatIndonesianDate,
  generateWhatsAppUrl,
} from './booking.js';

export class BookingFormController {
  constructor() {
    this.draft = {
      serviceId: NETWORK_DEVICES[0].id,
      clientName: '',
      clientContact: '',
      clientEmail: '',
      systemName: '',
      deviceType: DEVICE_SYSTEM_TYPES[0],
      installationLocation: '',
      preferredDate: getTodayLocalDateString(),
      preferredTime: 'PAGI',
      optionalNotes: '',
    };

    this.selectedDevice = NETWORK_DEVICES[0];
    this.isReviewed = false;
    this.errors = {};

    this.initElements();
    this.bindEvents();
    this.renderSelectedDeviceBanner();
  }

  initElements() {
    this.form = document.getElementById('booking-form');
    this.serviceSelect = document.getElementById('serviceId');
    this.clientNameInput = document.getElementById('clientName');
    this.clientContactInput = document.getElementById('clientContact');
    this.clientEmailInput = document.getElementById('clientEmail');
    this.systemNameInput = document.getElementById('systemName');
    this.deviceTypeSelect = document.getElementById('deviceType');
    this.installationLocationInput = document.getElementById('installationLocation');
    this.preferredDateInput = document.getElementById('preferredDate');
    this.optionalNotesInput = document.getElementById('optionalNotes');
    this.timeSlotRadios = document.querySelectorAll('input[name="preferredTime"]');

    this.reviewSummaryContainer = document.getElementById('review-summary-container');
    this.btnReview = document.getElementById('btn-review-draft');
    this.btnReset = document.getElementById('btn-reset-form');
    this.btnOpenWa = document.getElementById('btn-open-wa');
    this.btnCopyDraft = document.getElementById('btn-copy-draft');
    this.copyFeedback = document.getElementById('copy-feedback');

    // Populate device options in select dropdown
    if (this.serviceSelect) {
      this.serviceSelect.innerHTML = '<option value="">-- Pilih Salah Satu Perangkat (20 Pilihan) --</option>';
      NETWORK_DEVICES.forEach((d) => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = `[${d.category}] ${d.name} - ${d.priceLabel}`;
        if (d.id === this.draft.serviceId) opt.selected = true;
        this.serviceSelect.appendChild(opt);
      });
    }

    // Populate device system types
    if (this.deviceTypeSelect) {
      this.deviceTypeSelect.innerHTML = '';
      DEVICE_SYSTEM_TYPES.forEach((t) => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        this.deviceTypeSelect.appendChild(opt);
      });
    }

    // Set date input min attribute to today's local date
    if (this.preferredDateInput) {
      this.preferredDateInput.min = getTodayLocalDateString();
      this.preferredDateInput.value = this.draft.preferredDate;
    }
  }

  bindEvents() {
    // Listen to changes on all inputs and invalidate review state (SOP requirement)
    const inputs = [
      this.clientNameInput,
      this.clientContactInput,
      this.clientEmailInput,
      this.systemNameInput,
      this.deviceTypeSelect,
      this.installationLocationInput,
      this.preferredDateInput,
      this.optionalNotesInput,
    ];

    inputs.forEach((input) => {
      if (!input) return;
      input.addEventListener('input', (e) => {
        const field = e.target.id;
        this.draft[field] = e.target.value;
        this.invalidateReviewState();
        this.clearFieldError(field);
      });
    });

    if (this.serviceSelect) {
      this.serviceSelect.addEventListener('change', (e) => {
        const id = e.target.value;
        this.setDeviceById(id);
        this.invalidateReviewState();
        this.clearFieldError('serviceId');
      });
    }

    if (this.timeSlotRadios) {
      this.timeSlotRadios.forEach((radio) => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            this.draft.preferredTime = e.target.value;
            this.invalidateReviewState();
          }
        });
      });
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleReviewSubmit();
      });
    }

    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        this.handleResetForm();
      });
    }

    if (this.btnOpenWa) {
      this.btnOpenWa.addEventListener('click', () => {
        this.handleOpenWhatsApp();
      });
    }

    if (this.btnCopyDraft) {
      this.btnCopyDraft.addEventListener('click', () => {
        this.handleCopyDraft();
      });
    }
  }

  setDeviceById(id) {
    this.draft.serviceId = id;
    const found = NETWORK_DEVICES.find((d) => d.id === id) || null;
    this.selectedDevice = found;
    if (this.serviceSelect) {
      this.serviceSelect.value = id;
    }
    this.renderSelectedDeviceBanner();
    this.invalidateReviewState();
  }

  renderSelectedDeviceBanner() {
    const bannerImg = document.getElementById('selected-device-img');
    const bannerName = document.getElementById('selected-device-name');
    const bannerMeta = document.getElementById('selected-device-meta');

    if (!bannerName || !bannerMeta) return;

    if (this.selectedDevice) {
      bannerName.textContent = this.selectedDevice.name;
      bannerMeta.textContent = `${this.selectedDevice.priceLabel} · Est. ${this.selectedDevice.durationLabel}`;
      if (bannerImg) {
        bannerImg.src = this.selectedDevice.image;
        bannerImg.alt = this.selectedDevice.imageAlt;
        bannerImg.classList.remove('hidden');
      }
    } else {
      bannerName.textContent = 'Belum Ada Perangkat yang Dipilih';
      bannerMeta.textContent = 'Silakan pilih dari katalog atau dropdown di bawah';
      if (bannerImg) bannerImg.classList.add('hidden');
    }
  }

  invalidateReviewState() {
    this.isReviewed = false;
    if (this.reviewSummaryContainer) {
      this.reviewSummaryContainer.classList.add('hidden');
    }
  }

  clearFieldError(fieldName) {
    const errEl = document.getElementById(`${fieldName}-error`);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.add('hidden');
    }
    const input = document.getElementById(fieldName);
    if (input) {
      input.removeAttribute('aria-invalid');
      input.classList.remove('input-error');
    }
  }

  showFieldError(fieldName, message) {
    const errEl = document.getElementById(`${fieldName}-error`);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.remove('hidden');
    }
    const input = document.getElementById(fieldName);
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('input-error');
    }
  }

  handleReviewSubmit() {
    // Validate form
    this.errors = validateBookingForm(this.draft, this.selectedDevice);

    // Clear all existing error states
    ['serviceId', 'clientName', 'clientContact', 'systemName', 'installationLocation', 'preferredDate'].forEach((f) => {
      this.clearFieldError(f);
    });

    if (Object.keys(this.errors).length > 0) {
      let firstFocused = false;
      Object.keys(this.errors).forEach((field) => {
        this.showFieldError(field, this.errors[field]);
        if (!firstFocused) {
          const el = document.getElementById(field);
          if (el) {
            el.focus();
            firstFocused = true;
          }
        }
      });
      return;
    }

    // Success validation -> Show Review Summary
    this.isReviewed = true;
    this.renderReviewSummary();
    if (this.reviewSummaryContainer) {
      this.reviewSummaryContainer.classList.remove('hidden');
      this.reviewSummaryContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  renderReviewSummary() {
    if (!this.selectedDevice) return;

    // Fill summary fields
    const elDevName = document.getElementById('summary-device-name');
    const elDevMeta = document.getElementById('summary-device-meta');
    const elDevPrice = document.getElementById('summary-device-price');
    const elDate = document.getElementById('summary-date-time');
    const elClientName = document.getElementById('summary-client-name');
    const elClientContact = document.getElementById('summary-client-contact');
    const elSystem = document.getElementById('summary-system-env');
    const elLocation = document.getElementById('summary-location');
    const elNotes = document.getElementById('summary-notes');

    if (elDevName) elDevName.textContent = this.selectedDevice.name;
    if (elDevMeta) elDevMeta.textContent = `${this.selectedDevice.category} (Est. ${this.selectedDevice.durationLabel})`;
    if (elDevPrice) elDevPrice.textContent = this.selectedDevice.priceLabel;
    if (elDate) {
      const slot = TIME_SLOTS[this.draft.preferredTime] || { label: this.draft.preferredTime, hours: '' };
      elDate.textContent = `${formatIndonesianDate(this.draft.preferredDate)} · ${slot.label} (${slot.hours})`;
    }

    if (elClientName) elClientName.textContent = this.draft.clientName;
    if (elClientContact) {
      elClientContact.textContent = this.draft.clientContact + (this.draft.clientEmail ? ` (${this.draft.clientEmail})` : '');
    }
    if (elSystem) elSystem.textContent = `${this.draft.systemName} · ${this.draft.deviceType}`;
    if (elLocation) elLocation.textContent = this.draft.installationLocation;
    if (elNotes) elNotes.textContent = this.draft.optionalNotes || '-';

    // Verify WhatsApp number configured
    const waResult = generateWhatsAppUrl(this.draft, this.selectedDevice);
    const waErrorAlert = document.getElementById('wa-error-alert');
    if (waResult.error) {
      if (waErrorAlert) {
        waErrorAlert.textContent = waResult.error;
        waErrorAlert.classList.remove('hidden');
      }
      if (this.btnOpenWa) this.btnOpenWa.disabled = true;
    } else {
      if (waErrorAlert) waErrorAlert.classList.add('hidden');
      if (this.btnOpenWa) this.btnOpenWa.disabled = false;
    }
  }

  handleOpenWhatsApp() {
    if (!this.selectedDevice) return;
    const result = generateWhatsAppUrl(this.draft, this.selectedDevice);
    if (result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    }
  }

  handleCopyDraft() {
    if (!this.selectedDevice) return;
    const result = generateWhatsAppUrl(this.draft, this.selectedDevice);
    if (result.message && navigator.clipboard) {
      navigator.clipboard.writeText(result.message).then(() => {
        if (this.copyFeedback) {
          this.copyFeedback.textContent = 'Draf teks berhasil disalin ke clipboard!';
          this.copyFeedback.classList.remove('hidden');
          setTimeout(() => {
            this.copyFeedback.classList.add('hidden');
          }, 3000);
        }
      });
    }
  }

  handleResetForm() {
    this.draft = {
      serviceId: NETWORK_DEVICES[0].id,
      clientName: '',
      clientContact: '',
      clientEmail: '',
      systemName: '',
      deviceType: DEVICE_SYSTEM_TYPES[0],
      installationLocation: '',
      preferredDate: getTodayLocalDateString(),
      preferredTime: 'PAGI',
      optionalNotes: '',
    };
    this.selectedDevice = NETWORK_DEVICES[0];
    this.isReviewed = false;

    if (this.form) this.form.reset();
    if (this.serviceSelect) this.serviceSelect.value = this.draft.serviceId;
    if (this.deviceTypeSelect) this.deviceTypeSelect.value = this.draft.deviceType;
    if (this.preferredDateInput) this.preferredDateInput.value = this.draft.preferredDate;

    ['serviceId', 'clientName', 'clientContact', 'systemName', 'installationLocation', 'preferredDate'].forEach((f) => {
      this.clearFieldError(f);
    });

    this.renderSelectedDeviceBanner();
    this.invalidateReviewState();
  }
}
