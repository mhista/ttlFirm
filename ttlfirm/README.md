This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sanity CMS

Content is managed in Sanity (studio lives in `/sanity`). Pages fetch their
content server-side via `lib/sanity.client.js` + queries in
`lib/sanity.queries.js`, and re-fetch every `revalidate` (60s, set per-page
and as a floor in `app/layout.jsx`).

Site-wide info (phone, email, address, social links, stats) lives in the
**Site Settings** singleton document and is fetched once in `app/layout.jsx`,
then made available to the Nav, StickyNav, and Footer via
`lib/siteSettingsContext.js` (`useSiteSettings()`), instead of every
component hardcoding its own copy.

### Instant updates via webhook (optional but recommended)

By default, an edit in Sanity can take up to ~1–2 minutes to appear on the
live site (Sanity's CDN cache + Next's 60s ISR window). To make edits show
up within seconds instead:

1. Add an env var `SANITY_REVALIDATE_SECRET` (any long random string) to
   `.env.local` and to your Vercel project's environment variables.
2. In [sanity.io/manage](https://sanity.io/manage) → your project → **API →
   Webhooks**, add a webhook:
   - URL: `https://<your-domain>/api/revalidate?secret=<same secret>`
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - HTTP method: `POST`

That hits `app/api/revalidate/route.js`, which busts the whole site's cache
on every publish.
