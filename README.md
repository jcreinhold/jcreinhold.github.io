# jcreinhold.github.io

Personal website of Jacob Reinhold — plain HTML + CSS + MathJax, hosted on GitHub Pages.
No build step, no dependencies: edit the HTML and push.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Formatting

The site uses [Prettier](https://prettier.io) to keep the HTML/CSS consistent.

```sh
npm install           # one-time
npm run format        # format all files
npm run format:check  # verify without writing (CI-friendly)
```

## Writing a new post

Posts live in `posts/<slug>/index.html` and are served at `/posts/<slug>/`.

1. Copy an existing post directory (e.g. `posts/aleatory-or-epistemic/`) to `posts/your-new-slug/`.
2. Edit `posts/your-new-slug/index.html` — keep the `<head>` block (it has the MathJax loader), and update the title, description, canonical URL, date, and article content.
3. Put any images in `assets/images/` and reference them as `/assets/images/<file>`.
4. Add an entry to the post list in `index.html` linking to `/posts/your-new-slug/`, and add the canonical URL to `sitemap.xml`.
5. Run `npm run format`.
6. Review the changes in a local preview, then push to publish.

Math: use `$...$` inline and `$$...$$` display math, exactly like LaTeX.

## Search Console verification

`google0547fe8b8ff10730.html` is the HTML ownership-verification file for Google Search Console.
Keep its filename, contents, and location at the site root intact to retain this verification method.
