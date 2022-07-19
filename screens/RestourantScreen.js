import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useLayoutEffect } from 'react';
import { Image, ScrollView, Text, Pressable, View } from 'react-native';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { urlFor } from '../sanity';
import { useDispatch } from 'react-redux'
import { setRessourant } from '../features/restourantSlice'

const RestourantScreen = () => {
  const {
    params: {
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
    },
  } = useRoute();

const dispatch = useDispatch()

  useEffect(() => {
      dispatch(setRessourant({
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
      }))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const navigation = useNavigation();

  return (
    <>
    <BasketIcon />
      <ScrollView>
        <View>
          <Image
            className='w-full h-56 bg-gray-300 p-4'
            source={{
              uri: urlFor(imgUrl).url(),
            }}
          />
        </View>

        <Pressable
          className='absolute top-10 left-5 p-2 bg-gray-300 rounded-full'
          onPress={navigation.goBack}
        >
          <ArrowLeftIcon color={'#00ccbb'} size={20} />
        </Pressable>
        <View className='bg-white'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{title}</Text>

            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row space-x-1 items-center'>
                <StarIcon color={'green'} opacity={0.5} size={22} />
                <Text className='text-gray-500 text-xs'>
                  <Text className='text-green-500'>{rating}</Text> : {genre}
                </Text>
              </View>

              <View className='flex-row space-x-1 items-center'>
                <LocationMarkerIcon color={'gray'} opacity={0.5} size={22} />
                <Text className='text-gray-500 text-xs'>
                  Nearby : {address}
                </Text>
              </View>
            </View>

            <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
          </View>

          <Pressable className='flex-row  items-center space-x-2 p-4 border-y border-gray-300'>
            <QuestionMarkCircleIcon color={'gray'} opacity={0.6} size={20} />
            <Text className='font-bold text-md pl-2 flex-1'>
              Have a food alergy?
            </Text>
            <ChevronRightIcon color='#00CCBB' />
          </Pressable>
        </View>

        <View className='pb-36'>
          <Text className='px-6 pt-4 pt-t font-bold text-xl'>Menu</Text>
          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestourantScreen;
