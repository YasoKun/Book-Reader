# Ryan & Eva's Story Garden

A responsive, bilingual storybook reader for children, featuring English and Arabic stories about Ryan and Eva. The app is a dependency-free static site that can run locally or be published with GitHub Pages.

## Run locally

From the repository root:

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>. Stop the server with Ctrl+C.

## Add a book

Add a book object to `books.js`. Include an `id`, English and Arabic titles, a cover theme, reading time, and a `pages` array. Each page has `en` and `ar` story text. Use an existing `cover` value (`moon`, `cloud`, or `garden`) or add a matching illustration in `styles.css` and `index.html`.

The `BOOK_CREATION_PROMPT.md` file contains the reusable prompt for drafting and reviewing future stories. Keep each English and Arabic edition aligned in meaning, use child-safe themes, and test the story in both languages in the reader.

## Publish with GitHub Pages

The workflow in `.github/workflows/deploy.yml` publishes the static app whenever app files change on `main`. Before the first successful deployment, open the repository's **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**, and save. Then open **Actions → Deploy Story Garden to GitHub Pages** and choose **Run workflow** on `main`. The expected URL is `https://yasokun.github.io/Book-Reader/`; the deployment job also reports its published URL. New books are added to `books.js` and go live on the next push to `main`.

This is a static client-side app. Reading progress is stored in the current browser, so it is not synced across devices.
