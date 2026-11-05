/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modul Penyimpanan Preferensi Non-Sensitif
 * Sesuai SOP arsitektur.md & instruction.md (Zero-Persistence Kebijakan Privasi)
 */

const PREF_KEY_CATEGORY = 'infranet_pref_category';

/**
 * Menyimpan preferensi filter kategori yang dipilih pengunjung
 * TIDAK PERNAH menyimpan nama klien, nomor telepon, alamat, atau topologi jaringan
 */
export function saveCategoryPreference(category) {
  try {
    if (typeof localStorage !== 'undefined' && category) {
      localStorage.setItem(PREF_KEY_CATEGORY, category);
    }
  } catch {
    // Ignore storage errors if disabled
  }
}

export function getCategoryPreference() {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(PREF_KEY_CATEGORY) || 'Semua';
    }
  } catch {
    // Fallback if blocked
  }
  return 'Semua';
}
