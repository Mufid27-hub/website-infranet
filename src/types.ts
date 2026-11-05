/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DeviceCategory =
  | 'Semua'
  | 'Routing & Switching'
  | 'Keamanan Jaringan'
  | 'Wireless & Hotspot'
  | 'Fiber Optic & Distribusi'
  | 'Data Center & Pengkabelan'
  | 'Power & Kelistrikan Server'
  | 'Server & Komputasi'
  | 'Alat Uji & Sertifikasi Jaringan';

export interface NetworkDevice {
  id: string;
  name: string;
  category: DeviceCategory;
  description: string;
  specs: string[];
  durationMinutes: number;
  durationLabel: string;
  priceEstimate: number; // in IDR
  priceLabel: string;
  image: string;
  imageAlt: string;
  recommendedUse: string;
}

export type TimeSlot = 'PAGI' | 'SIANG' | 'SORE';

export interface BookingDraft {
  serviceId: string;
  clientName: string;
  clientContact: string;
  clientEmail?: string;
  systemName: string;
  deviceType: string;
  installationLocation: string;
  preferredDate: string;
  preferredTime: TimeSlot;
  optionalNotes?: string;
}

export interface FormErrors {
  serviceId?: string;
  clientName?: string;
  clientContact?: string;
  systemName?: string;
  deviceType?: string;
  installationLocation?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface VendorConfig {
  vendorName: string;
  tagline: string;
  address: string;
  city: string;
  postalCode: string;
  googleMapsUrl: string;
  operationalHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  whatsappNumber: string; // international format without + or spaces e.g. 6281234567890
  displayWhatsapp: string;
  emergencyHotline: string;
  email: string;
  supportHours: string;
}
