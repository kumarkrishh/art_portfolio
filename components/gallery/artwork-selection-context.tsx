"use client";

import { createContext, useContext, useState } from "react";

type ArtworkSelectionContextValue = {
  selectedLabel: string;
  setSelectedLabel: (label: string) => void;
};

const ArtworkSelectionContext = createContext<ArtworkSelectionContextValue | null>(null);

export function ArtworkSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedLabel, setSelectedLabel] = useState("Canvas only");

  return (
    <ArtworkSelectionContext.Provider value={{ selectedLabel, setSelectedLabel }}>
      {children}
    </ArtworkSelectionContext.Provider>
  );
}

export function useArtworkSelection() {
  const context = useContext(ArtworkSelectionContext);

  if (!context) {
    throw new Error("useArtworkSelection must be used within ArtworkSelectionProvider");
  }

  return context;
}
