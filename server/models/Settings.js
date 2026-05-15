const mongoose = require('mongoose');

const SINGLETON_KEY = 'site';

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    default: SINGLETON_KEY,
    unique: true,
  },
  whatsapp: {
    phone: {
      type: String,
      default: '919876543210',
    },
    template: {
      type: String,
      default: `Hi Kashmir Offbeat! 👋\n\nI'm interested in *{itemName}*.\n\nCould you please share more details about:\n- Availability & dates\n- Pricing & packages\n- Pickup/drop arrangements\n\nLooking forward to hearing from you!`,
    },
  },
  contact: {
    contactPhone: {
      type: String,
      default: '+91 194 2501234',
    },
    contactEmail: {
      type: String,
      default: 'info@kashmiroffbeat.com',
    },
  },
}, { timestamps: true });

settingsSchema.statics.SINGLETON_KEY = SINGLETON_KEY;

settingsSchema.statics.getSingleton = async function () {
  let doc = await this.findOne({ key: SINGLETON_KEY });
  if (!doc) {
    doc = await this.create({ key: SINGLETON_KEY });
  }
  return doc;
};

module.exports = mongoose.model('Settings', settingsSchema);
