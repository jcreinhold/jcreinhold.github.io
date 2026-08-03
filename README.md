# jcreinhold.github.io

Personal website of Jacob Reinhold — plain HTML + CSS + MathJax, hosted on GitHub Pages.
No build step, no dependencies: edit the HTML and push.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Writing a new post

1. Copy an existing post directory (e.g. `aleatory-or-epistemic/`) to `your-new-slug/`.
2. Edit `your-new-slug/index.html` — keep the `<head>` block (it has the MathJax loader).
3. Put any images in `assets/images/` and reference them as `/assets/images/<file>`.
4. Add an entry to the post list in `index.html`.
5. Push.

Math: use `$...$` inline and `$$...$$` display math, exactly like LaTeX.

## Deploy / DNS (one-time)

The `CNAME` file points GitHub Pages at `www.jcreinhold.com`.

1. Push this repo to GitHub as `jcreinhold/jcreinhold.github.io` (public).
2. Repo → **Settings → Pages** — it should auto-detect the site on the `main` branch.
3. At the DNS provider for `jcreinhold.com`:
   - `CNAME` record: `www` → `jcreinhold.github.io`
   - Apex `A` records: `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - (remove the old A records pointing at the DigitalOcean droplet)
4. Back in **Settings → Pages**: wait for the DNS check to pass, then tick **Enforce HTTPS**.
   GitHub auto-provisions and renews the Let's Encrypt certificate.
5. Verify https://www.jcreinhold.com works, *then* destroy the droplet.
