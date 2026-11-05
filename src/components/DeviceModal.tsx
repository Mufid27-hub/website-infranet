/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, Check, Clock, Tag, ShieldCheck } from 'lucide-react';
import { NetworkDevice } from '../types.ts';

interface DeviceModalProps {
  device: NetworkDevice | null;
  onClose: () => void;
  onSelect: (device: NetworkDevice) => void;
}

export const DeviceModal: React.FC<DeviceModalProps> = ({ device, onClose, onSelect }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (device) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [device, onClose]);

  if (!device) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-device-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div>
            <div className="text-xs text-slate-500 font-medium">{device.category}</div>
            <h2 id="modal-device-title" className="text-lg font-bold text-slate-900 tracking-tight">
              {device.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            aria-label="Tutup jendela spesifikasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Image & Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="aspect-4/3 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center p-2">
              <img
                src={device.image}
                alt={device.imageAlt}
                className="w-full h-full object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                  Estimasi Biaya Jasa
                </span>
                <div className="text-xl font-bold text-slate-900 font-mono">
                  {device.priceLabel}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  *Estimasi tarif teknis; dapat disesuaikan hasil survei lokasi
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Estimasi Durasi: <strong>{device.durationLabel}</strong></span>
              </div>

              <div className="p-3 rounded-lg bg-teal-50 border border-teal-100 text-xs text-teal-900">
                <div className="font-semibold mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                  Rekomendasi Penerapan:
                </div>
                {device.recommendedUse}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Deskripsi Perangkat & Cakupan Layanan</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{device.description}</p>
          </div>

          {/* Detailed Specs */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Spesifikasi Teknis & Standar Kualifikasi</h3>
            <ul className="space-y-2">
              {device.specs.map((spec, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => {
              onSelect(device);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors shadow-sm cursor-pointer"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Pilih Perangkat Ini untuk Reservasi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
