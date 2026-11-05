/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../data.ts';

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Panduan & Pertanyaan Umum
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Penjelasan mengenai aturan SOP, privasi data, persiapan teknis di lokasi, serta verifikasi ketersediaan jadwal teknisi.
          </p>
        </div>

        {/* Accordion using native <details> and <summary> */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 transition-all open:bg-white open:border-slate-300 open:shadow-xs"
            >
              <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base cursor-pointer list-none select-none">
                <span className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
              </summary>
              <div className="pt-3.5 pl-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-3">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Preparation Checklist */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Daftar Periksa Persiapan Kunjungan Teknisi Infranet:
          </h3>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>Surat Izin Masuk Gedung / Working Permit (Bila gedung mensyaratkan izin kerja sebelum jam kantor).</li>
            <li>Akses fisik ke Ruang Server / Rak Rackmount dan kunci kabinet server.</li>
            <li>Titik colokan listrik PLN & UPS yang siap digunakan saat pengerjaan.</li>
            <li>PIC Teknis yang memiliki otoritas untuk menandatangani Berita Acara Pekerjaan & Handover.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
