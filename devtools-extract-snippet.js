(async () => {
   const sleep = ms => new Promise(r => setTimeout(r, ms));

   // Find modal scroll container
   const modal = [...document.querySelectorAll('div')]
      .find(el =>
         el.scrollHeight > el.clientHeight &&
         el.clientHeight > 300
      );

   if (!modal) {
      console.error("Modal scroll container not found");
      return;
   }

   console.log("Modal found:", modal);

   const clickButtons = () => {
      [...document.querySelectorAll('div[role="button"]')]
         .forEach(btn => {
            const t = btn.innerText?.toLowerCase() || "";

            if (
               t.includes("view more comments") ||
               t.includes("view previous comments") ||
               t.includes("more replies") ||
               t.includes("view replies") ||
               t.includes("see more")
            ) {
               btn.click();
            }
         });
   };

   let stable = 0;
   let lastHeight = 0;

   for (let i = 0; i < 80; i++) {

      modal.scrollTop = modal.scrollHeight;

      clickButtons();

      await sleep(2500);

      const h = modal.scrollHeight;

      if (h === lastHeight) stable++;
      else stable = 0;

      lastHeight = h;

      console.log(`Round ${i + 1} | stable=${stable}`);

      if (stable >= 6) break;
   }

   console.log("Extracting text...");

   const textBlocks = [...document.querySelectorAll('div')]
      .map(el => el.innerText?.trim())
      .filter(Boolean)
      .filter(t =>
         t.length > 5 &&
         t.length < 1000
      );

   const unique = [...new Set(textBlocks)];

   const text = unique.join("\n\n");
   console.log(text);

   // const blob = new Blob([text], { type: "text/plain" });

   // const url = URL.createObjectURL(blob);

   // const a = document.createElement("a");

   // a.href = url;
   // a.download = "facebook-comments.txt";

   // a.click();

   // URL.revokeObjectURL(url);

   console.log(`Done. copied ${unique.length} blocks.`);
})();