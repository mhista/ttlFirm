// ===========================================
// sanity/schemas/contactPage.js
// Contact Us page content
// ===========================================
export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Us',
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
          initialValue: 'Contact'
        },
        {
          name: 'headingHighlight',
          title: 'Highlighted Text',
          type: 'string',
          initialValue: 'Us'
        }
      ]
    },

    // MAIN CONTENT
    {
      name: 'mainContent',
      title: 'Main Content',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          initialValue: 'Consult a Reliable New Jersey Law Firm'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4
        }
      ]
    },

    // FORM SECTION
    {
      name: 'formSection',
      title: 'Contact Form Settings',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Form Heading',
          type: 'string',
          initialValue: 'Leave us your info and we will get back to you'
        },
        {
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Send Email'
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'string',
          initialValue: 'Email sent successfully!'
        },
        {
          name: 'errorMessage',
          title: 'Error Message',
          type: 'string',
          initialValue: 'Failed to send email. Try again later.'
        }
      ]
    },

    // OFFICE HOURS
    {
      name: 'officeHours',
      title: 'Office Hours Display',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Office Hours',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Office Hours'
        },
        {
          name: 'hours',
          title: 'Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'days', title: 'Days', type: 'string'},
                {name: 'hours', title: 'Hours', type: 'string'}
              ]
            }
          ]
        }
      ]
    },

    // MAP SECTION
    {
      name: 'mapSection',
      title: 'Map Settings',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Map',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'embedUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
          description: 'Full embed URL from Google Maps'
        },
        {
          name: 'latitude',
          title: 'Latitude',
          type: 'number'
        },
        {
          name: 'longitude',
          title: 'Longitude',
          type: 'number'
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
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page Content'
      }
    }
  }
}