// ===========================================
// sanity/schemas/homePage.js
// Homepage content management
// ===========================================
export default {
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
      readOnly: true
    },
    
    // HERO SECTION
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'headingHighlight',
          title: 'Highlighted Text',
          type: 'string',
          description: 'Text to highlight in orange (e.g., "New Jersey")'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.required()
        },
        {
          name: 'ctaText',
          title: 'Call-to-Action Button Text',
          type: 'string',
          initialValue: 'Schedule a free Consultation'
        },
        {
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'string',
          initialValue: '/contact'
        },
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt Text', type: 'string'}
          ]
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {hotspot: true}
        },
        {
          name: 'attorneyLinkText',
          title: 'Attorney Link Text',
          type: 'string',
          initialValue: 'Turuchi S. Iheanachor, Esq.'
        }
      ]
    },

    // STATS SECTION (uses stats from siteSettings)
    {
      name: 'statsSection',
      title: 'Statistics Section',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Statistics Section',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'stat1Label',
          title: 'Stat 1 Label',
          type: 'string',
          initialValue: 'Legal Cases Handled'
        },
        {
          name: 'stat2Label',
          title: 'Stat 2 Label',
          type: 'string',
          initialValue: 'Years of Industry Experience'
        }
      ]
    },

    // PRACTICE AREAS SECTION
    {
      name: 'practiceAreasSection',
      title: 'Practice Areas Section',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'What We Do'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Practice Areas'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Comprehensive legal services tailored to protect your rights and secure your future'
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Schedule Free Consultation'
        },
        {
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          initialValue: '/contact'
        }
      ]
    },

    // WHY CHOOSE US SECTION
    {
      name: 'whyChooseUsSection',
      title: 'Why Choose Us Section',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Why Trust Us'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Why Clients Choose Our Legal Team'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 5
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g., FaBalanceScale, FaComments'},
                {name: 'title', title: 'Feature Title', type: 'string'},
                {name: 'description', title: 'Description', type: 'text', rows: 3}
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'icon'
                }
              }
            }
          ]
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Learn More About Attorney Turuchi Iheanachor'
        },
        {
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          initialValue: '/profile'
        }
      ]
    },

    // CONSULTATION SECTION
    {
      name: 'consultationSection',
      title: 'Free Consultation Section',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Free Case Evaluation'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Confide in a Trusted Law Firm in New Jersey'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'ctaPrimaryText',
          title: 'Primary CTA Text',
          type: 'string',
          initialValue: 'Schedule Free Consultation'
        },
        {
          name: 'ctaSecondaryText',
          title: 'Secondary CTA Text',
          type: 'string',
          initialValue: 'Call Now'
        }
      ]
    },

    // TESTIMONIALS SECTION
    {
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Testimonials Section',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Client Testimonials'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'What Our Clients Say'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'trustBadgeText',
          title: 'Trust Badge Text',
          type: 'string',
          initialValue: 'Trusted by 500+ clients across New Jersey'
        }
      ]
    },

    // BLOG SECTION
    {
      name: 'blogSection',
      title: 'Blog Section',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Blog Section',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Our Blog'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Latest Legal Insights'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'View All Articles'
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
        title: 'Homepage Content'
      }
    }
  }
}