import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/solid';
import client from '../sanity';
import RestourantCard from './RestourantCard';

const FeaturedRow = ({ title, desc, id }) => {
  const [restourants, setRestourants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
      *[_type == "featured" && _id == $id] {
        ...,
        restourant[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
        }
      }[0]
      `,
        {
          id,
        }
      )
      .then((data) => {
        setRestourants(data?.restourant);
      });
  }, []);

  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <ArrowRightIcon color={'#00ccbb'} />
      </View>
      <Text className='text-xs px-4'>{desc}</Text>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
        {restourants?.map((restourant) => (
          <RestourantCard
            key={restourant._id}
            id={restourant._id}
            imgUrl={restourant.image}
            title={restourant.name}
            rating={restourant.rating}
            genre={restourant.type?.name}
            address={restourant.address}
            short_description={restourant.short_description}
            dishes={restourant.dishes}
            long={restourant.long}
            lat={restourant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
