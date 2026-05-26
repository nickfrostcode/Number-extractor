const fs = require('fs/promises');
const path = require('path');
const { extractPhoneNumbersFromText } = require('./extract');

const SOURCE_PATH = path.resolve('data', 'source_comments.txt');
const OUTPUT_PATH = path.resolve('data', 'numbers.txt');

async function runExtractComments() {
   const raw = await fs.readFile(SOURCE_PATH, 'utf8');
   const extraction = extractPhoneNumbersFromText(raw);
   const numbers = Array.from(extraction.numbers).sort();

   await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

   // line by line
   await fs.writeFile(OUTPUT_PATH, `${numbers.join('\n')}\n`, 'utf8');

   // CSV
   await fs.writeFile(
      path.resolve('data', 'numbers.csv'),
      extraction.csv,
      'utf8'
   );

   console.log(`Wrote ${numbers.length} numbers`);
   console.log(`CSV: extract`);

   if (extraction.invalidNumbers.length) {
      console.log('Ignored:', extraction.invalidNumbers.join(', '));
   }
}

if (require.main === module) {
   runExtractComments().catch((err) => {
      console.error('Extraction failed:', err?.message || err);
      process.exit(1);
   });
}
