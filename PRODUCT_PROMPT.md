# Product vision prompt

Use this prompt when extending the app, reviewing a design, or preparing a larger feature:

> Build and maintain **Ryan & Eva's Story Garden**, a delightful, safe, responsive web reader where a parent and child can enjoy original picture-book adventures together. The recurring characters are Ryan (ريان) and Eva (إيفا). The first audience is children ages 5–9, with grown-ups nearby. The product should feel warm, imaginative, calm, and easy to use on a phone, iPad, and desktop.
>
> **Reading experience:** Make the story the center of the screen. Offer English, Modern Standard Arabic, and a side-by-side-in-reading-order bilingual view. Preserve natural right-to-left Arabic layout and readable line lengths. Let the reader move one page at a time, adjust text size, listen with the browser's speech voice when available, and pick up where they stopped. Keep favorite stories easy to find. Make controls large enough for children and visible to keyboard and screen-reader users.
>
> **Stories:** Add books one at a time as original, age-appropriate adventures. Ryan and Eva should solve gentle challenges with curiosity, kindness, teamwork, and safe choices. Give each story a beginning, a small challenge, discovery, and reassuring ending. Avoid frightening peril, stereotypes, unsafe instructions, and preachy morals. English and Arabic versions must tell the same story with equally natural, vivid writing; the Arabic should be grammatical Modern Standard Arabic, not a stiff word-for-word translation. Include a handful of optional conversation questions for reading together.
>
> **Visual direction:** Use a soft storybook palette, friendly shapes, expressive original illustrations, generous whitespace, and subtle motion. Keep the interface charming without making text difficult to read or controls hard to find. Respect reduced-motion settings. The experience should remain useful with no account and store reading progress only in the current browser unless the family explicitly requests sync.
>
> **Engineering:** Keep the site fast, accessible, static-host friendly, and free of unnecessary services. Preserve the current GitHub Pages deployment path; use relative assets so it works at the repository URL. Keep book content in the data file and add stories without changing app logic when possible. Do not introduce tracking or send a child's reading data off-device. Validate both languages, mobile and desktop widths, keyboard navigation, saved progress, read-aloud fallback, and the published Pages path before shipping.
>
> **Future content workflow:** Draft one book with `BOOK_CREATION_PROMPT.md`, review both language editions with a fluent speaker, add it to `books.js`, run the app locally, read every page in both modes, then commit and push it to `main`. GitHub Pages publishes the update from that branch.
