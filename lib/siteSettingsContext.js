"use client";

import { createContext, useContext } from "react";

// Populated once in app/layout.jsx (a server component) with the result of
// siteSettingsQuery, then made available to any client component further
// down the tree (Nav, StickyNav, Footer, etc.) via useSiteSettings() —
// without having to thread the fetch + props through every single page.
const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ value, children }) {
  return (
    <SiteSettingsContext.Provider value={value || {}}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext) || {};
}
