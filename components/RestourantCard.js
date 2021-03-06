import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const RestourantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Restourant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className={'bg-white mr-3 shadow'}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className='h-36 w-64 rounded'
      />
      <View className='px-3 pb-4'>
        <Text className='font-bold text-lg pt-2'>{title}</Text>
        <View className='flex-row items-center space-x-1'>
          <StarIcon color={'green'} opacity={0.5} size={22} />
          <Text className='text-gray-500 text-xs'>
            <Text className='text-green-500'>{rating}</Text>: {genre}
          </Text>
        </View>

        <View className='flex-row items-center space-x-1'>
          <LocationMarkerIcon color={'gray'} opacity={0.5} size={22} />
          <Text className='text-gray-500 text-xs'>Neaby: {address} </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestourantCard;
