# leroy9472.github.io

Source for my personal academic homepage — **[leroy9472.github.io](https://leroy9472.github.io/)**.

Built with [Jekyll](https://jekyllrb.com/) and deployed via GitHub Pages. The
theme is adapted from
[RayeRen/acad-homepage.github.io](https://github.com/RayeRen/acad-homepage.github.io),
customized for a lighter layout, an indigo/amber palette, and small
micro-interactions.

## Local development

```bash
bundle install
bundle exec jekyll serve
# → http://127.0.0.1:4000
```

Requires Ruby 3.x. On Apple Silicon macOS, install a modern Ruby with
`brew install ruby` and prepend it to `PATH`.

## Layout

- `_pages/about.md` — main content (About, Education, Publications, Internship, Contact).
- `_config.yml` — site metadata + sidebar profile (name, avatar, links).
- `_data/navigation.yml` — top nav items.
- `_includes/` — layout partials (masthead, sidebar, footer, head).
- `assets/css/main.scss` — theme + custom overrides (palette, typography, timeline, cards).
- `assets/js/nav-active.js` — scroll-spy, reveal-on-scroll, greedy-nav workaround.
- `img/`, `images/` — assets (avatar, QR codes, publication thumbnails, favicons).

## License

Content © Zizhen Li. Template code retains the original
[MIT license](./LICENSE) from acad-homepage.
