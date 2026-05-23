import React, { createContext, useContext, ReactNode } from 'react';
import { getPaypalDonationLink, openExternalLink } from '../utils/safeLinks';

interface DonationContextType {
  openDonationModal: () => void;
  closeDonationModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const openDonationModal = () => openExternalLink(getPaypalDonationLink());
  const closeDonationModal = () => undefined;

  return (
    <DonationContext.Provider value={{ openDonationModal, closeDonationModal }}>
      {children}
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
