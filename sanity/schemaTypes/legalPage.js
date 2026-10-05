// ===========================================
// sanity/schemaTypes/legalPage.js
// Privacy Policy, Terms & Conditions, Disclaimer.
//
// These are compliance documents — the carrier registration checks them —
// so the schema keeps them structured: numbered sections with stable anchors
// that drive the contents rail, rather than one blob of rich text.
// ===========================================
export default {
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
      type: 'string',
      description: 'Used in the browser tab and search results.',
      validation: (R) => R.required(),
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description:
        'privacy-policy, terms-and-conditions or disclaimer. Changing this breaks the links the carrier registration was submitted with — do not edit after go-live.',
      validation: (R) => R.required(),
    },

    // ------------------------------------------------------------- BANNER
    {
      name: 'pageHeader',
      title: 'Page Banner',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Legal' },
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'headingHighlight',
          title: 'Highlighted Word',
          type: 'string',
          description: 'Shown in the accent color after the heading.',
        },
        { name: 'description', title: 'Standfirst', type: 'text', rows: 2 },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ],
    },

    // -------------------------------------------------------------- DATES
    {
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'string',
      description: 'Written out, e.g. "September 2, 2026".',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      description: 'Update this whenever the document changes.',
    },

    // -------------------------------------------------------------- INTRO
    {
      name: 'intro',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The paragraphs before the first numbered section.',
    },
    {
      name: 'callout',
      title: 'Highlighted Summary Box',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optional. The tinted box near the top — used for the SMS disclosures at a glance.',
    },

    // ----------------------------------------------------------- SECTIONS
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Each becomes a numbered heading and an entry in the contents rail.',
      of: [
        {
          type: 'object',
          name: 'legalSection',
          fields: [
            {
              name: 'partLabel',
              title: 'Part Divider',
              type: 'string',
              description:
                'Optional. Prints a divider above this section, e.g. "Part I — Website Terms of Use".',
            },
            { name: 'heading', title: 'Heading', type: 'string', validation: (R) => R.required() },
            {
              name: 'anchor',
              title: 'Anchor',
              type: 'slug',
              options: { source: 'heading', maxLength: 60 },
              description: 'Used for the #link. Keep it stable so existing links keep working.',
            },
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'callout',
              title: 'Highlighted Box',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Optional tinted box inside this section.',
            },
          ],
          preview: { select: { title: 'heading', subtitle: 'partLabel' } },
        },
      ],
    },

    // ------------------------------------------------------------ RELATED
    {
      name: 'relatedLinks',
      title: 'Related Links',
      type: 'array',
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
    {
      name: 'showContactCard',
      title: 'Show Contact Card',
      type: 'boolean',
      initialValue: true,
      description: 'The navy "Questions about this policy?" box in the sidebar.',
    },
    {
      name: 'contactCardHeading',
      title: 'Contact Card Heading',
      type: 'string',
      initialValue: 'Questions about this policy?',
    },

    // ---------------------------------------------------------------- SEO
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (R) => R.max(60) },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (R) => R.max(160) },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `/${subtitle}` : 'No URL set' }),
  },
};
