export default {
  name: 'practiceArea',
  title: 'Practice Areas',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      description: 'URL-friendly version (e.g., personal-injury, immigration)'
    },
    {
      name: 'id',
      title: 'Numeric ID (Legacy)',
      type: 'number',
      description: 'DEPRECATED: Legacy ID for backwards compatibility. Use slug instead.',
      readOnly: true
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for cards and previews',
      validation: Rule => Rule.max(200)
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier for frontend'
    },
    
    // OVERVIEW SECTION (Includes everything - no separate whyChooseUs)
    {
      name: 'overview',
      title: 'Overview Section',
      type: 'blockContent',
      description: 'Main content describing this practice area. Include why clients should choose you, your approach, experience, etc.'
    },
    
    // PROCESS
    {
      name: 'process',
      title: 'Our Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Step Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'}
          ]
        }
      ]
    },
    
    // FAQs
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Question', type: 'string'},
            {name: 'answer', title: 'Answer', type: 'blockContent'}
          ]
        }
      ]
    },

    // NEW: TAILORED CTA SECTION (Matches WhyChooseUs design)
    {
      name: 'ctaSection',
      title: 'Call-to-Action Section',
      type: 'object',
      description: 'Tailored CTA section (dark blue design like WhyChooseUs)',
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        {
          name: 'enabled',
          title: 'Show CTA Section',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'sectionLabel',
          title: 'Section Label (Optional)',
          type: 'string',
          description: 'Small label above heading (e.g., "Get Started", "Contact Us")',
          placeholder: 'Get Legal Help'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Need Legal Assistance?'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 5,
          description: 'Detailed description specific to this practice area. Can be longer text.',
          placeholder: 'If you need help with...'
        },
        {
          name: 'buttons',
          title: 'CTA Buttons',
          type: 'array',
          description: 'Add 1-3 buttons (first button is primary amber, rest are secondary white)',
          validation: Rule => Rule.max(3),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'link',
                  title: 'Button Link',
                  type: 'string',
                  validation: Rule => Rule.required(),
                  initialValue: '/contact'
                }
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'link'
                }
              }
            }
          ]
        }
      ]
    },
    
    // Counties
    {
      name: 'counties',
      title: 'Target Counties',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'county'}]}],
      description: 'Counties this practice area serves'
    },

    // County-Specific Content
    {
      name: 'countyContent',
      title: 'County-Specific Content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'county',
              title: 'County',
              type: 'reference',
              to: [{type: 'county'}]
            },
            {
              name: 'content',
              title: 'Custom Content',
              type: 'blockContent'
            },
            {
              name: 'localStats',
              title: 'Local Statistics',
              type: 'text'
            }
          ]
        }
      ]
    },

    // Related Practice Areas
    {
      name: 'relatedAreas',
      title: 'Related Practice Areas',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'practiceArea'}]}]
    },

    // SEO Fields
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}]
        },
        {
          name: 'localKeywords',
          title: 'County-Specific Keywords',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'county',
                  title: 'County',
                  type: 'reference',
                  to: [{type: 'county'}]
                },
                {
                  name: 'keywords',
                  title: 'Keywords',
                  type: 'array',
                  of: [{type: 'string'}]
                }
              ]
            }
          ]
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image'
        },
        {
          name: 'schema',
          title: 'Schema.org JSON-LD',
          type: 'text',
          description: 'Custom structured data (JSON format)'
        }
      ]
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
          {title: 'Published', value: 'published'},
          {title: 'Draft', value: 'draft'}
        ]
      },
      initialValue: 'published'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      order: 'order',
      status: 'status',
      slug: 'slug.current'
    },
    prepare({title, media, order, status, slug}) {
      return {
        title,
        subtitle: `/${slug} - Order: ${order} - ${status}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    }
  ]
}