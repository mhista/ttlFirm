
// ===========================================
// sanity/schemas/subService.js
// ===========================================
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
      validation: Rule => Rule.required()
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
    {
      name: 'overview',
      title: 'Overview Section',
      type: 'blockContent'
    },
    {
      name: 'whyChooseUs',
      title: 'Why Choose Us',
      type: 'blockContent'
    },
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
      status: 'status'
    },
    prepare({title, practiceArea, media, status}) {
      return {
        title,
        subtitle: `${practiceArea} - ${status}`,
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
