/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { NETWORK_DEVICES } from './data.ts';
import { NetworkDevice } from './types.ts';
import { Header } from './components/Header.tsx';
import { EmergencyBanner } from './components/EmergencyBanner.tsx';
import { Hero } from './components/Hero.tsx';
import { CatalogSection } from './components/CatalogSection.tsx';
import { WorkflowSection } from './components/WorkflowSection.tsx';
import { ReservationSection } from './components/ReservationSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { DeviceModal } from './components/DeviceModal.tsx';

export default function App() {
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(NETWORK_DEVICES[0]);
  const [modalDevice, setModalDevice] = useState<NetworkDevice | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDevice = (device: NetworkDevice) => {
    setSelectedDevice(device);
    scrollToSection('reservasi');
  };

  const handleViewDeviceDetails = (device: NetworkDevice) => {
    setModalDevice(device);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Critical Emergency Banner */}
      <EmergencyBanner />

      {/* Main Sticky Header */}
      <Header onScrollToReservation={() => scrollToSection('reservasi')} />

      {/* Main Content Landmarks */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={() => scrollToSection('katalog')}
          onStartBooking={() => scrollToSection('reservasi')}
        />

        {/* Catalog Section with all 20 devices */}
        <CatalogSection
          devices={NETWORK_DEVICES}
          selectedDeviceId={selectedDevice?.id || ''}
          onSelectDevice={handleSelectDevice}
          onViewDeviceDetails={handleViewDeviceDetails}
        />

        {/* 5-Step SOP Workflow Section */}
        <WorkflowSection />

        {/* Interactive Reservation Form with State Invalidation and WhatsApp Draft */}
        <ReservationSection
          devices={NETWORK_DEVICES}
          selectedDevice={selectedDevice}
          onSelectDevice={setSelectedDevice}
          onBrowseCatalog={() => scrollToSection('katalog')}
        />

        {/* Native Details/Summary FAQ Section */}
        <FaqSection />

        {/* Verified Contact and Operation Hours Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Accessible Technical Specs Modal */}
      <DeviceModal
        device={modalDevice}
        onClose={() => setModalDevice(null)}
        onSelect={handleSelectDevice}
      />
    </div>
  );
}
