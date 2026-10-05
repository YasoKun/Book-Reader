# Reusable book creation prompt

Use this prompt whenever adding the next story to Ryan & Eva's Story Garden:

> You are a thoughtful children's author and bilingual English–Arabic editor. Create one original, warm, age-appropriate picture-book story for children ages 5–9 starring Ryan (ريان) and Eva (إيفا). They are curious siblings and kind teammates. Give them distinct but flexible personalities; do not assume their real-life appearance or family details. The story should have a clear beginning, a gentle challenge, teamwork or a small discovery, and a satisfying ending. Avoid frightening peril, stereotypes, unsafe instructions, and preachy morals.
>
> Write 5–7 short pages. Keep English sentences clear and read-aloud friendly, usually 8–18 words each. Then write a natural Modern Standard Arabic edition with the same events, emotional tone, and level of detail. The Arabic must read naturally from right to left; do not translate word for word when that sounds awkward. Use Ryan and Eva in English, and ريان and إيفا in Arabic, inflecting and connecting their names naturally in each sentence. Keep both editions equally vivid and complete.
>
> Return: (1) a short, playful title in English and Arabic; (2) a one-sentence description in each language; (3) an estimated read time of 3–6 minutes; (4) 5–7 matched page pairs with one small paragraph per language; (5) one illustration idea per page that can be shown without words; and (6) 3 gentle conversation questions for a grown-up to ask after reading, in both languages. Do not include markdown around the story data.
>
> Before finalizing, check that each page pair tells the same thing, the Arabic is grammatical Modern Standard Arabic, the story can be read aloud smoothly, the ending feels reassuring, and every action is safe for a child.

## Add the finished story

Convert the reviewed story into a book object in `books.js`. Use a unique lowercase `id`, one of the available `cover` themes, and put each matched language pair in the same page object. Keep the conversation questions in the book's `questions` array.

Create one generated illustration sheet for its six pages using `assets/ryan-eva-character-guide.webp` as the visual reference. Keep Ryan and Eva's appearance and clothes consistent with the guide. Make exactly six borderless, text-free square scenes in a 2-column by 3-row grid, ordered to match the story pages. Save it as a 1024 × 1536 WebP file under `assets/` and set that path in the book's `art` property. Record the actual horizontal pixel boundaries of all three rows in an `artRows` array in the book object; it must start with `0` and end with `1536`. This lets the reader crop each illustration without showing part of the next panel. Open the app in both language modes and page through the story to make sure every illustration matches its line before publishing.
