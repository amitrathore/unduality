# Unduality

A static, responsive launch site and first interactive practice for the Unduality open inquiry.

The public site also includes an upcoming-book page at `/book/`, based on the project's 22-dialogue working outline, and a coming-soon Unduality Guides page at `/guides/`.

## Local preview

Because the site uses root-relative asset paths, serve it locally rather than opening `index.html` directly:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

The site has no build step. Configure GitHub Pages to deploy from the repository root on the primary branch. `CNAME` binds the deployment to `www.unduality.com`; the DNS provider must point the `www` CNAME record to the repository's `github.io` hostname.

## Before public launch

- Replace the temporary `mailto:` signup behavior in `script.js` with the chosen email provider.
- The Terms and Privacy Policy were rewritten for Unduality using Yvatar's public legal pages as a structural reference; confirm the legal operator, jurisdiction, address, liability terms, and privacy disclosures with counsel before launch.
- Confirm that `hello@unduality.com` receives mail.
- Have practice and safety language reviewed by a licensed clinician familiar with dissociation and contemplative practice.
- Have qualified counsel confirm the legal operator, governing jurisdiction, address, liability language, and privacy disclosures before public launch.
- Test live Open Graph rendering after DNS and Pages are active.
