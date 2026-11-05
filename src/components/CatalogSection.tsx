/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Clock, ArrowRight, Eye, Check } from 'lucide-react';
import { CATEGORIES } from '../data.ts';
import { NetworkDevice } from '../types.ts';

interface CatalogSectionProps {
  devices: NetworkDevice[];
  selectedDeviceId: string;
  onSelectDevice: (device: NetworkDevice) => void;
  onViewDeviceDetails: (device: NetworkDevice) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  devices,
  selectedDeviceId,
  onSelectDevice,
  onViewDeviceDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Filter simultaneously by search query & category (SOP requirement)
  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesCategory =
        selectedCategory === 'Semua' || device.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        device.name.toLowerCase().includes(q) ||
        device.description.toLowerCase().includes(q) ||
        device.category.toLowerCase().includes(q) ||
        device.specs.some((spec) => spec.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [devices, searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
  };

  return (
    <section id="katalog" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Katalog Perangkat Terverifikasi (20 Unit)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Peralatan & Modul Infrastruktur Jaringan
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Pilih perangkat yang relevan dengan kebutuhan instalasi atau audit sistem Anda. Setiap perangkat dilengkapi spesifikasi teknis, estimasi durasi pengerjaan, dan estimasi tarif jasa resmi.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <label htmlFor="device-search" className="sr-only">
                Cari perangkat jaringan berdasarkan nama, spesifikasi, atau kata kunci
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="device-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari router, firewall, switch, fiber optic, tester..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
              />
            </div>

            {/* Reset button if filter active */}
            {(searchQuery !== '' || selectedCategory !== 'Semua') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Reset pencarian dan kategori"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filter</span>
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Tabs (Functional Buttons) */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Menampilkan <strong className="text-slate-800 font-semibold">{filteredDevices.length}</strong> dari {devices.length} perangkat
            {selectedCategory !== 'Semua' && ` pada kategori "${selectedCategory}"`}
          </span>
          {searchQuery && (
            <span>
              Kata kunci: <span className="font-mono text-slate-700 font-semibold">"{searchQuery}"</span>
            </span>
          )}
        </div>

        {/* Empty State when no results match */}
        {filteredDevices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base font-semibold text-slate-900">Perangkat Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500">
                Tidak ada perangkat yang cocok dengan kata kunci "{searchQuery}" pada kategori yang dipilih.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tampilkan Semua Perangkat</span>
            </button>
          </div>
        ) : (
          /* Grid of Devices */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDevices.map((device) => {
              const isSelected = selectedDeviceId === device.id;
              return (
                <article
                  key={device.id}
                  className={`group bg-white rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden ${
                    isSelected
                      ? 'border-teal-600 ring-2 ring-teal-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  {/* Image container */}
                  <div className="relative aspect-4/3 bg-slate-100 border-b border-slate-100 overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={device.image}
                      alt={device.imageAlt}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 bg-teal-700 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>Terpilih</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Zero-Pill Metadata Discipline: unboxed text with separators */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span>{device.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {device.durationLabel}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2">
                        {device.name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {device.description}
                      </p>
                    </div>

                    {/* Price and Action Footer */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Estimasi Tarif Jasa
                        </div>
                        <div className="text-sm font-bold text-slate-900 font-mono">
                          {device.priceLabel}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onViewDeviceDetails(device)}
                          className="inline-flex items-center justify-center gap-1 py-2 px-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
                          aria-label={`Lihat spesifikasi lengkap ${device.name}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectDevice(device)}
                          className={`inline-flex items-center justify-center gap-1 py-2 px-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-teal-800 text-white hover:bg-teal-900'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          <span>{isSelected ? 'Ganti Data' : 'Pilih Ini'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
