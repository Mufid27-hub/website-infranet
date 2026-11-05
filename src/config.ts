/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VendorConfig } from './types.ts';

export const VENDOR_CONFIG: VendorConfig = {
  vendorName: 'Infranet Solusi Teknologi',
  tagline: 'Solusi Terpadu Infrastruktur Jaringan, Server & Data Cabling Enterprise',
  address: 'Gedung Cyber Tech Hub Lt. 3, Jl. H. R. Rasuna Said Kav. 42, Kuningan Barat',
  city: 'Jakarta Selatan, DKI Jakarta',
  postalCode: '12710',
  googleMapsUrl: 'https://maps.google.com/?q=Cyber+Building+Jakarta',
  operationalHours: {
    weekdays: 'Senin - Jumat: 08:30 - 17:30 WIB',
    saturday: 'Sabtu: 09:00 - 14:00 WIB',
    sunday: 'Minggu & Hari Libur Nasional: Tutup (Hanya Layanan Emergency Call)',
  },
  // Format nomor WhatsApp dengan kode negara dan hanya digit (sesuai SOP instruction.md)
  whatsappNumber: '6288215268278',
  displayWhatsapp: '+62 882-1526-8278',
  emergencyHotline: '+62 812-9988-7711',
  email: 'operasional@infranet-solusi.id',
  supportHours: 'Respon WhatsApp: Max 30 Menit pada Jam Operasional',
};

export const TIME_SLOTS: Record<string, { label: string; hours: string; description: string }> = {
  PAGI: {
    label: 'Sesi Pagi',
    hours: '09:00 - 12:00 WIB',
    description: 'Cocok untuk survei lokasi atau instalasi perangkat modular',
  },
  SIANG: {
    label: 'Sesi Siang',
    hours: '13:00 - 15:30 WIB',
    description: 'Cocok untuk konfigurasi firewall, router core, & switch',
  },
  SORE: {
    label: 'Sesi Sore',
    hours: '15:30 - 17:30 WIB',
    description: 'Cocok untuk pengujian link, sertifikasi kabel, atau handover',
  },
};

export const DEVICE_SYSTEM_TYPES = [
  'Ruang Server / Main Distribution Frame (MDF)',
  'Jaringan Kantor / Enterprise Local Area Network (LAN)',
  'Kantor Cabang / Remote Branch Office',
  'Kampus / Gedung Bertingkat / Backbone Fiber Optic',
  'Infrastruktur Wireless / Hotspot Publik / PTP Bridge',
  'Pusat Data Mini (Edge Data Center) / Server Rack',
  'Sistem Keamanan Jaringan & Perimeter Firewall',
  'Koneksi Internet Pelanggan / Fiber To The Home (FTTH)',
];
