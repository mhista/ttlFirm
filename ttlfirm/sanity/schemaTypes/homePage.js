// ===========================================
// sanity/schemaTypes/homePage.js
// Homepage content management.
//
// Every string, image, video, stat and CTA the homepage renders is a field
// here. Colours, fonts and spacing stay in code on purpose — the palette is
// part of the brand, not content.
// ===========================================

const seoFields = {
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    { name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (R) => R.max(60) },
    { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (R) => R.max(160) },
    { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
    { name: 'ogImage', title: 'Social Share Image', type: 'image', description: '1200 x 630 recommended' },
  ],
};

export default {
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'sections', title: 'Sections' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
      readOnly: true,
      hidden: true,
    },

    // ---------------------------------------------------------------- HERO
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          description: 'Small label above the headline.',
          initialValue: 'New Jersey',
        },
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (R) => R.required().max(90),
          initialValue: "Personal Injury & Workers' Compensation Lawyers",
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: (R) => R.required(),
        },
        {
          name: 'bullets',
          title: 'Proof Points',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'The ticked list under the description. Three works best.',
          validation: (R) => R.max(4),
        },
        {
          name: 'ctaText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Get Your Free Case Review',
        },
        { name: 'ctaLink', title: 'Primary Button Link', type: 'string', initialValue: '/contact' },
        {
          name: 'attorneyLinkText',
          title: 'Attorney Byline',
          type: 'string',
          initialValue: 'Turuchi S. Iheanachor, Esq.',
        },
        {
          name: 'watchFilmLabel',
          title: 'Film Button Label',
          type: 'string',
          initialValue: 'Watch our film',
        },
      ],
    },

    // -------------------------------------------------------- HERO MEDIA
    {
      name: 'heroMedia',
      title: 'Hero Video & Images',
      type: 'object',
      group: 'hero',
      description:
        'Leave any of these empty to keep the version currently shipped with the site.',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'backgroundVideo',
          title: 'Background Loop',
          type: 'file',
          options: { accept: 'video/mp4' },
          description:
            'Short silent MP4 that loops behind the hero. 15–30 seconds. Landscape 1920x1080 is ideal; a portrait video is used full-screen on phones and in the framed player on desktop.',
        },
        {
          name: 'poster',
          title: 'Video Poster',
          type: 'image',
          description: 'Still shown while the video loads, and instead of it on slow connections.',
        },
        {
          name: 'desktopBackdrop',
          title: 'Desktop Backdrop',
          type: 'image',
          description:
            'Wide still sitting behind the hero on desktop. Only used when the background loop is portrait.',
        },
        {
          name: 'fullFilm',
          title: 'Full Film (with sound)',
          type: 'file',
          options: { accept: 'video/mp4' },
          description: 'Opens when a visitor presses "Watch our film". Can be any length.',
        },
        { name: 'filmPoster', title: 'Film Poster', type: 'image' },
      ],
    },

    // --------------------------------------------------------------- STATS
    {
      name: 'statsSection',
      title: 'Stats Strip',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: true },
      description: 'The four figures across the bottom of the hero.',
      fields: [
        { name: 'enabled', title: 'Show Stats Strip', type: 'boolean', initialValue: true },
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          validation: (R) => R.max(4),
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value', type: 'string', description: 'e.g. 500+, 8, $0' },
                { name: 'label', title: 'Label', type: 'string' },
              ],
              preview: { select: { title: 'value', subtitle: 'label' } },
            },
          ],
        },
        // Kept so existing content keeps rendering if `stats` is empty.
        { name: 'stat1Label', title: 'Stat 1 Label (legacy)', type: 'string', hidden: true },
        { name: 'stat2Label', title: 'Stat 2 Label (legacy)', type: 'string', hidden: true },
      ],
    },

    // ----------------------------------------------------- PRACTICE AREAS
    {
      name: 'practiceAreasSection',
      title: 'Practice Areas Section',
      type: 'object',
      group: 'sections',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
        { name: 'sectionLabel', title: 'Eyebrow', type: 'string', initialValue: 'What We Do' },
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Our Practice Areas' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'footnote', title: 'Text Above Button', type: 'string', initialValue: 'Not sure which applies to your situation? Tell us what happened.' },
        { name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'Schedule a Free Consultation' },
        { name: 'ctaLink', title: 'Button Link', type: 'string', initialValue: '/contact' },
      ],
    },

    // ------------------------------------------------------ WHY CHOOSE US
    {
      name: 'whyChooseUsSection',
      title: 'Why Trust Us Section',
      type: 'object',
      group: 'sections',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
        { name: 'sectionLabel', title: 'Eyebrow', type: 'string', initialValue: 'Why Trust Us' },
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Why Clients Choose Our Legal Team' },
        { name: 'description', title: 'Description', type: 'text', rows: 5 },
        {
          name: 'features',
          title: 'Features',
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
        { name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'Meet Attorney Turuchi Iheanachor' },
        { name: 'ctaLink', title: 'Button Link', type: 'string', initialValue: '/profile' },
      ],
    },

    // ------------------------------------------------------- CONSULTATION
    {
      name: 'consultationSection',
      title: 'Consultation Band',
      type: 'object',
      group: 'sections',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
        { name: 'sectionLabel', title: 'Eyebrow', type: 'string', initialValue: 'Free Case Evaluation' },
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Talk to a New Jersey Attorney Today' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'ctaPrimaryText', title: 'Primary Button Text', type: 'string', initialValue: 'Start My Free Case Review' },
        { name: 'ctaSecondaryText', title: 'Call Button Prefix', type: 'string', initialValue: 'Call' },
        {
          name: 'disclaimer',
          title: 'Small Print',
          type: 'string',
          initialValue: 'Contacting the firm does not create an attorney-client relationship.',
        },
      ],
    },

    // -------------------------------------------------------- TESTIMONIALS
    {
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      group: 'sections',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
        { name: 'sectionLabel', title: 'Eyebrow', type: 'string', initialValue: 'Client Testimonials' },
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'What Our Clients Say' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        {
          name: 'disclaimer',
          title: 'Small Print',
          type: 'text',
          rows: 2,
          initialValue:
            'Testimonials reflect the facts of those particular matters. Prior results do not guarantee a similar outcome.',
        },
      ],
    },

    // ---------------------------------------------------------------- BLOG
    {
      name: 'blogSection',
      title: 'Blog Section',
      type: 'object',
      group: 'sections',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
        { name: 'sectionLabel', title: 'Eyebrow', type: 'string', initialValue: 'Our Blog' },
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Latest Legal Insights' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'View All Articles' },
      ],
    },

    // ------------------------------------------------------------- CONTACT
    {
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      group: 'sections',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
        { name: 'sectionLabel', title: 'Eyebrow', type: 'string', initialValue: 'Get in touch' },
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Tell us what happened' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'formHeading', title: 'Form Heading', type: 'string', initialValue: 'Request a free case review' },
        { name: 'formSubheading', title: 'Form Subheading', type: 'string', initialValue: 'We typically respond the same business day.' },
        { name: 'hoursLabel', title: 'Opening Hours', type: 'string', initialValue: 'Monday – Friday, 9:00 AM – 5:00 PM' },
      ],
    },

    // -------------------------------------------------------- SECTION ORDER
    {
      name: 'sectionOrder',
      title: 'Section Order',
      type: 'array',
      group: 'sections',
      description:
        'Drag to reorder the homepage. Anything left out of this list falls back to the default order. The hero is always first.',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Practice Areas', value: 'practiceAreas' },
              { title: 'Why Trust Us', value: 'whyChooseUs' },
              { title: 'Consultation Band', value: 'consultation' },
              { title: 'Testimonials', value: 'testimonials' },
              { title: 'Blog', value: 'blog' },
              { title: 'Contact', value: 'contact' },
            ],
          },
        },
      ],
      options: { layout: 'tags' },
    },

    { ...seoFields, group: 'seo' },
  ],
  preview: { prepare: () => ({ title: 'Homepage Content' }) },
};
