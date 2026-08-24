import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Sanity webhook endpoint — call this from a Sanity webhook (Settings →
// API → Webhooks in sanity.io/manage) whenever content is created,
// updated, or deleted, so the live site updates within seconds instead of
// waiting out Sanity's CDN cache + Next's 60s ISR window.
//
// Setup:
// 1. Add SANITY_REVALIDATE_SECRET to your env vars (.env.local and Vercel
//    project settings) — any long random string.
// 2. In sanity.io/manage → your project → API → Webhooks, add a webhook:
//    URL: https://<your-domain>/api/revalidate?secret=<same secret>
//    Dataset: production
//    Trigger on: Create, Update, Delete
//    HTTP method: POST
//    (Filter is optional — leaving it blank revalidates on any change.)
export async function POST(request) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET is not configured on the server." },
      { status: 500 }
    );
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret." }, { status: 401 });
  }

  // Bust every route's cache. Simpler and more reliable than trying to map
  // every Sanity document type to the exact set of pages it can affect
  // (practice areas show up in the homepage, the practice list, their own
  // detail page, and the sidebar of every sub-service page, for example).
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
