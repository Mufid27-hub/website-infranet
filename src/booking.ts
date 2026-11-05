/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookingDraft, FormErrors, NetworkDevice } from './types.ts';
import { TIME_SLOTS, VENDOR_CONFIG } from './config.ts';

/**
 * Format today's local date as YYYY-MM-DD
 */
export function getTodayLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format date string (YYYY-MM-DD) to Indonesian formatted date
 */
export function formatIndonesianDate(dateStr: string): string {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const d = new Date(year, month, day);

  if (isNaN(d.getTime())) return dateStr;

  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Validates booking draft according to SOP rules:
 * - Must reject empty required fields
 * - Must reject past dates based on client local date
 * - Must validate valid calendar date
 */
export function validateBookingForm(draft: BookingDraft, selectedDevice: NetworkDevice | null): FormErrors {
  const errors: FormErrors = {};

  if (!selectedDevice || !draft.serviceId) {
    errors.serviceId = 'Silakan pilih perangkat atau layanan infrastruktur yang dibutuhkan.';
  }

  if (!draft.clientName || draft.clientName.trim().length < 3) {
    errors.clientName = 'Nama pemohon / instansi wajib diisi minimal 3 karakter.';
  }

  const phoneClean = draft.clientContact ? draft.clientContact.replace(/[\s-]/g, '') : '';
  if (!phoneClean) {
    errors.clientContact = 'Nomor telepon / WhatsApp wajib diisi.';
  } else if (!/^[0-9+]{9,16}$/.test(phoneClean)) {
    errors.clientContact = 'Nomor kontak tidak valid (harus berisi 9 - 16 digit angka).';
  }

  if (!draft.systemName || draft.systemName.trim().length < 2) {
    errors.systemName = 'Nama sistem / perangkat (misal: "LAN Kantor Pusat", "Ruang Server Lt. 2") wajib diisi.';
  }

  if (!draft.deviceType || draft.deviceType.trim().length === 0) {
    errors.deviceType = 'Pilih kategori lingkungan atau tipe sistem infrastruktur.';
  }

  if (!draft.installationLocation || draft.installationLocation.trim().length < 5) {
    errors.installationLocation = 'Lokasi / alamat instalasi wajib diisi minimal 5 karakter (gedung, lantai, kota).';
  }

  // Date validation
  if (!draft.preferredDate) {
    errors.preferredDate = 'Tanggal kunjungan wajib dipilih.';
  } else {
    // Validate format and calendar reality
    const match = draft.preferredDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      errors.preferredDate = 'Format tanggal tidak valid. Gunakan format kalender nyata.';
    } else {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const day = parseInt(match[3], 10);

      // Validate month range
      if (month < 1 || month > 12) {
        errors.preferredDate = 'Bulan pada tanggal tidak valid.';
      } else {
        // Validate days in that specific month and leap year
        const maxDays = new Date(year, month, 0).getDate();
        if (day < 1 || day > maxDays) {
          errors.preferredDate = `Tanggal tidak valid untuk bulan ${month} (maksimal ${maxDays} hari).`;
        } else {
          // Compare with today's local date
          const todayStr = getTodayLocalDateString();
          if (draft.preferredDate < todayStr) {
            errors.preferredDate = 'Tanggal kunjungan tidak boleh di masa lampau. Pilih tanggal hari ini atau hari berikutnya.';
          }
        }
      }
    }
  }

  if (!draft.preferredTime || !TIME_SLOTS[draft.preferredTime]) {
    errors.preferredTime = 'Silakan pilih preferensi sesi waktu kunjungan.';
  }

  return errors;
}

/**
 * Builds structured WhatsApp message from draft
 * strictly adhering to SOP: explicitly stating this is an unconfirmed schedule request
 */
export function buildWhatsAppMessage(draft: BookingDraft, device: NetworkDevice): string {
  const timeInfo = TIME_SLOTS[draft.preferredTime] || { label: draft.preferredTime, hours: '' };
  const formattedDate = formatIndonesianDate(draft.preferredDate);

  const lines = [
    `*PERMINTAAN JADWAL INSTALASI / MAINTENANCE INFRANET*`,
    `_Status: Draf Permintaan Jadwal (Belum Dikonfirmasi)_`,
    ``,
    `Halo Tim Support *${VENDOR_CONFIG.vendorName}*,`,
    `Saya ingin mengajukan permohonan jadwal pengerjaan infrastruktur jaringan dengan rincian berikut:`,
    ``,
    `*1. IDENTITAS KLIEN / PEMOHON*`,
    `• Nama Klien/Instansi: ${draft.clientName.trim()}`,
    `• Nomor Kontak/WA: ${draft.clientContact.trim()}`,
    draft.clientEmail ? `• Email: ${draft.clientEmail.trim()}` : null,
    ``,
    `*2. PERANGKAT & LAYANAN DIPILIH*`,
    `• Perangkat: ${device.name}`,
    `• Kategori: ${device.category}`,
    `• Estimasi Durasi: ${device.durationLabel}`,
    `• Estimasi Biaya Layanan: ${device.priceLabel}`,
    ``,
    `*3. DETAIL LINGKUNGAN SISTEM & LOKASI*`,
    `• Nama Sistem: ${draft.systemName.trim()}`,
    `• Tipe Lingkungan: ${draft.deviceType}`,
    `• Lokasi/Alamat Pengerjaan: ${draft.installationLocation.trim()}`,
    draft.optionalNotes ? `• Catatan/Kebutuhan Khusus: ${draft.optionalNotes.trim()}` : `• Catatan Khusus: -`,
    ``,
    `*4. PREFERENSI JADWAL KUNJUNGAN*`,
    `• Tanggal: ${formattedDate}`,
    `• Sesi Waktu: ${timeInfo.label} (${timeInfo.hours})`,
    `_(Catatan: Waktu di atas merupakan preferensi pemohon dan menunggu konfirmasi ketersediaan tim teknisi Infranet)_`,
    ``,
    `Mohon kesediaannya untuk memeriksa jadwal teknisi serta melakukan konfirmasi ketersediaan slot. Terima kasih!`,
  ].filter((line): line is string => line !== null);

  return lines.join('\n');
}

/**
 * Generates WhatsApp URL or null if WhatsApp number is unconfigured
 */
export function generateWhatsAppUrl(draft: BookingDraft, device: NetworkDevice): { url: string | null; message: string; error?: string } {
  const number = VENDOR_CONFIG.whatsappNumber ? VENDOR_CONFIG.whatsappNumber.replace(/\D/g, '') : '';

  const message = buildWhatsAppMessage(draft, device);

  if (!number) {
    return {
      url: null,
      message,
      error: 'Nomor WhatsApp vendor IT belum dikonfigurasi. Pengajuan melalui WhatsApp belum tersedia saat ini.',
    };
  }

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encoded}`;

  return {
    url,
    message,
  };
}
