// ===========================================
// sanity/schemas/siteSettings.js
// Global site settings (contact info, social links, etc.)
// ===========================================
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton - only one document allowed
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: Rule => Rule.required().email()
        },
        {
          name: 'address',
          title: 'Physical Address',
          type: 'object',
          fields: [
            {name: 'street', title: 'Street Address', type: 'string'},
            {name: 'city', title: 'City', type: 'string'},
            {name: 'state', title: 'State', type: 'string'},
            {name: 'zipCode', title: 'ZIP Code', type: 'string'},
            {name: 'country', title: 'Country', type: 'string', initialValue: 'US'}
          ]
        }
      ]
    },
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        {name: 'weekdays', title: 'Weekdays', type: 'string', initialValue: 'Mo-Fr 09:00-17:00'},
        {name: 'weekdaysDisplay', title: 'Weekdays (Display)', type: 'string', initialValue: 'Monday - Friday: 9:00 AM - 5:00 PM'},
        {name: 'weekend', title: 'Weekend', type: 'string', initialValue: 'Closed'},
      ]
    },
    {
      name: 'social',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook URL', type: 'url'},
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn URL', type: 'url'},
        {name: 'tiktok', title: 'TikTok URL', type: 'url'},
        {name: 'twitter', title: 'Twitter/X URL', type: 'url'}
      ]
    },
    {
      name: 'stats',
      title: 'Firm Statistics',
      type: 'object',
      description: 'Statistics displayed on homepage',
      fields: [
        {
          name: 'casesHandled',
          title: 'Cases Handled',
          type: 'number',
          initialValue: 500
        },
        {
          name: 'yearsExperience',
          title: 'Years of Experience',
          type: 'number',
          initialValue: 8
        },
        {
          name: 'countiesServed',
          title: 'Counties Served',
          type: 'number',
          initialValue: 7
        },
        {
          name: 'clientSatisfaction',
          title: 'Client Satisfaction Rate',
          type: 'number',
          initialValue: 100,
          description: 'Percentage (0-100)'
        }
      ]
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alt Text', type: 'string'}
      ]
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    },
    {
      name: 'defaultOGImage',
      title: 'Default Open Graph Image',
      type: 'image',
      description: 'Default social sharing image (1200x630px recommended)'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
}