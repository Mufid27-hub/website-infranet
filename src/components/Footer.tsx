/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { VENDOR_CONFIG } from '../config.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base tracking-tight">
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-500" aria-hidden="true" />
              <span>{VENDOR_CONFIG.vendorName}</span>
            </div>
            <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
              {VENDOR_CONFIG.tagline}. Mitra resmi penyedia perangkat, instalasi kabel terstruktur, sertifikasi link, dan pemeliharaan server data center.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
            aria-label="Kembali ke atas halaman"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* SOP Notice & Disclaimers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] text-slate-400 leading-relaxed">
          <div className="space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Kepatuhan SOP & Privasi Data</span>
            </div>
            <p>
              Website ini tidak menyimpan data pribadi Anda (Zero Storage Persistence). Draf pengajuan sepenuhnya diproses di sisi klien sebelum Anda memutuskan mengirimkannya via WhatsApp ke tim teknisi Infranet.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-slate-300">Batasan Sistem MVP Statis</div>
            <p>
              Seluruh permintaan jadwal melalui portal ini bersifat usulan dan memerlukan konfirmasi resmi dari teknisi Infranet. Bukan jaminan ketersediaan slot instan tanpa peninjauan awal.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {VENDOR_CONFIG.vendorName}. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Standar TIA/EIA-568-C.2</span>
            <span aria-hidden="true">·</span>
            <span>IEEE 802.3 Gigabit Ethernet</span>
            <span aria-hidden="true">·</span>
            <span>ISO/IEC 27001 Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
