const WHATSAPP_STORAGE_KEY = 'kashmiroffbeat_whatsapp';
const CONTACT_STORAGE_KEY = 'kashmiroffbeat_contact';

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

export function getWhatsAppConfig() {
  try {
    const stored = localStorage.getItem(WHATSAPP_STORAGE_KEY);
    if (stored) return { ...defaults, ...JSON.parse(stored) };
  } catch {}
  return defaults;
}

export function saveWhatsAppConfig(config) {
  localStorage.setItem(WHATSAPP_STORAGE_KEY, JSON.stringify(config));
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

export function getContactConfig() {
  try {
    const stored = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (stored) return { ...contactDefaults, ...JSON.parse(stored) };
  } catch {}
  return contactDefaults;
}

export function saveContactConfig(config) {
  localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(config));
}
