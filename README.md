# Boldex Technologies — static website (HTML, CSS, JavaScript)

A static copy of the Next.js site, with the same pages, content, design, animations and contact form.
No server code, database or build step is needed. It runs on any host that serves files.

## What's in this folder

```
public_html/                  ← upload the CONTENTS of this folder to the server
  index.html                  Home
  about/  services/  solutions/  industries/  portfolio/  contact/
  services/<service>/         8 service detail pages
  404.html                    "Page not found" page
  assets/css/styles.css       All styles (brand colours are in the :root block)
  assets/js/main.js           Menu, banner slider, scroll animations, contact form
  assets/images/  assets/fonts/
  .htaccess                   404 page, old WordPress redirects, caching, security headers
  sitemap.xml  robots.txt  manifest.webmanifest  icon.svg  apple-icon.png
preview.mjs                   Local preview server (not part of the website)
logo/  slider/                Original artwork (not part of the website)
```

## Preview on this PC

```bash
node preview.mjs
```

Then open http://localhost:4173. Pages use folder-style addresses (`/about/`), so opening the
HTML files directly with a double-click won't navigate properly. Use the preview server instead.

## Publish to www.boldextechnologies.com.ng

1. In cPanel → File Manager, open `public_html` on the server and upload everything inside the local
   `public_html` folder, including the hidden `.htaccess` file. Turn on "Show Hidden Files" to see it.
2. Once the SSL certificate is active (cPanel → SSL/TLS Status), open `.htaccess` and remove the `#`
   from the four "Force HTTPS and the www address" lines.
3. **Activate the contact form (one time only):** open https://www.boldextechnologies.com.ng/contact/,
   submit a test request, then open the **boldextechnologies@gmail.com** inbox and click
   **Activate Form** in the email from FormSubmit. Submissions after that go straight to Gmail.
   Check the Spam folder if the email doesn't show up.
4. Submit the sitemap in Google Search Console: `https://www.boldextechnologies.com.ng/sitemap.xml`.

## How the contact form reaches Gmail

A static site can't send email by itself. The form posts to **FormSubmit** (https://formsubmit.co), a free
service that forwards each submission to boldextechnologies@gmail.com:

- The email subject is "New Website Enquiry — *service* — Boldex Technologies", with all fields in a table.
  Clicking **Reply** answers the visitor directly.
- The visitor gets an automatic "we've received your request" confirmation email.
- Spam protection works like the original: a hidden honeypot field, a minimum fill time, a limit of
  5 requests per 10 minutes, plus FormSubmit's own spam filtering.
- Validation, error messages, the success screen and pre-selecting the service from `?service=` work
  exactly as before.

**Optional: hide the Gmail address from the page source.** After activation, FormSubmit's email includes a
random alias string. Replace `boldextechnologies@gmail.com` with that alias in `formEndpoint` near the top of
`assets/js/main.js` and in the form's `action` attribute in `contact/index.html`.

Features of the original that needed a server and have no static equivalent: saving leads to the MySQL
database, the webhook, the server-side rate limit and the optional Cloudflare Turnstile CAPTCHA.

## Light & dark mode

- Visitors switch with the sun/moon button in the header. On phones it's the **Dark mode** switch inside
  the menu.
- On a first visit the site follows the device setting (light or dark). Once a visitor picks a mode, that
  choice is remembered in their browser.
- The dark banners, footer and call-to-action panels look the same in both modes. The light page sections,
  cards, forms, header and menu switch to dark navy.
- Dark-mode colours are in `assets/css/styles.css`, at the bottom under "Light & dark mode"
  (`html[data-theme="dark"] { --surface: …; --fg: …; }`). Change those values to adjust the dark palette.

## Making changes

- **Text:** edit the page's `index.html`. The header, footer and floating WhatsApp button are repeated in
  every page, so change them in all 16 HTML files. A "Replace in files" search (VS Code: Ctrl+Shift+H) is the
  easiest way.
- **Phone, email, WhatsApp:** replace them in all HTML files, and also in the `CONFIG` block at the top of
  `assets/js/main.js`.
- **Brand colours:** edit the variables in the `:root { --brand-… }` block in `assets/css/styles.css`.
- **After editing CSS or JS:** change the `?v=20261114` number at the end of the `styles.css` and `main.js`
  links in the HTML pages, so visitors' browsers load the new version.
- **Styling classes:** the pages use the original design's utility classes (`text-ink`, `bg-brand`,
  `rounded-full`, …). Classes already used on the site will work anywhere. For new styling, add your own CSS
  at the bottom of `styles.css`.
