/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneCall, AlertTriangle } from 'lucide-react';
import { VENDOR_CONFIG } from '../config.ts';

export const EmergencyBanner: React.FC = () => {
  return (
    <aside
      aria-label="Informasi Penanganan Darurat"
      className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-xs text-amber-950"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-amber-900">Pemberitahuan Insiden Kritis:</strong> Formulir reservasi website ini diperuntukkan bagi jadwal instalasi & maintenance terjadwal. Bila sistem Anda mengalami downtime darurat total, segera hubungi tim respon teknis.
          </span>
        </div>
        <a
          href={`tel:${VENDOR_CONFIG.emergencyHotline.replace(/\s+/g, '')}`}
          className="inline-flex items-center gap-1.5 font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-2 shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Hotline 24 Jam: {VENDOR_CONFIG.emergencyHotline}</span>
        </a>
      </div>
    </aside>
  );
};
