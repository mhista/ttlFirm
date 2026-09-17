// ===========================================
// sanity/schemaTypes/siteSettings.js
// Global settings — contact details, footer, navigation extras, the SMS
// disclosures and the Text Us widget. Everything the header and footer
// render on every page lives here.
// ===========================================
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'contact', title: 'Contact' },
    { name: 'nav', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'sms', title: 'SMS & Widget' },
    { name: 'brand', title: 'Brand' },
    { name: 'tracking', title: 'Ad Tracking' },
  ],
  fields: [
    { name: 'title', title: 'Site Title', type: 'string', group: 'brand', validation: (R) => R.required() },
    { name: 'description', title: 'Site Description', type: 'text', rows: 3, group: 'brand' },

    // ------------------------------------------------------------- CONTACT
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'phone', title: 'Phone Number', type: 'string', validation: (R) => R.required() },
        {
          name: 'whatsapp',
          title: 'WhatsApp Number',
          type: 'string',
          description:
            'Digits and country code, e.g. +1 732 210 6410. Leave empty and no WhatsApp link is shown anywhere.',
        },
        { name: 'email', title: 'Email Address', type: 'string', validation: (R) => R.required().email() },
        {
          name: 'leadEmail',
          title: 'Where Enquiries Are Sent',
          type: 'string',
          validation: (R) => R.email(),
          description:
            'Every contact form and every message from the "Text us!" widget arrives here as an email. Leave empty and it uses the address configured on the server.',
        },
        {
          name: 'address',
          title: 'Main Address',
          type: 'object',
          description: 'The first one shown, and the one search engines treat as the main location.',
          fields: [
            {
              name: 'note',
              title: 'Note',
              type: 'string',
              description: 'A short line under the address — "By appointment only".',
            },
            { name: 'street', title: 'Street Address', type: 'string' },
            { name: 'city', title: 'City', type: 'string' },
            { name: 'state', title: 'State', type: 'string' },
            { name: 'zipCode', title: 'ZIP Code', type: 'string' },
            { name: 'country', title: 'Country', type: 'string', initialValue: 'US' },
          ],
        },
        {
          name: 'additionalOffices',
          title: 'Other Offices',
          type: 'array',
          description:
            'Shown after the main address in the footer and on the contact page, and added to the structured data Google reads.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Name',
                  type: 'string',
                  description: 'What to call it on the site — "Piscataway", "Second Office".',
                },
                { name: 'note', title: 'Note', type: 'string' },
                { name: 'street', title: 'Street Address', type: 'string' },
                { name: 'city', title: 'City', type: 'string' },
                { name: 'state', title: 'State', type: 'string' },
                { name: 'zipCode', title: 'ZIP Code', type: 'string' },
                { name: 'country', title: 'Country', type: 'string', initialValue: 'US' },
              ],
              preview: {
                select: { title: 'label', subtitle: 'street' },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'leadForm',
      title: 'Lead Form Dropdowns',
      type: 'object',
      group: 'contact',
      description:
        'The two dropdowns on the landing page forms. Leave a list empty to use the built-in one.',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'caseTypes',
          title: 'Types of Case',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Keep "Other" at the end so nobody is turned away by a list that misses their case.',
        },
        {
          name: 'languages',
          title: 'Preferred Languages',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      group: 'contact',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'weekdays', title: 'Hours (schema.org)', type: 'string', initialValue: 'Mo-Su 00:00-23:59' },
        { name: 'weekdaysDisplay', title: 'Hours (shown on site)', type: 'string', initialValue: 'Open 24 hours, 7 days a week' },
        { name: 'weekend', title: 'Weekend', type: 'string', initialValue: 'Open' },
      ],
    },
    // ------------------------------------------------------------- REVIEWS
    {
      name: 'reviews',
      title: 'Reviews',
      type: 'object',
      group: 'contact',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'googleReviewUrl',
          title: 'Write-a-review link (not used on the site)',
          type: 'url',
          description:
            'Kept for the firm\'s own use — this is the link to text or email a client (Google Business Profile → Ask for reviews). The website deliberately does NOT send anyone here: both "Leave a review" buttons scroll to the form on the reviews page, so the firm reads every review before it is published.',
        },
        {
          name: 'googleProfileUrl',
          title: 'Link to the Google profile',
          type: 'url',
          description: 'Where "see them on Google" points. Usually the Maps listing.',
        },
        {
          name: 'placeId',
          title: 'Google Place ID',
          type: 'string',
          description:
            'Only needed if reviews are ever pulled through the Places API. Find it with Google\'s Place ID Finder.',
        },
        {
          name: 'locationName',
          title: 'Business Profile location name',
          type: 'string',
          description:
            'For the review sync — the resource name from the Business Profile API, e.g. accounts/123/locations/456. See REVIEWS.md.',
        },
      ],
    },

    {
      name: 'social',
      title: 'Social Media Links',
      type: 'object',
      group: 'contact',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'tiktok', title: 'TikTok URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    },

    // ---------------------------------------------------------- NAVIGATION
    {
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'nav',
      fields: [
        { name: 'phoneLabel', title: 'Label Above Phone Number', type: 'string', initialValue: 'Free Case Review' },
        { name: 'ctaText', title: 'Header Button Text', type: 'string', initialValue: 'Contact Us' },
        { name: 'ctaLink', title: 'Header Button Link', type: 'string', initialValue: '/contact' },
      ],
    },
    {
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      group: 'nav',
      description: 'Leave empty to use the built-in menu.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (R) => R.required() },
            {
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'Link', type: 'string' },
                    { name: 'blurb', title: 'Short Description', type: 'string' },
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    },

    // -------------------------------------------------------------- FOOTER
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        { name: 'ctaHeading', title: 'CTA Bar Heading', type: 'string', initialValue: "Injured in New Jersey? Let's talk today." },
        { name: 'ctaSubheading', title: 'CTA Bar Subheading', type: 'string', initialValue: 'Free consultation. No fee unless we recover for you.' },
        { name: 'ctaButtonText', title: 'CTA Bar Button Text', type: 'string', initialValue: 'Request a Case Review' },
        { name: 'tagline', title: 'Footer Blurb', type: 'text', rows: 4 },
        { name: 'creditName', title: 'Built By — Name', type: 'string', initialValue: 'Kymaa Digital Solutions' },
        {
          name: 'creditUrl',
          title: 'Built By — Link',
          type: 'url',
          initialValue: 'https://www.instagram.com/kymaatech',
          description:
            'Currently the Kymaa Instagram, while kymaa.tech is being built. Change it here when the site is live.',
        },
        {
          name: 'legalLinks',
          title: 'Legal Links',
          type: 'array',
          description: 'Shown in the footer bottom bar. Privacy Policy must stay here — the SMS registration requires it on every page.',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Link', type: 'string' },
              ],
              preview: { select: { title: 'label', subtitle: 'href' } },
            },
          ],
        },
      ],
    },
    {
      name: 'legalNotices',
      title: 'Legal Notices',
      type: 'object',
      group: 'footer',
      description: 'The small print at the bottom of every page.',
      fields: [
        {
          name: 'attorneyAdvertising',
          title: 'Attorney Advertising Notice',
          type: 'text',
          rows: 4,
          initialValue:
            'The information on this website is for general informational purposes only and is not legal advice. Viewing this site, submitting a form, or contacting the firm does not create an attorney-client relationship. Prior results do not guarantee a similar outcome.',
        },
        {
          name: 'smsNotice',
          title: 'SMS Notice',
          type: 'text',
          rows: 5,
          description:
            'Required by the carrier registration. Keep the STOP/HELP wording and the "not shared with third parties" sentence.',
          initialValue:
            'Consent to receive text messages from The Turuchi Law Firm is optional and is not a condition of purchasing services, retaining the firm, or receiving legal services. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help. No mobile opt-in or text message consent will be shared with third parties or affiliates for marketing or promotional purposes.',
        },
      ],
    },

    // ----------------------------------------------------- SMS & WIDGET
    {
      name: 'smsConsent',
      title: 'SMS Consent Checkbox',
      type: 'object',
      group: 'sms',
      description:
        'Appears beside the phone field on every form. It must stay optional and unchecked — changing either fails the carrier review.',
      fields: [
        {
          name: 'summaryText',
          title: 'Short Line (always visible)',
          type: 'text',
          rows: 4,
          description:
            'The sentence shown next to the checkbox. Keep every required piece in it: the firm name, that consent is not a condition of service, that message and data rates may apply, that frequency varies, and STOP / HELP. The longer wording below sits behind "Full SMS terms".',
          initialValue:
            'I agree to receive SMS from The Turuchi Law Firm at the number above. Consent is not a condition of service. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help.',
        },
        {
          name: 'consentText',
          title: 'Full Consent Wording',
          type: 'text',
          rows: 6,
          description: 'Shown when someone opens "Full SMS terms".',
          initialValue:
            'I consent to receive conversational, transactional, informational and promotional SMS messages from The Turuchi Law Firm at the number provided. Consent is not a condition of purchasing services, retaining the firm, or receiving legal services. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help.',
        },
        {
          name: 'helperText',
          title: 'Helper Text',
          type: 'text',
          rows: 3,
          initialValue:
            'Optional. Leave unchecked and we will only contact you by phone or email. No mobile opt-in or text message consent will be shared with third parties or affiliates for marketing purposes.',
        },
        {
          name: 'formDisclaimer',
          title: 'Under-Form Disclaimer',
          type: 'text',
          rows: 3,
          initialValue:
            'Submitting this form does not create an attorney-client relationship and does not make the firm your lawyer. Please do not send confidential or time-sensitive information through this form.',
        },
      ],
    },
    {
      name: 'textWidget',
      title: 'Text Us Widget',
      type: 'object',
      group: 'sms',
      fields: [
        { name: 'enabled', title: 'Show Widget', type: 'boolean', initialValue: true },
        { name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'Text us!' },
        { name: 'teaserText', title: 'Speech Bubble Text', type: 'string', initialValue: 'Want to schedule a consultation? Text us!' },
        { name: 'panelHeading', title: 'Panel Heading', type: 'string', initialValue: 'Send us a text' },
        { name: 'panelSubheading', title: 'Panel Subheading', type: 'string', initialValue: "Add your details and we'll respond by text." },
        { name: 'successHeading', title: 'Success Heading', type: 'string', initialValue: 'Message received' },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          rows: 3,
          initialValue: 'Thank you. Someone from the firm will get back to you shortly.',
        },
      ],
    },

    // --------------------------------------------------------------- BRAND
    // ------------------------------------------------------------ TRACKING
    {
      name: 'tracking',
      title: 'Ad Tracking',
      type: 'object',
      group: 'tracking',
      description:
        'Paste the IDs from Meta Ads Manager and Google. Leave any of them empty and that platform is simply not loaded — no script, no cookie.',
      fields: [
        {
          name: 'metaPixelId',
          title: 'Meta Pixel ID',
          type: 'string',
          description:
            'Events Manager → Data Sources → your pixel. A 15–16 digit number. Required for Facebook and Instagram ads to report conversions or build audiences.',
        },
        {
          name: 'ga4Id',
          title: 'Google Analytics 4 ID',
          type: 'string',
          description: 'Looks like G-XXXXXXXXXX.',
        },
        {
          name: 'googleAdsId',
          title: 'Google Ads Conversion ID',
          type: 'string',
          description: 'Looks like AW-XXXXXXXXX.',
        },
        {
          name: 'googleAdsLabel',
          title: 'Google Ads Conversion Label',
          type: 'string',
          description: 'The label paired with the conversion ID, from the conversion action in Google Ads.',
        },
      ],
    },

    {
      name: 'stats',
      title: 'Firm Statistics',
      type: 'object',
      group: 'brand',
      description: 'Used across the site wherever these numbers appear.',
      fields: [
        { name: 'casesHandled', title: 'Cases Handled', type: 'number', initialValue: 700 },
        {
          name: 'recoveredLabel',
          title: 'Amount Recovered',
          type: 'string',
          initialValue: 'Millions',
          description:
            'Shown large, in place of a years-in-practice figure. "Millions" is safe; a specific number is a results claim and has to be accurate and provable.',
        },
        { name: 'yearsExperience', title: 'Years of Experience', type: 'number', initialValue: 8, description: 'No longer shown in the stats; kept for anywhere else that wants it.' },
        { name: 'countiesServed', title: 'Counties Served', type: 'number', initialValue: 7 },
        { name: 'clientSatisfaction', title: 'Client Satisfaction (%)', type: 'number', initialValue: 100 },
      ],
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
    { name: 'favicon', title: 'Favicon', type: 'image', group: 'brand' },
    {
      name: 'defaultOGImage',
      title: 'Default Social Share Image',
      type: 'image',
      group: 'brand',
      description: '1200 x 630 recommended',
    },
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
};
