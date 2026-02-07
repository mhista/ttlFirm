// ===========================================
// sanity/schemas/attorneyProfile.js
// Attorney profile page content
// ===========================================
export default {
  name: 'attorneyProfile',
  title: 'Attorney Profile Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Attorney Profile',
      readOnly: true
    },

    // ATTORNEY INFORMATION
    {
      name: 'attorney',
      title: 'Attorney Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'credentials',
          title: 'Credentials',
          type: 'string',
          description: 'e.g., "Esq.", "J.D."',
          initialValue: 'Esq.'
        },
        {
          name: 'title',
          title: 'Professional Title',
          type: 'string',
          initialValue: 'Founder & Managing Attorney'
        },
        {
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt Text', type: 'string'}
          ],
          validation: Rule => Rule.required()
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: Rule => Rule.email()
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        }
      ]
    },

    // INTRODUCTION
    {
      name: 'introduction',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Meet Our Founder'
        },
        {
          name: 'content',
          title: 'Introduction Content',
          type: 'blockContent',
          description: 'Main biography content'
        }
      ]
    },

    // CAREER HIGHLIGHTS
    {
      name: 'careerHighlights',
      title: 'Career Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', title: 'Section Heading', type: 'string'},
            {name: 'content', title: 'Content', type: 'blockContent'}
          ],
          preview: {
            select: {
              title: 'heading'
            }
          }
        }
      ]
    },

    // PRACTICE AREAS
    {
      name: 'practiceAreas',
      title: 'Practice Areas',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Practice Areas'
        },
        {
          name: 'areas',
          title: 'Areas of Practice',
          type: 'array',
          of: [{type: 'string'}]
        }
      ]
    },

    // EDUCATION
    {
      name: 'education',
      title: 'Education',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Education'
        },
        {
          name: 'degrees',
          title: 'Degrees & Certifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'institution', title: 'Institution', type: 'string'},
                {name: 'degree', title: 'Degree/Certification', type: 'string'},
                {name: 'year', title: 'Year', type: 'string'}
              ],
              preview: {
                select: {
                  title: 'institution',
                  subtitle: 'degree'
                }
              }
            }
          ]
        }
      ]
    },

    // BAR ADMISSIONS
    {
      name: 'barAdmissions',
      title: 'Bar Admissions',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Bar Admission'
        },
        {
          name: 'admissions',
          title: 'Admissions',
          type: 'array',
          of: [{type: 'text', rows: 2}]
        }
      ]
    },

    // HONORS & AWARDS
    {
      name: 'honorsAndAwards',
      title: 'Honors & Awards',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Honors & Awards'
        },
        {
          name: 'items',
          title: 'Awards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', title: 'Award Title', type: 'string'},
                {name: 'organization', title: 'Organization', type: 'string'},
                {name: 'year', title: 'Year', type: 'string'},
                {name: 'description', title: 'Description', type: 'text', rows: 2}
              ]
            }
          ]
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
        title: 'Attorney Profile Content'
      }
    }
  }
}