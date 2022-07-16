export default {
  name: 'featured',
  title: 'Featured',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Dish name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {

      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'restourant',
      title: 'Restourant',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: "restourant"}]}
      ]
    },
  ],
};
