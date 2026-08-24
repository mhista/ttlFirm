// ===========================================
// sanity/schemas/aboutPage.js
// About Us page content
// ===========================================
export default {
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Us',
      readOnly: true
    },

    // PAGE HEADER
    {
      name: 'pageHeader',
      title: 'Page Header',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'About'
        },
        {
          name: 'headingHighlight',
          title: 'Highlighted Text',
          type: 'string',
          initialValue: 'Us'
        },
        {
          name: 'backgroundImage',
          title: 'Header Background Image',
          type: 'image',
          options: {hotspot: true}
        }
      ]
    },

    // WHO WE ARE SECTION
    {
      name: 'whoWeAre',
      title: 'Who We Are Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Who We Are'
        },
        {
          name: 'mainImage',
          title: 'Main Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt Text', type: 'string'}
          ]
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'}
              ]
            }
          ],
          description: 'Main content paragraphs'
        }
      ]
    },

    // MISSION & VALUES
    {
      name: 'missionAndValues',
      title: 'Mission & Values',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Mission & Values Section',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Our Mission & Values'
        },
        {
          name: 'mission',
          title: 'Mission Statement',
          type: 'text',
          rows: 4
        },
        {
          name: 'values',
          title: 'Core Values',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', title: 'Value Title', type: 'string'},
                {name: 'description', title: 'Description', type: 'text', rows: 2}
              ]
            }
          ]
        }
      ]
    },

    // FAQs SECTION
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Frequently Asked Questions'
        },
        {
          name: 'questions',
          title: 'Questions & Answers',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  rows: 4,
                  validation: Rule => Rule.required()
                }
              ],
              preview: {
                select: {
                  title: 'question',
                  subtitle: 'answer'
                },
                prepare({title, subtitle}) {
                  return {
                    title,
                    subtitle: subtitle ? subtitle.substring(0, 50) + '...' : ''
                  }
                }
              }
            }
          ]
        }
      ]
    },

    // CTA SECTION
    {
      name: 'ctaSection',
      title: 'Call-to-Action Section',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show CTA Section',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'ctaText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Schedule Free Consultation'
        },
        {
          name: 'ctaLink',
          title: 'Button Link',
          type: 'string',
          initialValue: '/contact'
        }
      ]
    },

    // SEO
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
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Us Page Content'
      }
    }
  }
}