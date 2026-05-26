function normalizeNigeriaNumber(raw) {
   if (raw == null) return null;

   let s = String(raw).trim().replace(/[\s\-()]/g, "");
   if (s.startsWith("+")) s = s.slice(1);
   if (s.startsWith("00")) s = s.slice(2);

   if (/^234[789][01]\d{8}$/.test(s)) return "+" + s;
   if (/^0[789][01]\d{8}$/.test(s)) return "+234" + s.slice(1);
   if (/^[789][01]\d{8}$/.test(s)) return "+234" + s;

   return null;
}

function isLikelyWhatsAppNigeriaNumber(normalized) {
   return typeof normalized === "string" && /^\+234[789][01]\d{8}$/.test(normalized);
}

function extractPhoneNumbersFromText(text) {
   const candidates = new Set([
      ...(String(text).match(/\+?\s*2\s*3\s*4[\s\-()]?[789][01][\s\d]{9,13}/g) || []),
      ...(String(text).match(/0[789][01]\d{8}/g) || []),
      ...(String(text).match(/\b[789][01]\d{8}\b/g) || [])
   ]);

   const numbers = new Set();
   const invalidNumbers = [];

   for (const cand of candidates) {
      const normalized = normalizeNigeriaNumber(cand);
      if (normalized && isLikelyWhatsAppNigeriaNumber(normalized)) {
         numbers.add(normalized);
      } else {
         invalidNumbers.push(String(cand).replace(/[^\d+]/g, ""));
      }
   }

   return {
      numbers,          // Set — runner does Array.from() on it
      csv: [...numbers].join(","),
      invalidNumbers    // renamed from invalid to match runner
   };
}

module.exports = { normalizeNigeriaNumber, isLikelyWhatsAppNigeriaNumber, extractPhoneNumbersFromText };