// ===========================================
// sanity/schemaTypes/landingPage.js
// Campaign landing pages, served at /lp/<slug>.
//
// These are NOT website pages. They carry no navigation and no footer menu —
// one offer, one form, nowhere else to go. That is the whole point: a visitor
// who clicked an ad for "car accident lawyer" should land on a page about car
// accidents with a single next step.
//
// Build a page by stacking sections. Every section type is optional and can
// appear more than once.
// ===========================================

const ctaFields = [
  { name: 'ctaText', title: 'Button Text', type: 'string' },
  {
    name: 'ctaLink',
    title: 'Button Link',
    type: 'string',
    description: 'Use #lead-form to scroll to the form on this page.',
    initialValue: '#lead-form',
  },
];

export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    { name: 'setup', title: 'Setup' },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // --------------------------------------------------------------- SETUP
    {
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      group: 'setup',
      description: 'Only you see this — e.g. "Google Ads — Car Accident".',
      validation: (R) => R.required(),
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      group: 'setup',
      options: { source: 'title', maxLength: 96 },
      description: 'The page will live at /lp/<this>. Match it to the ad, e.g. nj-car-accident-lawyer.',
      validation: (R) => R.required(),
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'setup',
      initialValue: false,
      description: 'Unpublished pages return 404 and are never indexed.',
    },
    {
      name: 'phoneOverride',
      title: 'Tracking Phone Number',
      type: 'string',
      group: 'setup',
      description:
        'Optional. A separate number for this campaign so calls can be attributed. Leave empty to use the firm number.',
    },
    {
      name: 'metaPixelIdOverride',
      title: 'Campaign Meta Pixel ID',
      type: 'string',
      group: 'setup',
      description:
        'Optional. Only needed if this campaign reports into a different pixel from the rest of the site. Otherwise leave empty and the site pixel is used.',
    },
    {
      name: 'noIndex',
      title: 'Hide From Google',
      type: 'boolean',
      group: 'setup',
      initialValue: true,
      description:
        'Normally ON for ad pages — they should not compete with the main site in search results.',
    },

    // ------------------------------------------------------------- CONTENT
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      of: [
        // ------------------------------------------------------------ HERO
        {
          type: 'object',
          name: 'lpHero',
          title: 'Hero',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
            { name: 'heading', title: 'Headline', type: 'string', validation: (R) => R.required() },
            { name: 'subheading', title: 'Sub-headline', type: 'text', rows: 3 },
            { name: 'bullets', title: 'Proof Points', type: 'array', of: [{ type: 'string' }] },
            ...ctaFields,
            { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
            {
              name: 'backgroundVideo',
              title: 'Background Video (not recommended)',
              type: 'file',
              options: { accept: 'video/mp4' },
              description:
                'Plays silently behind the headline. Only use this if the footage is landscape and under about 3 MB. Ad traffic is almost all mobile on cellular data — a heavy video here delays the page and costs enquiries. The "Video" section further down the page is the safer place for film.',
            },
            {
              name: 'showForm',
              title: 'Show Form In Hero',
              type: 'boolean',
              initialValue: true,
              description: 'Puts the case-review form beside the headline. Recommended for ad traffic.',
            },
            { name: 'formHeading', title: 'Form Heading', type: 'string', initialValue: 'Free case review' },
            { name: 'formSubheading', title: 'Form Subheading', type: 'string' },
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Hero — ${title || ''}` }) },
        },

        // -------------------------------------------------------- TRUST BAR
        {
          type: 'object',
          name: 'lpTrustBar',
          title: 'Trust Bar',
          fields: [
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'value', title: 'Value', type: 'string' },
                    { name: 'label', title: 'Label', type: 'string' },
                  ],
                  preview: { select: { title: 'value', subtitle: 'label' } },
                },
              ],
            },
          ],
          preview: { prepare: () => ({ title: 'Trust Bar' }) },
        },

        // ----------------------------------------------------- PROOF POINTS
        {
          type: 'object',
          name: 'lpProofPoints',
          title: 'Proof Points',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            {
              name: 'items',
              title: 'Points',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Scales of justice', value: 'FaBalanceScale' },
                          { title: 'Speech bubbles', value: 'FaComments' },
                          { title: 'Map pin', value: 'FaMapMarkerAlt' },
                          { title: 'Handshake', value: 'FaHandshake' },
                          { title: 'Tick', value: 'FaCheckCircle' },
                          { title: 'Person in suit', value: 'FaUserTie' },
                        ],
                      },
                      initialValue: 'FaCheckCircle',
                    },
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 3 },
                  ],
                  preview: { select: { title: 'title', subtitle: 'icon' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Proof Points — ${title || ''}` }) },
        },

        // ------------------------------------------------------------ STEPS
        {
          type: 'object',
          name: 'lpSteps',
          title: 'How It Works',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
            { name: 'heading', title: 'Heading', type: 'string' },
            {
              name: 'steps',
              title: 'Steps',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 3 },
                  ],
                  preview: { select: { title: 'title' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Steps — ${title || ''}` }) },
        },

        // ----------------------------------------------------- TESTIMONIALS
        {
          type: 'object',
          name: 'lpTestimonials',
          title: 'Testimonials',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
            { name: 'heading', title: 'Heading', type: 'string' },
            {
              name: 'testimonials',
              title: 'Testimonials',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
              description: 'Leave empty to show the featured testimonials.',
            },
            {
              name: 'disclaimer',
              title: 'Small Print',
              type: 'text',
              rows: 2,
              initialValue:
                'Testimonials reflect the facts of those particular matters. Prior results do not guarantee a similar outcome.',
            },
          ],
          preview: { prepare: () => ({ title: 'Testimonials' }) },
        },

        // ------------------------------------------------------------ VIDEO
        {
          type: 'object',
          name: 'lpVideo',
          title: 'Video',
          description: 'A film with a play button. Loads only when someone presses play.',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
            { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Meet the attorney handling your case' },
            { name: 'description', title: 'Description', type: 'text', rows: 4 },
            { name: 'bullets', title: 'Points Beside The Video', type: 'array', of: [{ type: 'string' }] },
            {
              name: 'video',
              title: 'Video',
              type: 'file',
              options: { accept: 'video/mp4' },
              description: "Leave empty to use the firm's film from the homepage.",
            },
            { name: 'poster', title: 'Poster Image', type: 'image', description: 'The still shown before someone presses play.' },
            {
              name: 'attorneyPhoto',
              title: 'Attorney Photo',
              type: 'image',
              options: { hotspot: true },
              description:
                'Set this and her photo becomes the frame, with the play control in the corner — press it and the film plays in the same box. Upright, roughly 4:5.',
            },
            { name: 'attorneyName', title: 'Name Shown On Photo', type: 'string' },
            { name: 'attorneyRole', title: 'Title Shown On Photo', type: 'string' },
            {
              name: 'showBio',
              title: 'Show the biography',
              type: 'boolean',
              initialValue: true,
              description: 'Turn off to use this section as a plain video block.',
            },
            {
              name: 'bioParagraphs',
              title: 'Biography',
              type: 'array',
              of: [{ type: 'text', rows: 5 }],
              description:
                'One entry per paragraph. The first two show, the rest sit behind "Read her full bio". Leave empty to use the bio shipped with the site.',
            },
            {
              name: 'orientation',
              title: 'Shape',
              type: 'string',
              options: {
                list: [
                  { title: 'Portrait (9:16) — phone footage', value: 'portrait' },
                  { title: 'Landscape (16:9)', value: 'landscape' },
                ],
                layout: 'radio',
              },
              initialValue: 'portrait',
            },
            {
              name: 'autoplay',
              title: 'Play Automatically (silent)',
              type: 'boolean',
              initialValue: false,
              description:
                'Off by default. Autoplay downloads the file for every visitor whether they watch it or not, which slows the page down on mobile.',
            },
            ...ctaFields,
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Video — ${title || ''}` }) },
        },

        // -------------------------------------------------------------- FAQ
        {
          type: 'object',
          name: 'lpFaq',
          title: 'FAQ',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Common questions' },
            {
              name: 'items',
              title: 'Questions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'question', title: 'Question', type: 'string' },
                    { name: 'answer', title: 'Answer', type: 'text', rows: 4 },
                  ],
                  preview: { select: { title: 'question' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `FAQ — ${title || ''}` }) },
        },

        // -------------------------------------------------------- RICH TEXT
        {
          type: 'object',
          name: 'lpRichText',
          title: 'Text Block',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Text — ${title || ''}` }) },
        },

        // -------------------------------------------------------------- CTA
        {
          type: 'object',
          name: 'lpCta',
          title: 'Closing CTA',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            ...ctaFields,
            { name: 'showPhone', title: 'Show Call Button', type: 'boolean', initialValue: true },
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `CTA — ${title || ''}` }) },
        },

        // ----------------------------------------------------- OFFICE PHOTOS
        // The Newark building. A campaign page has no nav, so a photo of a
        // real office is the only reassurance a visitor gets that the firm is
        // a real place. Leave everything empty to use the shipped photos.
        {
          type: 'object',
          name: 'lpOffice',
          title: 'Office Photos',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            {
              name: 'photos',
              title: 'Photos',
              type: 'array',
              validation: (R) => R.max(2),
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                },
              ],
            },
          ],
          preview: { prepare: () => ({ title: 'Office Photos' }) },
        },

        // ------------------------------------------------------------- FORM
        {
          type: 'object',
          name: 'lpForm',
          title: 'Form Section',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
            { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Tell us what happened' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'formHeading', title: 'Form Heading', type: 'string', initialValue: 'Request a free case review' },
            { name: 'formSubheading', title: 'Form Subheading', type: 'string' },
          ],
          preview: { prepare: () => ({ title: 'Form Section' }) },
        },
      ],
    },

    // ----------------------------------------------------------------- SEO
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (R) => R.max(60) },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (R) => R.max(160) },
        { name: 'ogImage', title: 'Social Share Image', type: 'image' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', published: 'published' },
    prepare: ({ title, slug, published }) => ({
      title,
      subtitle: `${published ? '● Live' : '○ Draft'} — /lp/${slug || '…'}`,
    }),
  },
};
