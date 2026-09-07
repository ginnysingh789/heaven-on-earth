// Escape user-supplied text so it is matched literally inside a RegExp.
// Prevents ReDoS and unintended regex behaviour when search terms are used
// in Mongoose queries. Plain-text searches are unaffected.
const escapeRegex = (str = '') =>
  String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = { escapeRegex };
