export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
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
      title: 'Testimonial Text',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required().max(500)
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
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'caseType',
      media: 'image'
    }
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
