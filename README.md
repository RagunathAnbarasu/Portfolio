# Ragunath Anbarasu — portfolio

A static Astro portfolio for platform engineering, DevOps, and SRE opportunities. Production is hosted at **https://ragunathanbarasu.com** through the existing Netlify/GitHub connection.

## Development

Use **Node 24 LTS** (`nvm use`) and npm. The repository keeps one lockfile.

```sh
npm ci
npm run dev
```

The local site runs at `http://localhost:4321`. All core content, navigation, and contact links work without JavaScript. No runtime profile APIs, analytics, forms, CMS, or resume download are included.

## Content maintenance

- Update profile, contact details, the five employment roles, capabilities, and credentials in `src/data/profile.ts`.
- Maintain the four work summaries in `src/content/work/`. Markdown frontmatter is validated by the collection schema. Keep summaries between 150 and 250 words and identify the relevant employer, role, and period.
- Work achievements come from the owner's October 2026 resume. Keep approximate wording, distinguish effort from speed improvements, and publish cloud cost changes as percentages rather than currency amounts.
- Preserve the homepage anchors `about`, `projects`, `skills`, `testimonials`, and `contact` when changing sections.
- Update certification issue/expiration dates and individual earned-badge URLs from the [public Credly profile](https://www.credly.com/users/ragunath-anbarasu). Display dates instead of timeless active-status labels. Credential images belong to their respective issuer and link to verification pages; course badges are not represented as certifications.
- The CKA credential currently lists an expiration date of **November 10, 2026**. Review its record for any renewal before changing the displayed dates.
- Update the social preview's SVG text when the professional headline changes. Run `node scripts/generate-brand-assets.mjs` after updating artwork; it creates the PNG social preview, favicon, touch icon, and optimized badge images locally.

## Validation

```sh
npm run check
npm run build
npm test
npm run preview
```

The tests inspect built HTML for real page content without application JavaScript, unique metadata, valid local links and assets, legacy anchors, credential dates, work-summary length, and static 404 behavior. They require a completed build. GitHub Actions and Netlify run the checks, build, and tests on Node 24.

Before release, check mobile, tablet, and desktop layouts; keyboard navigation; reduced-motion settings; JavaScript-disabled access; and Lighthouse performance, accessibility, and SEO. Automated checks cannot verify the employer-reported outcomes, so changes to those claims should be reviewed against the owner's supplied evidence.

## Netlify deployment and rollback

Keep the existing Netlify site, domain, GitHub repository, and production branch. The tracked configuration uses `npm run check && npm run build && npm test`, publishes `dist`, and pins Node 24. There is no SPA fallback: Astro emits each work page and a standalone `404.html`.

1. Open a pull request from the feature branch to `main`.
2. Review the existing site's Netlify Deploy Preview, if pull request previews are enabled. Verify direct work-page URLs, missing-page HTTP 404 responses, contact links, metadata, and mobile rendering.
3. Merge after the preview and required checks pass; the existing GitHub connection should trigger production deployment.
4. Verify the production domain after deployment. If needed, restore the previous successful deploy from Netlify's deploy history and revert the release commit before the next automatic deploy. Keep the prior deploy available until the new release is verified.

Changing the canonical domain requires updating `astro.config.mjs` and `public/robots.txt` together. Keep preview URLs out of canonical and social metadata.
