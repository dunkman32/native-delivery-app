export default {
  name: 'dish',
  title: 'Dish',
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
      name: 'price',
      title: 'Price og the dith in GPB',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image of category',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
};
