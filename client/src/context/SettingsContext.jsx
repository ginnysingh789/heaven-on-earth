import { createContext, useContext, useEffect, useState } from 'react';
import { fetchSettingsFromServer, SETTINGS_UPDATED_EVENT } from '../utils/whatsapp';

const SettingsContext = createContext({ version: 0 });

export const useSettingsVersion = () => useContext(SettingsContext).version;

export function SettingsProvider({ children }) {
  // `version` is bumped every time the local cache is refreshed from the
  // server. Components that read settings synchronously (Footer, anchors
  // built with buildWhatsAppUrl/buildEmailUrl) can key on this value to
  // re-render once the latest admin-configured values arrive.
  const [version, setVersion] = useState(0);

  useEffect(() => {
    fetchSettingsFromServer();
    const handler = () => setVersion((v) => v + 1);
    window.addEventListener(SETTINGS_UPDATED_EVENT, handler);
    return () => window.removeEventListener(SETTINGS_UPDATED_EVENT, handler);
  }, []);

  return (
    <SettingsContext.Provider value={{ version }}>
      {children}
    </SettingsContext.Provider>
  );
}
