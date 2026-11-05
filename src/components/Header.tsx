/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { VENDOR_CONFIG } from '../config.ts';

interface HeaderProps {
  onScrollToReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToReservation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-slate-900 font-bold text-lg tracking-tight whitespace-nowrap shrink-0 hover:text-teal-700 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-teal-600 inline-block" aria-hidden="true" />
            <span>{VENDOR_CONFIG.vendorName}</span>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#katalog"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Katalog Perangkat
            </a>
            <a
              href="#alur-sop"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Alur SOP Reservasi
            </a>
            <a
              href="#faq"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              FAQ & Panduan
            </a>
            <a
              href="#kontak"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Kontak & Lokasi
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onScrollToReservation}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              <span>Ajukan Jadwal</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <a
            href="#katalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
          >
            Katalog Perangkat (20)
          </a>
          <a
            href="#alur-sop"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
          >
            Alur SOP Reservasi
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
          >
            FAQ & Panduan
          </a>
          <a
            href="#kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
          >
            Kontak & Lokasi
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToReservation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
            >
              <span>Ajukan Jadwal Sekarang</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
