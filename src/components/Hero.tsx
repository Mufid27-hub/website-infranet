/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { VENDOR_CONFIG } from '../config.ts';

interface HeroProps {
  onExploreCatalog: () => void;
  onStartBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onStartBooking }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
              <span>Standard Operating Procedure (SOP)</span>
              <span aria-hidden="true">/</span>
              <span>Infrastruktur Jaringan & Server</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight text-balance leading-tight">
              Reservasi Layanan Instalasi, Audit, dan Maintenance Jaringan
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Pilih perangkat jaringan yang dibutuhkan dari katalog kami, lengkapi data spesifikasi sistem, dan ajukan preferensi jadwal pengerjaan teknis on-site secara tertib dan terstruktur langsung ke tim engineer {VENDOR_CONFIG.vendorName}.
            </p>

            {/* Verification Status Banner (SOP requirement) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-teal-700" aria-hidden="true" />
                <span>Aturan SOP & Status Pengajuan Draf</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Pengajuan formulir melalui website ini berstatus <strong>Permintaan Jadwal (Belum Terkonfirmasi)</strong>. Draf pesanan akan diteruskan ke WhatsApp untuk peninjauan teknis dan konfirmasi ketersediaan slot oleh teknisi kami.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartBooking}
                className="px-6 py-3 text-sm font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                Mulai Formulir Reservasi
              </button>
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <span>Lihat Katalog Perangkat</span>
                <ArrowDown className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Hero Side Graphic / Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Portal Layanan Resmi</div>
                  <div className="text-base font-bold text-white tracking-wide">Infranet Operation Center</div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">20 Unit Katalog Perangkat:</span>
                    <span className="text-slate-300 block">Router, Next-Gen Firewall, Switch PoE+, WiFi 6, ODF, SFP+, Patch Panel, hingga Rack Server.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Zero Data Persistence:</span>
                    <span className="text-slate-300 block">Privasi terjamin. Data kontak dan topologi tidak disimpan ke server atau browser storage.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Verifikasi Jadwal Manual:</span>
                    <span className="text-slate-300 block">Klien memilih tanggal & sesi preferensi, engineer memastikan kesiapan teknis sebelum konfirmasi.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Jam Kerja: 08:30 - 17:30 WIB</span>
                <span className="text-teal-400 font-mono">Standar TIA-568 / ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
