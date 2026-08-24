

// ===========================================
// sanity/schemas/county.js
// ===========================================
export default {
  name: 'county',
  title: 'NJ Counties',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'County Name',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'zipCodes',
      title: 'ZIP Codes',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Major ZIP codes in this county'
    },
    {
      name: 'majorCities',
      title: 'Major Cities',
      type: 'array',
      of: [{type: 'string'}]
    }
  ],
  initialValue: {
    name: 'Essex County'
  }
}
