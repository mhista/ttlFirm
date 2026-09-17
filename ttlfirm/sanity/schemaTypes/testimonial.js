/**
 * A client review.
 *
 * Two kinds live in here and the `source` field is what tells them apart:
 *
 *  - Google reviews, mirrored from the firm's Business Profile. These are
 *    public, already attributed to a named reviewer, and most carry the
 *    firm's own reply. `googleReviewId` is what keeps a re-sync from creating
 *    duplicates, so never edit it by hand.
 *  - Reviews left directly on the site, which arrive unpublished and are
 *    only shown once someone approves them.
 *
 * New Jersey RPC 7.1 treats client testimonials as attorney advertising, so
 * every place these render carries the results disclaimer — that is handled
 * in the components, not here, but it is the reason this content is not just
 * decorative.
 */
export default {
  name: 'testimonial',
  title: 'Reviews & Testimonials',
  type: 'document',
  groups: [
    { name: 'content', title: 'Review', default: true },
    { name: 'source', title: 'Where it came from' },
  ],
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      initialValue: 'Client',
      description: 'e.g., "Client", "Personal Injury Client", etc.'
    },
    {
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ],
      description: 'Optional: Client photo or placeholder avatar'
    },
    {
      name: 'testimonial',
      title: 'Review Text',
      type: 'text',
      rows: 8,
      // Was capped at 500, which is shorter than several of the firm's real
      // Google reviews — the cap silently made them unsaveable.
      validation: Rule => Rule.required().max(5000),
      description:
        'The reviewer\'s own words. Never edit the wording of a Google review — if it is too long for the card, the component truncates it and links to the full review.'
    },
    {
      name: 'truncated',
      title: 'Text is shortened',
      type: 'boolean',
      initialValue: false,
      group: 'source',
      description:
        'Tick when only part of the review was captured. The card then shows "Read the full review on Google" instead of implying this is the whole thing.'
    },
    {
      name: 'ownerReply',
      title: "The firm's reply",
      type: 'text',
      rows: 5,
      group: 'content',
      description: 'The public reply, if one was posted. Shown beneath the review.'
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      initialValue: 5,
      description: 'Star rating from 1-5'
    },
    {
      name: 'caseType',
      title: 'Case Type',
      type: 'string',
      options: {
        list: [
          {title: 'Personal Injury', value: 'personal-injury'},
          {title: 'Immigration', value: 'immigration'},
          {title: "Workers' Compensation", value: 'workers-comp'},
          {title: 'Municipal Court', value: 'municipal'},
          {title: 'General', value: 'general'}
        ]
      }
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
      description: 'Show this testimonial prominently'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Hidden', value: 'hidden'}
        ]
      },
      initialValue: 'active'
    },
    {
      name: 'dateSubmitted',
      title: 'Date Submitted',
      type: 'date'
    },

    /* ------------------------------------------------------------ source */
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      group: 'source',
      options: {
        list: [
          { title: 'Google review', value: 'google' },
          { title: 'Left on this website', value: 'website' },
          { title: 'Given to the firm directly', value: 'direct' }
        ]
      },
      initialValue: 'direct',
      description: 'Google reviews are shown with the Google mark and a link to the original.'
    },
    {
      name: 'sourceUrl',
      title: 'Link to the original review',
      type: 'url',
      group: 'source',
      description: 'Required for Google reviews — readers must be able to verify one.'
    },
    {
      name: 'relativeDate',
      title: 'Age, as Google words it',
      type: 'string',
      group: 'source',
      description: 'e.g. "3 weeks ago". Google asks that reviews show a relative date.'
    },
    {
      name: 'translatedFrom',
      title: 'Translated from',
      type: 'string',
      group: 'source',
      description:
        'Set when the text shown is Google\'s translation, e.g. "Spanish". Google requires a translation notice, so the card prints one.'
    },
    {
      name: 'googleReviewId',
      title: 'Google review ID',
      type: 'string',
      group: 'source',
      readOnly: true,
      description:
        'Set by the sync. It is how a re-sync updates an existing review instead of creating a second copy — do not change it.'
    },
    {
      name: 'approved',
      title: 'Approved for the website',
      type: 'boolean',
      initialValue: true,
      group: 'source',
      description:
        'Reviews submitted through the website arrive switched off. Nothing appears on the site until this is on.'
    }
  ],
  preview: {
    select: { title: 'name', rating: 'rating', source: 'source', approved: 'approved' },
    prepare: ({ title, rating, source, approved }) => ({
      title: `${'★'.repeat(rating || 0)}  ${title || 'Unnamed'}`,
      subtitle: [
        source === 'google' ? 'Google' : source === 'website' ? 'From the website' : 'Direct',
        approved === false ? '— awaiting approval' : null
      ]
        .filter(Boolean)
        .join(' ')
    })
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    },
    {
      title: 'Date Submitted',
      name: 'dateDesc',
      by: [{field: 'dateSubmitted', direction: 'desc'}]
    }
  ]
}
