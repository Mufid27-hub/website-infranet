/**
 * Konfigurasi Identitas Vendor IT & Nomor WhatsApp Publik
 * Sesuai SOP arsitektur.md & instruction.md
 */

export const VENDOR_CONFIG = {
  vendorName: 'Infranet Solusi Teknologi',
  tagline: 'Solusi Terpadu Infrastruktur Jaringan, Server & Data Cabling Enterprise',
  address: 'Gedung Cyber Tech Hub Lt. 3, Jl. H. R. Rasuna Said Kav. 42, Kuningan Barat',
  city: 'Jakarta Selatan, DKI Jakarta 12710',
  googleMapsUrl: 'https://maps.google.com/?q=Cyber+Building+Jakarta',
  operationalHours: {
    weekdays: 'Senin - Jumat: 08:30 - 17:30 WIB',
    saturday: 'Sabtu: 09:00 - 14:00 WIB',
    sunday: 'Minggu & Hari Libur: Tutup (Hanya Layanan Emergency Call)',
  },
  whatsappNumber: '6288215268278',
  displayWhatsapp: '+62 882-1526-8278',
  emergencyHotline: '+62 812-9988-7711',
  email: 'operasional@infranet-solusi.id',
};

export const TIME_SLOTS = {
  PAGI: { label: 'Sesi Pagi', hours: '09:00 - 12:00 WIB' },
  SIANG: { label: 'Sesi Siang', hours: '13:00 - 15:30 WIB' },
  SORE: { label: 'Sesi Sore', hours: '15:30 - 17:30 WIB' },
};
