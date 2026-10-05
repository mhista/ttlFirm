#!/usr/bin/env node
/**
 * Finds out why email isn't arriving.
 *
 *   node scripts/email-doctor.mjs                 # check the configuration
 *   node scripts/email-doctor.mjs --send you@…    # actually send a test
 *
 * FIRST, THE THING PEOPLE GET WRONG: this site does not use SMTP. It uses
 * Azure Communication Services Email, which is an HTTPS API. There is no port
 * 587, no SMTP username, no TLS setting, and nothing a mail client would
 * recognise. If someone is looking at SMTP settings they are looking in the
 * wrong place.
 *
 * What can actually be wrong, in the order it usually is:
 *
 *  1. The environment variables are set locally but not on the host. `.env.local`
 *     is not deployed — Vercel, Azure Static Web Apps and Netlify each need them
 *     entered in their own dashboard, and a redeploy after.
 *  2. The sender domain is not finished. In Azure the Email Communication
 *     Service and the Communication Service are TWO resources, and the domain
 *     has to be Verified in the first AND connected to the second. A domain
 *     sitting at "Pending" sends nothing.
 *  3. SENDER_EMAIL_ADDRESS is not on a domain this resource owns. It has to be
 *     the exact MailFrom address Azure shows, e.g.
 *     DoNotReply@abc123....azurecomm.net, not info@turuchilawfirm.com.
 *  4. It sent and went to junk. Azure-managed domains have no reputation, so
 *     mail from them often lands in Junk or Quarantine rather than the inbox.
 *  5. The free tier ran out. Azure-managed domains are for testing and are rate
 *     limited; a custom verified domain is what production needs.
 *
 * This script tells you which of those it is.
 */
import { EmailClient, KnownEmailSendStatus } from "@azure/communication-email";
import { loadEnv } from "./load-env.mjs";

// Same reason as the other scripts: a plain node run does not read .env.local.
loadEnv();

const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  bad: (s) => `\x1b[31m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`,
};

const CONNECTION = process.env.ACS_CONNECTION_STRING;
const SENDER = process.env.SENDER_EMAIL_ADDRESS;
const RECIPIENT = process.env.LEAD_RECIPIENT_EMAIL || "info@turuchilawfirm.com";

const sendIndex = process.argv.indexOf("--send");
const sendTo = sendIndex > -1 ? process.argv[sendIndex + 1] : null;

console.log(c.b("\nEmail doctor — Azure Communication Services\n"));

/* ------------------------------------------------------------ 1. the vars */
let fatal = false;

if (!CONNECTION) {
  console.log(`${c.bad("MISSING")}  ACS_CONNECTION_STRING`);
  fatal = true;
} else {
  const endpoint = /endpoint=([^;]+)/i.exec(CONNECTION)?.[1];
  const hasKey = /accesskey=/i.test(CONNECTION);
  console.log(`${c.ok("SET")}      ACS_CONNECTION_STRING`);
  console.log(`          endpoint ${endpoint || c.bad("not found in the string")}`);
  if (!endpoint || !hasKey) {
    console.log(
      `          ${c.bad("This does not look like a connection string.")} It should read\n` +
        `          ${c.dim("endpoint=https://<name>.communication.azure.com/;accesskey=<key>")}`
    );
    fatal = true;
  }
}

if (!SENDER) {
  console.log(`${c.bad("MISSING")}  SENDER_EMAIL_ADDRESS`);
  fatal = true;
} else {
  console.log(`${c.ok("SET")}      SENDER_EMAIL_ADDRESS  ${SENDER}`);
  const domain = SENDER.split("@")[1] || "";
  if (domain.endsWith("azurecomm.net")) {
    console.log(
      `          ${c.warn("This is an Azure-managed domain.")} Fine for testing, but it is\n` +
        `          rate limited and its mail very often lands in Junk. Production wants a\n` +
        `          verified custom domain.`
    );
  } else {
    console.log(
      `          ${c.dim(`Custom domain (${domain}). It must be Verified in the Email`)}\n` +
        `          ${c.dim("Communication Service AND connected to the Communication Service.")}`
    );
  }
}

console.log(`${c.dim("          Enquiries are addressed to " + RECIPIENT)}\n`);

if (fatal) {
  console.log(c.bad("Cannot go further until those are set.\n"));
  console.log("Locally they belong in .env.local. On the host they go in its own");
  console.log("environment settings, and the site has to be redeployed afterwards —");
  console.log(".env.local is never uploaded.\n");
  process.exit(1);
}

if (!sendTo) {
  console.log(c.b("Configuration looks sane. To prove it end to end:\n"));
  console.log(c.dim("  node scripts/email-doctor.mjs --send your@email.com\n"));
  console.log("That sends a real message and prints Azure's own error if it fails.\n");
  process.exit(0);
}

/* -------------------------------------------------------- 2. actually send */
console.log(c.b(`Sending a test to ${sendTo}…\n`));

const started = Date.now();
try {
  const client = new EmailClient(CONNECTION);
  const poller = await client.beginSend({
    senderAddress: SENDER,
    recipients: { to: [{ address: sendTo }] },
    content: {
      subject: "Turuchi Law Firm — email test",
      plainText:
        "If you are reading this, Azure Communication Services is working and the website's contact forms can send.",
    },
  });

  const result = await poller.pollUntilDone();
  const seconds = ((Date.now() - started) / 1000).toFixed(1);

  if (result.status === KnownEmailSendStatus.Succeeded) {
    console.log(`${c.ok("ACCEPTED")}  Azure took the message in ${seconds}s.`);
    console.log(`          Operation id: ${c.dim(result.id)}\n`);
    console.log("Accepted is not the same as delivered. If it has not arrived:");
    console.log("  · check Junk, and Quarantine if the inbox is Microsoft 365");
    console.log("  · a brand new sending domain gets filtered hardest in its first days");
    console.log("  · set up SPF and DKIM for the sending domain if you have not\n");
  } else {
    console.log(`${c.bad("FAILED")}    status ${result.status}`);
    console.log(`          ${JSON.stringify(result.error || {}, null, 2)}\n`);
  }
} catch (error) {
  console.log(`${c.bad("FAILED")}    ${error.message}\n`);

  const code = error.code || error.statusCode || "";
  const text = `${error.message} ${JSON.stringify(error.details || {})}`;

  if (/401|Unauthorized|signature/i.test(text)) {
    console.log("That is an authentication failure. The access key in the connection");
    console.log("string is wrong or was regenerated — copy it again from the");
    console.log("Communication Service resource → Keys.\n");
  } else if (/DomainNotLinked|domain.*not.*linked|SenderNotAllowed|not authori/i.test(text)) {
    console.log("Azure will not send from that address. Two things to check:");
    console.log("  1. the domain is Verified in the Email Communication Service");
    console.log("  2. the domain is CONNECTED to the Communication Service resource —");
    console.log("     these are two separate resources and the link is a separate step");
    console.log("  3. SENDER_EMAIL_ADDRESS matches the MailFrom address exactly\n");
  } else if (/InvalidRecipient|invalid.*email/i.test(text)) {
    console.log("Azure rejected an address. Note the route also sets replyTo from the");
    console.log("submitted form — one malformed address there fails the whole send.\n");
  } else if (/429|throttl|quota|limit/i.test(text)) {
    console.log("Rate limited. Azure-managed domains have a low daily cap; a verified");
    console.log("custom domain is what production needs.\n");
  } else if (/ENOTFOUND|ECONNREFUSED|ETIMEDOUT|network/i.test(text)) {
    console.log("Could not reach Azure at all — network or firewall, not configuration.\n");
  } else if (code) {
    console.log(`Azure's code was ${c.b(String(code))}. Search that alongside`);
    console.log('"Azure Communication Services email" for the specific cause.\n');
  }
  process.exit(1);
}
