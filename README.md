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

1. Copy an existing post directory (e.g. `aleatory-or-epistemic/`) to `your-new-slug/`.
2. Edit `your-new-slug/index.html` — keep the `<head>` block (it has the MathJax loader).
3. Put any images in `assets/images/` and reference them as `/assets/images/<file>`.
4. Add an entry to the post list in `index.html`.
5. Run `npm run format`.
6. Push.

Math: use `$...$` inline and `$$...$$` display math, exactly like LaTeX.
