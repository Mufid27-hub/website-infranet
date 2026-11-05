/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, FileText, CalendarCheck, MessageSquare, CheckCircle } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Pilih Perangkat & Layanan',
      description: 'Cari perangkat infrastruktur jaringan dari 20 unit terverifikasi (router, switch, firewall, kabel, ODF, server, dll.) yang sesuai dengan kebutuhan sistem Anda.',
      icon: Layers,
    },
    {
      number: '02',
      title: 'Lengkapi Data Pemilik & Sistem',
      description: 'Isi identitas pemohon, nomor kontak aktif, nama sistem (misal: "LAN Kantor Pusat"), tipe lingkungan jaringan, dan alamat lokasi instalasi.',
      icon: FileText,
    },
    {
      number: '03',
      title: 'Pilih Preferensi Tanggal & Waktu',
      description: 'Tentukan tanggal kunjungan (tidak boleh di masa lampau) dan sesi waktu yang diinginkan (Pagi, Siang, atau Sore) sebagai usulan waktu kerja.',
      icon: CalendarCheck,
    },
    {
      number: '04',
      title: 'Periksa Ringkasan Draf',
      description: 'Tinjau ringkasan permintaan. Pahami bahwa pengajuan berstatus Permintaan Jadwal (belum terkonfirmasi) sebelum draf dibuka di WhatsApp.',
      icon: CheckCircle,
    },
    {
      number: '05',
      title: 'Buka WhatsApp & Konfirmasi Manual',
      description: 'Buka tautan WhatsApp berisikan draf terenkripsi, tekan kirim sendiri. Tim engineer Infranet akan memverifikasi kesiapan teknis dan mengonfirmasi jadwal resmi.',
      icon: MessageSquare,
    },
  ];

  return (
    <section id="alur-sop" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Standard Operating Procedure (SOP)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            5 Langkah Alur Reservasi Layanan Infranet
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Prosedur standar ini dirancang agar koordinasi pekerjaan infrastruktur teknis di lokasi klien berjalan akurat, terdata, dan aman tanpa risiko salah spesifikasi.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold font-mono text-teal-800">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SOP Notice Banner */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-white">Komitmen Privasi & Keamanan Data (Zero-Persistence)</h4>
            <p className="text-xs text-slate-300 max-w-2xl">
              Kami tidak menyimpan data pribadi Anda di database publik atau penyimpanan lokal browser. Seluruh alur draf berjalan di peramban Anda dan konfirmasi dilakukan secara bilateral lewat saluran WhatsApp resmi.
            </p>
          </div>
          <a
            href="#reservasi"
            className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            Mulai Pengajuan
          </a>
        </div>
      </div>
    </section>
  );
};
