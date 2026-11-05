/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Inisialisasi Aplikasi Utama, Render Katalog, Pencarian & Filter
 * Sesuai SOP arsitektur.md & instruction.md
 */

import { NETWORK_DEVICES, CATEGORIES } from './data.js';
import { saveCategoryPreference, getCategoryPreference } from './storage.js';
import { BookingFormController } from './form.js';

class InfranetApp {
  constructor() {
    this.devices = NETWORK_DEVICES;
    this.selectedCategory = getCategoryPreference() || 'Semua';
    this.searchQuery = '';
    this.activeModalDevice = null;

    this.initDOM();
    this.formController = new BookingFormController();
    this.renderCategoryTabs();
    this.renderCatalog();
    this.bindEvents();
  }

  initDOM() {
    this.catalogGrid = document.getElementById('catalog-grid');
    this.categoryTabsContainer = document.getElementById('category-tabs');
    this.searchInput = document.getElementById('device-search');
    this.resetFilterBtn = document.getElementById('btn-reset-filters');
    this.resultsCounter = document.getElementById('catalog-counter');
    this.emptyState = document.getElementById('catalog-empty-state');
    this.modal = document.getElementById('device-modal');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalSelectBtn = document.getElementById('modal-select-btn');
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderCatalog();
      });
    }

    if (this.resetFilterBtn) {
      this.resetFilterBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }

    const resetEmptyBtn = document.getElementById('btn-reset-empty');
    if (resetEmptyBtn) {
      resetEmptyBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }

    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    if (this.modalSelectBtn) {
      this.modalSelectBtn.addEventListener('click', () => {
        if (this.activeModalDevice) {
          this.selectDevice(this.activeModalDevice);
          this.closeModal();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });

    // Mobile nav toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      // Close on link click
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'Semua';
    saveCategoryPreference('Semua');
    if (this.searchInput) this.searchInput.value = '';
    this.renderCategoryTabs();
    this.renderCatalog();
  }

  renderCategoryTabs() {
    if (!this.categoryTabsContainer) return;
    this.categoryTabsContainer.innerHTML = '';

    CATEGORIES.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `cat-tab-btn ${this.selectedCategory === cat.id ? 'active' : ''}`;
      btn.textContent = cat.label;
      btn.setAttribute('aria-pressed', this.selectedCategory === cat.id ? 'true' : 'false');

      btn.addEventListener('click', () => {
        this.selectedCategory = cat.id;
        saveCategoryPreference(cat.id);
        this.renderCategoryTabs();
        this.renderCatalog();
      });

      this.categoryTabsContainer.appendChild(btn);
    });
  }

  getFilteredDevices() {
    return this.devices.filter((device) => {
      const matchesCategory =
        this.selectedCategory === 'Semua' || device.category === this.selectedCategory;

      const q = this.searchQuery;
      const matchesSearch =
        q === '' ||
        device.name.toLowerCase().includes(q) ||
        device.description.toLowerCase().includes(q) ||
        device.category.toLowerCase().includes(q) ||
        device.specs.some((spec) => spec.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }

  renderCatalog() {
    const filtered = this.getFilteredDevices();

    // Toggle reset filter button visibility
    if (this.resetFilterBtn) {
      if (this.searchQuery !== '' || this.selectedCategory !== 'Semua') {
        this.resetFilterBtn.classList.remove('hidden');
      } else {
        this.resetFilterBtn.classList.add('hidden');
      }
    }

    // Update results counter
    if (this.resultsCounter) {
      this.resultsCounter.innerHTML = `Menampilkan <strong>${filtered.length}</strong> dari ${this.devices.length} perangkat${
        this.selectedCategory !== 'Semua' ? ` pada kategori "${this.selectedCategory}"` : ''
      }`;
    }

    if (!this.catalogGrid) return;
    this.catalogGrid.innerHTML = '';

    if (filtered.length === 0) {
      if (this.emptyState) this.emptyState.classList.remove('hidden');
      return;
    }

    if (this.emptyState) this.emptyState.classList.add('hidden');

    filtered.forEach((device) => {
      const isSelected = this.formController.selectedDevice?.id === device.id;

      const card = document.createElement('article');
      card.className = `device-card ${isSelected ? 'selected' : ''}`;

      card.innerHTML = `
        <div class="card-image-box">
          <img src="${device.image}" alt="${device.imageAlt}" loading="lazy" />
          ${isSelected ? '<span class="selected-badge">Terpilih</span>' : ''}
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span>${device.category}</span>
            <span aria-hidden="true">·</span>
            <span>Est. ${device.durationLabel}</span>
          </div>
          <h3 class="card-title">${device.name}</h3>
          <p class="card-desc">${device.description}</p>
          <div class="card-footer">
            <div class="card-price-box">
              <span class="price-title">Estimasi Tarif Jasa</span>
              <span class="price-val">${device.priceLabel}</span>
            </div>
            <div class="card-actions">
              <button type="button" class="btn-detail" data-id="${device.id}">Detail</button>
              <button type="button" class="btn-select ${isSelected ? 'btn-selected' : ''}" data-id="${device.id}">
                ${isSelected ? 'Terpilih' : 'Pilih Ini'}
              </button>
            </div>
          </div>
        </div>
      `;

      // Event listener for Detail button
      card.querySelector('.btn-detail')?.addEventListener('click', () => {
        this.openModal(device);
      });

      // Event listener for Select button
      card.querySelector('.btn-select')?.addEventListener('click', () => {
        this.selectDevice(device);
      });

      this.catalogGrid.appendChild(card);
    });
  }

  selectDevice(device) {
    this.formController.setDeviceById(device.id);
    this.renderCatalog();
    const resSec = document.getElementById('reservasi');
    if (resSec) {
      resSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openModal(device) {
    this.activeModalDevice = device;
    if (!this.modal) return;

    document.getElementById('modal-device-category').textContent = device.category;
    document.getElementById('modal-device-title').textContent = device.name;
    document.getElementById('modal-device-img').src = device.image;
    document.getElementById('modal-device-img').alt = device.imageAlt;
    document.getElementById('modal-device-price').textContent = device.priceLabel;
    document.getElementById('modal-device-duration').textContent = device.durationLabel;
    document.getElementById('modal-device-use').textContent = device.recommendedUse;
    document.getElementById('modal-device-desc').textContent = device.description;

    const specsList = document.getElementById('modal-device-specs');
    if (specsList) {
      specsList.innerHTML = '';
      device.specs.forEach((s) => {
        const li = document.createElement('li');
        li.textContent = s;
        specsList.appendChild(li);
      });
    }

    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    document.body.style.overflow = 'unset';
    this.activeModalDevice = null;
  }
}

// Bootstrap once DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new InfranetApp());
} else {
  new InfranetApp();
}
