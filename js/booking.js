/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modul Pembentukan Draf WhatsApp & Utilitas Tanggal
 * Sesuai SOP arsitektur.md, instruction.md, dan prd.md
 */

import { VENDOR_CONFIG, TIME_SLOTS } from './config.js';

export function getTodayLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatIndonesianDate(dateStr) {
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

export function validateBookingForm(draft, selectedDevice) {
  const errors = {};

  if (!selectedDevice || !draft.serviceId) {
    errors.serviceId = 'Silakan pilih perangkat atau layanan infrastruktur yang dibutuhkan.';
  }

  if (!draft.clientName || draft.clientName.trim().length < 3) {
    errors.clientName = 'Nama pemohon / instansi wajib diisi minimal 3 karakter.';
  }

  const phoneClean = draft.clientContact ? draft.clientContact.replace(/[\s-]/g, '') : '';
  if (!phoneClean) {
    errors.clientContact = 'Nomor telepon / WhatsApp aktif wajib diisi.';
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

  if (!draft.preferredDate) {
    errors.preferredDate = 'Tanggal kunjungan wajib dipilih.';
  } else {
    const match = draft.preferredDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      errors.preferredDate = 'Format tanggal tidak valid. Gunakan format kalender nyata.';
    } else {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const day = parseInt(match[3], 10);

      if (month < 1 || month > 12) {
        errors.preferredDate = 'Bulan pada tanggal tidak valid.';
      } else {
        const maxDays = new Date(year, month, 0).getDate();
        if (day < 1 || day > maxDays) {
          errors.preferredDate = `Tanggal tidak valid untuk bulan ${month} (maksimal ${maxDays} hari).`;
        } else {
          const todayStr = getTodayLocalDateString();
          if (draft.preferredDate < todayStr) {
            errors.preferredDate = 'Tanggal kunjungan tidak boleh di masa lampau. Pilih tanggal hari ini atau berikutnya.';
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

export function buildWhatsAppMessage(draft, device) {
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
    `_(Catatan: Waktu di atas merupakan preferensi pemohon dan menunggu konfirmasi ketersediaan teknisi Infranet)_`,
    ``,
    `Mohon kesediaannya untuk memeriksa jadwal teknisi serta melakukan konfirmasi ketersediaan slot. Terima kasih!`,
  ].filter((line) => line !== null);

  return lines.join('\n');
}

export function generateWhatsAppUrl(draft, device) {
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
