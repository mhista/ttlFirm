// ===========================================
// sanity/schemaTypes/homePage.js
// Homepage content management.
//
// Every string, image, video, stat and CTA the homepage renders is a field
// here. Colors, fonts and spacing stay in code on purpose — the palette is
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
          title: 'Background Loop — phones (portrait)',
          type: 'file',
          options: { accept: 'video/mp4' },
          description:
            'Short silent MP4 that loops behind the hero on phones and tablets. Portrait 9:16, 15–30 seconds.',
        },
        {
          name: 'poster',
          title: 'Video Poster — phones',
          type: 'image',
          description: 'Still shown while the video loads, and instead of it on slow connections.',
        },
        {
          name: 'desktopBackground',
          title: 'Desktop Hero Background',
          type: 'string',
          options: {
            layout: 'radio',
            list: [
              { title: 'Play the wide video', value: 'video' },
              { title: 'Show a wide photo instead', value: 'image' },
            ],
          },
          initialValue: 'video',
          description:
            'Phones always play the portrait loop. This only changes what desktop shows — switch to the photo whenever the wide footage on hand is not the right shape or is too low-resolution for a full-width hero.',
        },
        {
          name: 'desktopVideo',
          title: 'Background Loop — desktop (landscape)',
          type: 'file',
          options: { accept: 'video/mp4' },
          description:
            'Landscape 16:9, 1920x1080 or better, silent, 15–30 seconds. Keep the left third of the frame clear — the headline sits there.',
        },
        {
          name: 'desktopPoster',
          title: 'Video Poster — desktop',
          type: 'image',
          description: 'Wide still shown while the desktop loop loads.',
        },
        {
          name: 'desktopVideoStart',
          title: 'Start at (seconds)',
          type: 'number',
          validation: (Rule) => Rule.min(0),
          description:
            'Only for a video uploaded above. Play from this point instead of the beginning — useful for skipping a title card or a dark opening. Leave empty to start at 0.',
        },
        {
          name: 'desktopVideoEnd',
          title: 'Stop at (seconds)',
          type: 'number',
          validation: (Rule) => Rule.min(1),
          description:
            'Play up to this point, then loop back to the start. Leave empty to use the whole file. A full film does not need to be re-cut to be used here — pick fifteen good seconds and set them.',
        },
        {
          name: 'desktopImages',
          title: 'Desktop Photos',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          validation: (Rule) => Rule.max(6),
          description:
            'Used when "Show a wide photo instead" is selected above. Add ONE photo for a still hero, or several and they cross-fade in a loop. Landscape, 1920px wide or better. Pictures of the attorney work best — keep her right of center so the headline has clean space on the left.',
        },
        {
          name: 'desktopImageSeconds',
          title: 'Seconds per photo',
          type: 'number',
          initialValue: 6,
          validation: (Rule) => Rule.min(3).max(20),
          description: 'Only matters when there is more than one photo above. 6 is a good default.',
        },
        {
          name: 'desktopBackdrop',
          title: 'Desktop Photo (single — older field)',
          type: 'image',
          hidden: ({ parent }) => Boolean(parent?.desktopImages?.length),
          description:
            'Kept so nothing already set here is lost. Add photos to "Desktop Photos" above instead — as soon as that list has anything in it, this is ignored and hidden.',
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
          name: 'disclaimer',
          title: 'Results Disclaimer',
          type: 'string',
          initialValue:
            'Prior results do not guarantee a similar outcome. Every case turns on its own facts.',
          description:
            'Sits under the figures. New Jersey requires a claim about past recoveries to be qualified where it is made — leave this in place.',
        },
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          validation: (R) => R.max(4),
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value', type: 'string', description: 'e.g. 700+, Millions, $0' },
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
    // ------------------------------------------------- ACCIDENT TYPES
    {
      name: 'accidentTypesSection',
      title: 'Accidents We Handle',
      type: 'object',
      group: 'sections',
      description:
        'The breakdown of accident types. Someone hit by a bus searches for "bus accident", not for "personal injury" — this is the section that answers them, and every line in it is a phrase people actually type into Google.',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
        { name: 'sectionLabel', title: 'Small Label', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        {
          name: 'groups',
          title: 'Groups',
          type: 'array',
          description: 'Leave empty to use the built-in lists.',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Group Title', type: 'string' },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Car crash', value: 'FaCarBurst' },
                      { title: 'Person falling', value: 'FaPersonFalling' },
                      { title: 'Hard hat', value: 'FaHelmetSafety' },
                      { title: 'Medical', value: 'FaBriefcaseMedical' },
                      { title: 'Scales', value: 'FaScaleBalanced' },
                      { title: 'Damaged building', value: 'FaHouseChimneyCrack' },
                    ],
                  },
                },
                {
                  name: 'items',
                  title: 'Accident Types',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
                {
                  name: 'href',
                  title: 'Link',
                  type: 'string',
                  description: 'Where "More on …" goes. Leave empty to hide that link.',
                },
              ],
              preview: { select: { title: 'title' } },
            },
          ],
        },
        { name: 'ctaText', title: 'Button Text', type: 'string' },
        { name: 'ctaLink', title: 'Button Link', type: 'string' },
      ],
    },

    // ------------------------------------------------------- FILM SECTION
    {
      name: 'filmSection',
      title: 'Our Film',
      type: 'object',
      group: 'sections',
      description:
        'The firm\'s film, in a band of its own. It used to sit inside the hero; it was moved out because on desktop the hero now plays the wide loop full bleed behind the headline.',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
        { name: 'sectionLabel', title: 'Small Label', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        {
          name: 'portrait',
          title: 'Attorney Photo',
          type: 'image',
          options: { hotspot: true },
          description:
            'Upright, roughly 4:5, 720px wide or better. It becomes the frame the film plays in.',
        },
        { name: 'portraitName', title: 'Name Shown On Photo', type: 'string' },
        { name: 'portraitRole', title: 'Title Shown On Photo', type: 'string' },
        { name: 'roleLine', title: 'Title Under The Heading', type: 'string' },
        {
          name: 'paragraphs',
          title: 'Biography',
          type: 'array',
          of: [{ type: 'text', rows: 5 }],
          description:
            'One entry per paragraph. The first two are shown and the rest sit behind "Read her full bio" — all of it is still in the page for Google. Leave empty to use the bio shipped with the site.',
        },
        {
          name: 'bullets',
          title: 'Bullets',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule) => Rule.max(4),
        },
        { name: 'ctaText', title: 'Button Text', type: 'string' },
        { name: 'ctaLink', title: 'Button Link', type: 'string' },
      ],
    },

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
              { title: 'Accidents We Handle', value: 'accidentTypes' },
              { title: 'Our Film', value: 'film' },
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
