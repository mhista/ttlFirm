#!/usr/bin/env node
/**
 * The firm's Google reviews, as documents Sanity can hold.
 *
 *   node scripts/seed-reviews.mjs            # writes seed/reviews.ndjson
 *
 * Then, from the sanity/ folder:
 *   npx sanity dataset import ../seed/reviews.ndjson production --replace
 *
 * WHERE THIS CONTENT CAME FROM, AND WHAT IS NOT IN IT
 *
 * These were read off the firm's own Google Business Profile in September
 * 2026 and transcribed. Several were captured from Google's collapsed view,
 * which cuts a long review off at "… More" — those carry `truncated: true`,
 * are stored with exactly the words that were visible and nothing invented to
 * fill the gap, and render with a link to read the rest on Google. Two
 * reviewers left a rating and no words at all; they are here with the rating
 * only.
 *
 * Nobody should hand-edit the wording of a review in the Studio. If a review
 * reads oddly, that is how the client wrote it, and rewriting someone else's
 * review is both dishonest and, for an attorney, an RPC 7.1 problem.
 *
 * Once the Business Profile API is approved (see REVIEWS.md) the sync takes
 * over and fills in every truncated review with its full text. This file is
 * the stopgap until then, and the fallback if the sync is ever switched off.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Google's own profile-contribution links, as shown on each review. */
const profile = (id) => `https://www.google.com/maps/contrib/${id}/reviews?hl=en-GB`;

/**
 * Every review below is stored under a stable `_id` derived from the
 * reviewer, so re-importing updates rather than duplicates.
 */
const REVIEWS = [
  {
    key: "jacob-marin-jr",
    name: "Jacob Marin Jr",
    rating: 5,
    relativeDate: "19 hours ago",
    dateSubmitted: "2026-09-16",
    caseType: "personal-injury",
    truncated: true,
    text:
      "I have to say, Turuchi is an amazing lawyer! She was extremely professional, responsive, and kept me informed throughout the entire process. She went above and beyond to help me resolve my personal injury case and made what could have been …",
    profileId: "102026818824002621613",
    featured: true,
  },
  {
    key: "mister-m",
    name: "Mister M",
    rating: 5,
    relativeDate: "3 weeks ago",
    dateSubmitted: "2026-08-27",
    caseType: "personal-injury",
    truncated: true,
    text:
      "My wife and I were in a really bad car accident, and the stress was overwhelming. To make matters worse, we discovered a major mistake and omission on the initial police report that could have ruined our case. The team at the Turuchi Law …",
    reply:
      "Thank you so much for your thoughtful review and for trusting the Turuchi Law Firm with your case. We are grateful we could advocate for you and your wife and guide you through the process. Your recommendation truly means a lot to us.",
    profileId: "110445328549475267327",
    featured: true,
  },
  {
    key: "z",
    name: "Z",
    rating: 5,
    relativeDate: "3 weeks ago",
    dateSubmitted: "2026-08-27",
    caseType: "personal-injury",
    truncated: true,
    text:
      "After our severe accident, my husband and I were completely lost. Dealing with injuries is hard enough, but navigating the legal side felt impossible, especially when we realized the police report was missing critical information. The …",
    reply:
      "Thank you so much for your kind words and for trusting the Turuchi Law Firm to represent you and your husband. It was truly a pleasure advocating for you both, and we are grateful for the recommendation.",
    profileId: "112678741827252149078",
  },
  {
    key: "lorena-diaz-molero",
    name: "Lorena Andrea Diaz Molero",
    rating: 5,
    relativeDate: "3 weeks ago",
    dateSubmitted: "2026-08-27",
    caseType: "personal-injury",
    truncated: true,
    text:
      "An incredible trial firm that gets massive results. They took our complex legal matter to federal court, won a huge battle against a powerful opponent, and secured a life-changing outcome for our family. They are diligent, aggressive …",
    reply:
      "Thank you so much for your high recommendation and trusting our firm. Facing a powerful opponent in federal court is incredibly overwhelming and stressful. We are proud to have stood by your family fighting hard for the justice you deserve. Securing a life-changing victory is exactly why we do this work. We wish your family the absolute best.",
    profileId: "108858178924983324627",
    featured: true,
  },
  {
    key: "muki-mukaila",
    name: "Muki Mukaila",
    rating: 5,
    relativeDate: "3 weeks ago",
    dateSubmitted: "2026-08-27",
    caseType: "personal-injury",
    truncated: true,
    text:
      "I cannot thank the Turuchi Law Firm enough for their incredible representation. My case was highly complex and required intense litigation, but they never backed down. Throughout the entire difficult process, the team stayed in constant …",
    reply:
      "Thank you for choosing the Turuchi Law Firm and sharing your incredible success story. Facing complex litigation is never easy, but our team is dedicated to staying in constant communication and fighting relentlessly for our clients. We are thrilled that our hard work resulted in securing the absolute policy limits for you. Your appreciation of our professionalism and expertise means the world to us.",
    profileId: "104599858119786391517",
  },
  {
    key: "tobi-adebowale",
    name: "Tobi Adebowale",
    rating: 5,
    relativeDate: "a month ago",
    dateSubmitted: "2026-08-17",
    caseType: "general",
    truncated: true,
    text:
      "Excellence! That's an apt one-word description for The Turuchi Law Firm, LLC and it flows from the attorney to the service delivery by the support team. The case in-take was the quickest I experienced in my search for legal services, and …",
    reply:
      "Thank you for your review. As a fellow attorney, your high praise means a great deal to us. We are glad we could provide the relief and empowerment you needed. Thank you for trusting The Turuchi Law Firm, LLC.",
    profileId: "113622602276490159416",
  },
  {
    key: "nkemakonam-nwosu",
    name: "Nkemakonam Nwosu",
    rating: 5,
    relativeDate: "2 months ago",
    dateSubmitted: "2026-07-17",
    caseType: "personal-injury",
    truncated: true,
    text:
      "I was in a car accident and sustained injuries and my case ended up having some very complex insurance issues that made things look incredibly bleak. I honestly didn't know if I would be able to recover anything at all. The Turuchi law firm …",
    reply:
      "Thank you so much for sharing your story and recommending our firm. Navigating complex insurance issues while recovering from injuries is extremely stressful, and we are glad we could take that burden off your shoulders. Thank you for trusting The Turuchi Law Firm, LLC during such a challenging time, and we wish you the very best in your continued recovery.",
    profileId: "115222133248440149146",
    featured: true,
  },
  {
    key: "carolina-mc",
    name: "Carolina MC",
    rating: 5,
    relativeDate: "2 months ago",
    dateSubmitted: "2026-07-17",
    caseType: "general",
    // Rating only — this reviewer left no words. Stored as such rather than
    // dressed up with a sentence she never wrote.
    text: "",
    reply:
      "Thank you so much for the 5 star rating! We appreciate your support and are glad you had a great experience at The Turuchi Law Firm, LLC.",
    profileId: "100374359826001535780",
  },
  {
    key: "paul-barrueto",
    name: "Paul Barrueto",
    rating: 5,
    relativeDate: "3 months ago",
    dateSubmitted: "2026-06-17",
    caseType: "personal-injury",
    truncated: true,
    text:
      "I highly recommend Turuchi Law Firm to anyone looking for attorneys who truly fight for their clients. After having a bad experience with another law firm that failed to properly handle my case or move it forward, I came to Turuchi Law Firm …",
    reply:
      "Thank you so much for this incredible recommendation and for detailing your experience with our firm. We know how frustrating it is to feel stagnant with your legal representation, and we are so glad we could step in and completely turn things around for you. Hearing that you felt genuinely cared for through out the whole process is the ultimate compliment for us. Thank you for trusting us with your case.",
    profileId: "106092052484486650216",
    featured: true,
  },
  {
    key: "imari-romero",
    name: "imari romero",
    rating: 5,
    relativeDate: "3 months ago",
    dateSubmitted: "2026-06-17",
    caseType: "general",
    truncated: true,
    text:
      "I would like to take some time to speak about the amazing people at Turuchi Law Firm. Two years ago I was at risk of losing my case and went to more than nine different law firms looking for help. All of them turned me away, told me my case …",
    reply:
      "Thank you for your incredibly moving words and for taking the time to share your journey. Hearing that you have finally found peace and closure after all these years mean the world to our team. It was an absolute privilege to stand by your side, listen to your story and fight for the justice you always deserved. Your resilience through out the process was truly inspiring. I am so grateful you trusted The Turuchi Law Firm to fight for you. While we will miss our regular updates, we are incredibly happy for you as you begin this next chapter. Wishing you the very best moving forward.",
    profileId: "101822959896386247937",
    featured: true,
  },
  {
    key: "josh-robinson",
    name: "Josh Robinson",
    rating: 5,
    relativeDate: "4 months ago",
    dateSubmitted: "2026-05-17",
    caseType: "general",
    text:
      "Great representation! Went above and beyond ! Thank you Turuchi law ! Top tier law firm ! If you want more than a few g's call turuchi's !",
    reply:
      "Thank you so much for the high praise! We always strive to go above and beyond for our clients, and we are thrilled to hear that you had a top tier experience with us. Your recommendations mean the world to us. Thank you once again.",
    profileId: "102826895354898818875",
  },
  {
    key: "chijioke-junior",
    name: "Chijioke Junior",
    rating: 5,
    relativeDate: "a year ago",
    dateSubmitted: "2025-09-17",
    caseType: "general",
    truncated: true,
    text:
      "I had the pleasure of working with The Turuchi Law Firm, and I couldn't be more impressed with their professionalism, expertise, and dedication. From the initial consultation to the resolution of my case, the team was incredibly thorough, …",
    reply:
      "Thank you so much for taking the time to share your experience. We know how stressful legal situations can be, and our goal is always to provide clear communication and reliable guidance every step of the way. Your kind words about our professionalism and dedication are truly appreciated.",
    profileId: "110797818671057276723",
  },
  {
    key: "okoro-egbeichi",
    name: "Okoro Egbeichi",
    rating: 5,
    relativeDate: "a year ago",
    dateSubmitted: "2025-09-17",
    caseType: "general",
    text:
      "She exceeded all my expectations. Her professionalism and expertise gave me confidence throughout the entire process. I couldn't have asked for better representation.",
    reply:
      "Thank you so much for the glowing review! We pride ourselves in delivering dedicated representation that builds true confidence. We are thrilled to hear your expectations were exceeded through out the process!",
    profileId: "109418864611932828638",
  },
  {
    key: "kaylie-rivera",
    name: "Kaylie Rivera",
    rating: 5,
    relativeDate: "a year ago",
    dateSubmitted: "2025-09-17",
    caseType: "general",
    text:
      "Turuchi Law Firm has helped me a lot to make my parents legal here. I appreciate them so much!",
    reply: "Thank you so much for trusting the Turuchi Law Firm!",
    profileId: "107415943896615540041",
  },
  {
    key: "tonju-gomez",
    name: "Tonju Gomez",
    rating: 5,
    relativeDate: "a year ago",
    dateSubmitted: "2025-09-17",
    caseType: "general",
    // Google's own translation from Spanish; the notice is required when a
    // translated review is displayed.
    translatedFrom: "Spanish",
    text:
      "The best law firm in the Tri-State area. They speak Spanish and are highly recommended for all Spanish speakers, offering responsible and reliable services. Don't hesitate to contact them for any legal matters you may have.",
    reply:
      "Thank you so much for your recommendation! We are proud to be a reliable and responsible support for the entire Hispanic community in the Tri-State area.",
    profileId: "118288631754719869056",
  },
  {
    key: "bryan-avalos-cordova",
    name: "Bryan Avalos cordova",
    rating: 5,
    relativeDate: "11 months ago",
    dateSubmitted: "2025-10-17",
    caseType: "general",
    translatedFrom: "Spanish",
    text: "Thank you for helping me, lawyer. Now I feel calmer, problem solved.",
    reply:
      "Thank you so much for your trust! We're so glad to hear you're feeling better and that we were able to resolve your issue.",
    profileId: "100860273515533373988",
  },
  {
    key: "g-vito",
    name: "G Vito",
    rating: 5,
    relativeDate: "a year ago",
    dateSubmitted: "2025-09-17",
    caseType: "general",
    text: "",
    reply:
      "Thank you so much for the 5 star rating! We appreciate your support and are glad you had a great experience at the Turuchi Law Firm!",
    profileId: "100295690303513116052",
  },
];

const docs = REVIEWS.map((r, i) => ({
  _id: `testimonial-google-${r.key}`,
  _type: "testimonial",
  name: r.name,
  role: "Google review",
  testimonial: r.text,
  rating: r.rating,
  caseType: r.caseType || "general",
  featured: Boolean(r.featured),
  order: i,
  status: "active",
  approved: true,
  source: "google",
  sourceUrl: profile(r.profileId),
  relativeDate: r.relativeDate,
  dateSubmitted: r.dateSubmitted,
  truncated: Boolean(r.truncated),
  ...(r.reply ? { ownerReply: r.reply } : {}),
  ...(r.translatedFrom ? { translatedFrom: r.translatedFrom } : {}),
}));

const out = resolve(root, "seed", "reviews.ndjson");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n", "utf8");

const withText = docs.filter((d) => d.testimonial).length;
const truncated = docs.filter((d) => d.truncated).length;
const replied = docs.filter((d) => d.ownerReply).length;

console.log(`wrote ${out}  (${docs.length} reviews)`);
console.log(`  ${withText} with text, ${docs.length - withText} rating-only`);
console.log(`  ${truncated} captured from Google's collapsed view — the sync fills these in`);
console.log(`  ${replied} carry the firm's reply`);
console.log("\nImport with:");
console.log("  cd sanity");
console.log("  npx sanity dataset import ../seed/reviews.ndjson production --replace\n");
