import api from '../api';

const WHATSAPP_STORAGE_KEY = 'kashmiroffbeat_whatsapp';
const CONTACT_STORAGE_KEY = 'kashmiroffbeat_contact';

export const SETTINGS_UPDATED_EVENT = 'kashmiroffbeat:settings-updated';

const defaults = {
  phone: '919876543210',
  template: `Hi Kashmir Offbeat! 👋

I'm interested in *{itemName}*.

Could you please share more details about:
- Availability & dates
- Pricing & packages
- Pickup/drop arrangements

Looking forward to hearing from you!`,
};

const contactDefaults = {
  contactPhone: '+91 194 2501234',
  contactEmail: 'info@kashmiroffbeat.com',
};

// Synchronous read of cached settings. Used by render-time URL builders
// and as the initial value for Footer/AdminSettings; the cache is refreshed
// from the server on app mount via fetchSettingsFromServer().
export function getWhatsAppConfig() {
  try {
    const stored = localStorage.getItem(WHATSAPP_STORAGE_KEY);
    if (stored) return { ...defaults, ...JSON.parse(stored) };
  } catch {}
  return defaults;
}

export function getContactConfig() {
  try {
    const stored = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (stored) return { ...contactDefaults, ...JSON.parse(stored) };
  } catch {}
  return contactDefaults;
}

function writeCache(whatsapp, contact, { notify = true } = {}) {
  if (whatsapp) localStorage.setItem(WHATSAPP_STORAGE_KEY, JSON.stringify(whatsapp));
  if (contact) localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
  if (notify && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SETTINGS_UPDATED_EVENT));
  }
}

let inflight = null;
// Fetch settings from the server and refresh the local cache.
// All visitors (not just admins) should call this so the footer / WhatsApp
// links reflect the latest admin-configured values.
export function fetchSettingsFromServer() {
  if (inflight) return inflight;
  inflight = api.getSettings()
    .then((data) => {
      if (data) writeCache(data.whatsapp, data.contact);
      return data;
    })
    .catch(() => null)
    .finally(() => { inflight = null; });
  return inflight;
}

// Admin-only: persist new settings on the server, then update the local cache.
// We don't dispatch the global update event here — the admin doesn't need to
// remount the whole route tree (which would wipe the "Saved" confirmation),
// and other visitors will pick up the change the next time they load the site.
export async function saveSettingsToServer({ whatsapp, contact }) {
  const data = await api.adminUpdateSettings({ whatsapp, contact });
  if (data) writeCache(data.whatsapp, data.contact, { notify: false });
  return data;
}

export function buildWhatsAppUrl(itemName) {
  const { phone, template } = getWhatsAppConfig();
  const message = template.replace(/\{itemName\}/g, itemName || 'your services');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildEmailUrl(itemName) {
  const { contactEmail } = getContactConfig();
  const subject = `Enquiry about ${itemName || 'your services'}`;
  const body = [
    'Hi Kashmir Offbeat,',
    '',
    `I'm interested in ${itemName || 'your services'}.`,
    '',
    'Could you please share more details about:',
    '- Availability & dates',
    '- Packages & inclusions',
    '- Pickup/drop arrangements',
    '',
    'Looking forward to hearing from you!',
  ].join('\n');

  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isMobile) {
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Deprecated: kept so any stray callers don't break. New code should use
// saveSettingsToServer().
export function saveWhatsAppConfig(config) {
  localStorage.setItem(WHATSAPP_STORAGE_KEY, JSON.stringify(config));
}

export function saveContactConfig(config) {
  localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(config));
}
