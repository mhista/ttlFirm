export default {
  name: 'subService',
  title: 'Sub-Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      description: 'URL-friendly version (e.g., car-accidents, slip-and-fall)'
    },
    {
      name: 'practiceArea',
      title: 'Practice Area',
      type: 'reference',
      to: [{type: 'practiceArea'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'counties',
      title: 'Target Counties',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'county'}]}],
      description: 'Counties this service targets for SEO'
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
          type: 'string'
        }
      ]
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    
    // OVERVIEW (Includes everything)
    {
      name: 'overview',
      title: 'Overview Section',
      type: 'blockContent',
      description: 'Main content about this service. Include why clients should choose you, your approach, etc.'
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

    // NEW: TAILORED CTA SECTION
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
          description: 'Detailed description specific to this service. Can be longer text.',
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
    
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'subService'}]}]
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'}
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      practiceArea: 'practiceArea.name',
      media: 'image',
      status: 'status',
      slug: 'slug.current'
    },
    prepare({title, practiceArea, media, status, slug}) {
      return {
        title,
        subtitle: `${practiceArea} - /${slug} - ${status}`,
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