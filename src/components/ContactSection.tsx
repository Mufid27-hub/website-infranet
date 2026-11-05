/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Clock, Phone, Mail, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { VENDOR_CONFIG } from '../config.ts';

export const ContactSection: React.FC = () => {
  return (
    <section id="kontak" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Identitas Resmi & Lokasi Kantor
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Hubungi Vendor IT & Pusat Operasional
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Data kontak dan alamat kantor pusat Infranet Solusi Teknologi yang telah terverifikasi secara resmi untuk konsultasi teknis, survei lokasi, dan administrasi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Alamat & Lokasi */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Kantor & Workshop</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {VENDOR_CONFIG.address}<br />
                {VENDOR_CONFIG.city} {VENDOR_CONFIG.postalCode}
              </p>
            </div>
            <div className="pt-2">
              <a
                href={VENDOR_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 hover:underline"
              >
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Jam Operasional */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Jam Layanan & Penjadwalan</h3>
              <div className="text-xs text-slate-600 space-y-1.5">
                <div>{VENDOR_CONFIG.operationalHours.weekdays}</div>
                <div>{VENDOR_CONFIG.operationalHours.saturday}</div>
                <div className="text-slate-400 italic">{VENDOR_CONFIG.operationalHours.sunday}</div>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{VENDOR_CONFIG.supportHours}</span>
            </div>
          </div>

          {/* Card 3: Saluran Komunikasi Terverifikasi */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Kontak Resmi Vendor</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-500">WhatsApp:</span>
                  <a
                    href={`https://wa.me/${VENDOR_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-slate-900 hover:text-teal-800"
                  >
                    {VENDOR_CONFIG.displayWhatsapp}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-slate-500">Emergency 24 Jam:</span>
                  <a
                    href={`tel:${VENDOR_CONFIG.emergencyHotline.replace(/\s+/g, '')}`}
                    className="font-bold text-amber-900 hover:underline"
                  >
                    {VENDOR_CONFIG.emergencyHotline}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-500">Email:</span>
                  <a
                    href={`mailto:${VENDOR_CONFIG.email}`}
                    className="font-medium text-slate-700 hover:underline"
                  >
                    {VENDOR_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
