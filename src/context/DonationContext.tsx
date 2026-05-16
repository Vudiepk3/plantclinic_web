import React, { createContext, useContext, useState, ReactNode } from 'react';
import DonationModal from '../components/DonationModal';

interface DonationContextType {
  openDonationModal: () => void;
  closeDonationModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDonationModal = () => setIsOpen(true);
  const closeDonationModal = () => setIsOpen(false);

  return (
    <DonationContext.Provider value={{ openDonationModal, closeDonationModal }}>
      {children}
      <DonationModal isOpen={isOpen} onClose={closeDonationModal} />
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
}
