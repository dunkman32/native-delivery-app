import { View, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import client, { urlFor } from '../sanity';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
      *[_type == "category"]`
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);


  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories?.map((cat) => {
        return (
        <CategoryCard
          imgUrl={urlFor(cat.image).url()}
          title={cat.name}
          key={cat._id}
        />
      )
      })}
    </ScrollView>
  );
};

export default Categories;
