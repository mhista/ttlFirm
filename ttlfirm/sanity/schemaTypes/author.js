
// ===========================================
// sanity/schemas/author.js
// ===========================================
export default {
  name: 'author',
  title: 'Authors',
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
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'e.g., "Founder & Managing Attorney"'
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'twitter', title: 'Twitter', type: 'url'},
        {name: 'facebook', title: 'Facebook', type: 'url'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image'
    }
  }
}

