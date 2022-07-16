export default {
  name: 'restourant',
  title: 'Restourant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restourant name',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200)
    },
    {
      name: 'image',
      title: 'image of restourant',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lat',
      title: 'Latitute',
      type: 'number',
    },
    {
      name: 'long',
      title: 'Longitude',
      type: 'number',
    },
    {
      name: 'address',
      title: 'Restourant address',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating from 1-5',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).error('Number must be between 1 and 5')
    },
    {
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'category'}]
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{
        type: 'reference', to: [{type: 'dish'}]
      }]
    },
  ],
}
