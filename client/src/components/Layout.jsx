import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSettingsVersion } from '../context/SettingsContext';

export default function Layout() {
  // Subscribe to settings version so the whole layout (Navbar, page content,
  // Footer, and any WhatsApp/Email buttons inside) re-renders once the
  // admin-configured values arrive from the server on first load. This is a
  // re-render, not a remount, so child useEffects do NOT re-fire — safe.
  useSettingsVersion();
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
