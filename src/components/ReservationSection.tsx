/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Server,
  MapPin,
  FileEdit,
  Send,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';
import { BookingDraft, FormErrors, NetworkDevice, TimeSlot } from '../types.ts';
import { DEVICE_SYSTEM_TYPES, TIME_SLOTS, VENDOR_CONFIG } from '../config.ts';
import {
  formatIndonesianDate,
  generateWhatsAppUrl,
  getTodayLocalDateString,
  validateBookingForm,
} from '../booking.ts';

interface ReservationSectionProps {
  devices: NetworkDevice[];
  selectedDevice: NetworkDevice | null;
  onSelectDevice: (device: NetworkDevice) => void;
  onBrowseCatalog: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  devices,
  selectedDevice,
  onSelectDevice,
  onBrowseCatalog,
}) => {
  const todayStr = getTodayLocalDateString();

  // Form state (in memory only, zero localStorage per SOP)
  const [draft, setDraft] = useState<BookingDraft>({
    serviceId: selectedDevice ? selectedDevice.id : '',
    clientName: '',
    clientContact: '',
    clientEmail: '',
    systemName: '',
    deviceType: DEVICE_SYSTEM_TYPES[0],
    installationLocation: '',
    preferredDate: todayStr,
    preferredTime: 'PAGI',
    optionalNotes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isReviewed, setIsReviewed] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Input refs for accessible focusing on error
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const systemInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLTextAreaElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const deviceSelectRef = useRef<HTMLSelectElement>(null);

  // Sync draft serviceId when selectedDevice changes from outside
  React.useEffect(() => {
    if (selectedDevice && selectedDevice.id !== draft.serviceId) {
      setDraft((prev) => ({ ...prev, serviceId: selectedDevice.id }));
      setIsReviewed(false); // Invalidate previous review (SOP requirement)
    }
  }, [selectedDevice]);

  // Handle input changes with SOP State Invalidation:
  // "Perubahan formulir setelah ringkasan ditinjau membatalkan pemeriksaan sebelumnya."
  const handleChange = (
    field: keyof BookingDraft,
    value: string
  ) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    setIsReviewed(false); // Invalidate review state
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const found = devices.find((d) => d.id === id) || null;
    if (found) {
      onSelectDevice(found);
    }
    handleChange('serviceId', id);
  };

  // Review step handler
  const handleReviewSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    const currentDevice = devices.find((d) => d.id === draft.serviceId) || selectedDevice;
    const validationErrors = validateBookingForm(draft, currentDevice);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsReviewed(false);

      // Focus first error field for accessibility
      if (validationErrors.serviceId && deviceSelectRef.current) {
        deviceSelectRef.current.focus();
      } else if (validationErrors.clientName && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (validationErrors.clientContact && contactInputRef.current) {
        contactInputRef.current.focus();
      } else if (validationErrors.systemName && systemInputRef.current) {
        systemInputRef.current.focus();
      } else if (validationErrors.installationLocation && locationInputRef.current) {
        locationInputRef.current.focus();
      } else if (validationErrors.preferredDate && dateInputRef.current) {
        dateInputRef.current.focus();
      }
      return;
    }

    setErrors({});
    setIsReviewed(true);
  };

  // Reset form handler
  const handleResetForm = () => {
    setDraft({
      serviceId: selectedDevice ? selectedDevice.id : '',
      clientName: '',
      clientContact: '',
      clientEmail: '',
      systemName: '',
      deviceType: DEVICE_SYSTEM_TYPES[0],
      installationLocation: '',
      preferredDate: todayStr,
      preferredTime: 'PAGI',
      optionalNotes: '',
    });
    setErrors({});
    setIsReviewed(false);
  };

  const currentDevice = devices.find((d) => d.id === draft.serviceId) || selectedDevice;
  const waResult = currentDevice ? generateWhatsAppUrl(draft, currentDevice) : null;

  const handleCopyDraftText = () => {
    if (!waResult) return;
    navigator.clipboard.writeText(waResult.message);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    if (!waResult || !waResult.url) return;
    // Buka WhatsApp lewat aksi pengguna sesuai SOP
    window.open(waResult.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="reservasi" className="py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Formulir Permintaan Jadwal
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pengajuan Jadwal Instalasi & Maintenance
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Isi formulir dengan data yang valid. Data akan dirangkum menjadi draf pesan WhatsApp yang Anda tinjau sebelum dikirimkan ke teknisi Infranet.
          </p>
        </div>

        {/* Selected Device Preview Banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center p-2 shrink-0 overflow-hidden">
              {currentDevice ? (
                <img
                  src={currentDevice.image}
                  alt={currentDevice.imageAlt}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Server className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-medium">Perangkat Terpilih:</div>
              <h3 className="text-base font-bold text-slate-900">
                {currentDevice ? currentDevice.name : 'Belum Ada Perangkat yang Dipilih'}
              </h3>
              {currentDevice && (
                <div className="text-xs text-slate-600 font-mono">
                  {currentDevice.priceLabel} · Durasi: {currentDevice.durationLabel}
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onBrowseCatalog}
            className="px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer shrink-0"
          >
            Pilih dari Katalog (20 Perangkat)
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleReviewSubmission} noValidate className="space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-8">
            {/* Bagian 1: Pilih Perangkat */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Server className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-bold text-slate-900">1. Perangkat & Layanan yang Dibutuhkan *</h3>
              </div>

              <div>
                <label htmlFor="serviceId" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Daftar Perangkat Jaringan Infranet
                </label>
                <select
                  ref={deviceSelectRef}
                  id="serviceId"
                  name="serviceId"
                  value={draft.serviceId}
                  onChange={handleDeviceChange}
                  aria-invalid={!!errors.serviceId}
                  aria-describedby={errors.serviceId ? 'serviceId-error' : undefined}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                    errors.serviceId ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                  }`}
                >
                  <option value="">-- Pilih Salah Satu Perangkat (20 Pilihan) --</option>
                  {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      [{device.category}] {device.name} - {device.priceLabel}
                    </option>
                  ))}
                </select>
                {errors.serviceId && (
                  <p id="serviceId-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.serviceId}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Bagian 2: Identitas Pemohon / Klien */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <User className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-bold text-slate-900">2. Identitas Klien / Pemohon *</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Pemohon / Nama Perusahaan / Instansi *
                  </label>
                  <div className="relative">
                    <input
                      ref={nameInputRef}
                      type="text"
                      id="clientName"
                      value={draft.clientName}
                      onChange={(e) => handleChange('clientName', e.target.value)}
                      placeholder="Contoh: PT Nusantara Cyber / Bpk. Rahmat"
                      aria-invalid={!!errors.clientName}
                      aria-describedby={errors.clientName ? 'clientName-error' : undefined}
                      className={`w-full px-3.5 py-2 text-sm rounded-lg border text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.clientName ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.clientName && (
                    <p id="clientName-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.clientName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="clientContact" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nomor WhatsApp / Telepon Aktif *
                  </label>
                  <div className="relative">
                    <input
                      ref={contactInputRef}
                      type="tel"
                      id="clientContact"
                      value={draft.clientContact}
                      onChange={(e) => handleChange('clientContact', e.target.value)}
                      placeholder="Contoh: 081234567890"
                      aria-invalid={!!errors.clientContact}
                      aria-describedby={errors.clientContact ? 'clientContact-error' : undefined}
                      className={`w-full px-3.5 py-2 text-sm rounded-lg border text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.clientContact ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.clientContact && (
                    <p id="clientContact-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.clientContact}</span>
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="clientEmail" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Alamat Email (Opsional untuk pengiriman dokumen SLA & penawaran resmi)
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    value={draft.clientEmail || ''}
                    onChange={(e) => handleChange('clientEmail', e.target.value)}
                    placeholder="Contoh: it-support@perusahaan.co.id"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 3: Data Sistem & Lingkungan Jaringan */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-bold text-slate-900">3. Lingkungan Sistem & Lokasi Instalasi *</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="systemName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Sistem / Label Jaringan *
                  </label>
                  <input
                    ref={systemInputRef}
                    type="text"
                    id="systemName"
                    value={draft.systemName}
                    onChange={(e) => handleChange('systemName', e.target.value)}
                    placeholder="Contoh: LAN Ruang Server Gd. A / Link PTP Pabrik"
                    aria-invalid={!!errors.systemName}
                    aria-describedby={errors.systemName ? 'systemName-error' : undefined}
                    className={`w-full px-3.5 py-2 text-sm rounded-lg border text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                      errors.systemName ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.systemName && (
                    <p id="systemName-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.systemName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="deviceType" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Tipe Lingkungan Sistem *
                  </label>
                  <select
                    id="deviceType"
                    value={draft.deviceType}
                    onChange={(e) => handleChange('deviceType', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    {DEVICE_SYSTEM_TYPES.map((t, idx) => (
                      <option key={idx} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="installationLocation" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Alamat Lengkap Lokasi Pekerjaan (Gedung, Lantai, Ruang Server, Kota) *
                  </label>
                  <textarea
                    ref={locationInputRef}
                    id="installationLocation"
                    rows={2}
                    value={draft.installationLocation}
                    onChange={(e) => handleChange('installationLocation', e.target.value)}
                    placeholder="Contoh: Menara Mandiri Lt. 12 Ruang Server Utama, Jl. Jend. Sudirman Kav. 54, Jakarta Selatan"
                    aria-invalid={!!errors.installationLocation}
                    aria-describedby={errors.installationLocation ? 'installationLocation-error' : undefined}
                    className={`w-full px-3.5 py-2 text-sm rounded-lg border text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                      errors.installationLocation ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.installationLocation && (
                    <p id="installationLocation-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.installationLocation}</span>
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="optionalNotes" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Catatan Kebutuhan Khusus / Topologi Jaringan (Opsional)
                  </label>
                  <textarea
                    id="optionalNotes"
                    rows={2}
                    value={draft.optionalNotes || ''}
                    onChange={(e) => handleChange('optionalNotes', e.target.value)}
                    placeholder="Contoh: Memerlukan penarikan kabel ducting 50 meter, konfigurasi 4 VLAN ID, atau integrasi dengan firewall eksisting."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 4: Preferensi Jadwal Kunjungan */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Calendar className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-bold text-slate-900">4. Preferensi Jadwal Kunjungan Teknisi *</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Tanggal Kunjungan yang Diharapkan *
                  </label>
                  <input
                    ref={dateInputRef}
                    type="date"
                    id="preferredDate"
                    min={todayStr}
                    value={draft.preferredDate}
                    onChange={(e) => handleChange('preferredDate', e.target.value)}
                    aria-invalid={!!errors.preferredDate}
                    aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                    className={`w-full px-3.5 py-2 text-sm rounded-lg border text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                      errors.preferredDate ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {draft.preferredDate && !errors.preferredDate && (
                    <p className="mt-1 text-xs text-slate-500">
                      Terpilih: <strong className="text-slate-800">{formatIndonesianDate(draft.preferredDate)}</strong>
                    </p>
                  )}
                  {errors.preferredDate && (
                    <p id="preferredDate-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.preferredDate}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferensi Sesi Waktu Kunjungan *
                  </label>
                  <div className="space-y-2">
                    {(Object.keys(TIME_SLOTS) as TimeSlot[]).map((slotKey) => {
                      const slot = TIME_SLOTS[slotKey];
                      const isChecked = draft.preferredTime === slotKey;
                      return (
                        <label
                          key={slotKey}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                            isChecked
                              ? 'border-teal-600 bg-teal-50/40 text-slate-900'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredTime"
                            value={slotKey}
                            checked={isChecked}
                            onChange={() => handleChange('preferredTime', slotKey)}
                            className="mt-0.5 text-teal-700 focus:ring-teal-600"
                          />
                          <div className="text-xs">
                            <div className="font-semibold text-slate-900">
                              {slot.label} ({slot.hours})
                            </div>
                            <div className="text-slate-500 text-[11px]">{slot.description}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
                <strong>Catatan Penting SOP Jadwal:</strong>
                <p>
                  Slot tanggal dan sesi waktu yang Anda pilih adalah <em>preferensi pemohon</em>. Tim engineer Infranet akan memastikan tidak ada bentrok teknisi dan mengonfirmasi ketersediaan slot resmi kepada Anda melalui WhatsApp.
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetForm}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Kosongkan Formulir</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <FileEdit className="w-4 h-4" />
                <span>Tinjau Ringkasan Permintaan</span>
              </button>
            </div>
          </div>
        </form>

        {/* REVIEW SUMMARY CARD (Only displayed after user clicks 'Tinjau Ringkasan Permintaan' and validates) */}
        {isReviewed && currentDevice && (
          <div
            id="ringkasan-permintaan"
            className="bg-white rounded-2xl border-2 border-teal-600 shadow-xl overflow-hidden scroll-mt-20 animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            {/* Status Header */}
            <div className="bg-teal-800 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider opacity-80 block">
                  Ringkasan Draf Formulir
                </span>
                <h3 className="text-lg font-bold">Permintaan Jadwal (Belum Dikonfirmasi)</h3>
              </div>
              <div className="px-3 py-1 bg-amber-400 text-amber-950 font-bold text-xs rounded-md self-start sm:self-auto uppercase tracking-wide">
                Status: Menunggu Konfirmasi Vendor IT
              </div>
            </div>

            {/* Summary Details Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong>Ketentuan SOP:</strong> Ini adalah draf permintaan jadwal instalasi/maintenance, bukan konfirmasi reservasi otomatis. Data di bawah ini akan dimuat ke obrolan WhatsApp resmi Infranet ({VENDOR_CONFIG.displayWhatsapp}). Anda akan menekan tombol kirim sendiri di aplikasi WhatsApp Anda.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Kolom 1: Perangkat & Waktu */}
                <div className="space-y-4 p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="font-bold text-slate-900 text-sm border-b pb-2">
                    Rincian Perangkat & Preferensi Waktu
                  </div>
                  <div>
                    <span className="text-slate-500 block">Perangkat Terpilih:</span>
                    <strong className="text-slate-900 text-sm">{currentDevice.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Kategori & Durasi:</span>
                    <span className="text-slate-800">{currentDevice.category} (Est. {currentDevice.durationLabel})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Estimasi Tarif Jasa:</span>
                    <span className="text-slate-900 font-bold font-mono">{currentDevice.priceLabel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Usulan Tanggal & Sesi Waktu:</span>
                    <strong className="text-teal-800">
                      {formatIndonesianDate(draft.preferredDate)} · {TIME_SLOTS[draft.preferredTime]?.label} ({TIME_SLOTS[draft.preferredTime]?.hours})
                    </strong>
                  </div>
                </div>

                {/* Kolom 2: Identitas & Lokasi */}
                <div className="space-y-4 p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="font-bold text-slate-900 text-sm border-b pb-2">
                    Identitas Pemohon & Lokasi Pengerjaan
                  </div>
                  <div>
                    <span className="text-slate-500 block">Nama Pemohon / Instansi:</span>
                    <strong className="text-slate-900">{draft.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Nomor Kontak:</span>
                    <span className="text-slate-800 font-mono">{draft.clientContact}</span>
                    {draft.clientEmail && <span className="text-slate-500 block mt-0.5">{draft.clientEmail}</span>}
                  </div>
                  <div>
                    <span className="text-slate-500 block">Nama Sistem & Tipe:</span>
                    <span className="text-slate-800">{draft.systemName} · {draft.deviceType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Alamat Pengerjaan:</span>
                    <span className="text-slate-800">{draft.installationLocation}</span>
                  </div>
                  {draft.optionalNotes && (
                    <div>
                      <span className="text-slate-500 block">Catatan Tambahan:</span>
                      <span className="text-slate-800 italic">{draft.optionalNotes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notice when WhatsApp number missing */}
              {waResult?.error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block mb-0.5">Pengajuan WhatsApp Belum Tersedia:</strong>
                    {waResult.error} Silakan gunakan nomor telepon kantor resmi kami di {VENDOR_CONFIG.emergencyHotline}.
                  </div>
                </div>
              )}

              {/* WhatsApp & Copy Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleCopyDraftText}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedDraft ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDraft ? 'Teks Draf Tersalin!' : 'Salin Teks Draf'}</span>
                </button>

                <div className="w-full sm:w-auto flex items-center gap-3">
                  <button
                    type="button"
                    disabled={!waResult?.url}
                    onClick={handleOpenWhatsApp}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-lg shadow-md transition-all ${
                      waResult?.url
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Buka WhatsApp Infranet Sekarang</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>
                </div>
              </div>

              <div className="text-center text-[11px] text-slate-500">
                Setelah WhatsApp terbuka, Anda wajib menekan tombol kirim sendiri di aplikasi WhatsApp. Tim teknisi kami akan membalas dengan konfirmasi slot teknisi on-site.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
