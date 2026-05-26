<!-- @format -->

# whatsApp-bot

A minimal manual helper for extracting Nigerian phone numbers from Facebook comment text.

## What this repo now does

- Provides a small browser DevTools snippet for copying visible Facebook comments.
- Provides a local Node script to normalize, deduplicate, and save Nigerian numbers.
- No browser automation, no WhatsApp sending flow, and no profile/session management.

## Manual comment export

1. Open the desired Facebook post in a browser.
2. Scroll through all comments until the ones you want are visible.
3. Open DevTools and paste the contents of `devtools-extract-snippet.js` into the Console.
4. Paste the copied text into `data/source_comments.txt`.

## Extract numbers locally

Run:

```bash
pnpm install
pnpm run extract
```

The script reads `data/source_comments.txt`, normalizes Nigerian phone numbers to `234XXXXXXXXXX`, deduplicates them, and writes the result to `data/numbers.txt`.

## Output

- `data/numbers.txt`: normalized, deduplicated numbers
- `data/source_comments.txt`: your pasted comment text

## Notes

- The script only processes text already pasted into `data/source_comments.txt`.
- It does not contact Facebook or WhatsApp.
- If you want to use a different input file, edit `src/extract-comments.js`.

## Files kept

- `src/extract.js`: number extraction and normalization logic
- `src/extract-comments.js`: local extraction entry script

## Removed

- browser automation
- WhatsApp message flow
- profile/session handling
- extra helper modules
