import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestourant } from '../features/restourantSlice';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const restourant = useSelector(selectRestourant);
  const basketTotal = useSelector(selectBasketTotal);

  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    const tmp = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItems(tmp);
  }, [items]);

  return (
    <SafeAreaView className='bg-white flex-1'>
      <View className='flex-1 bg-gray-100'>
        <View className='border-b p-5 border-[#00ccbb] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>
              {restourant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100 absolute top-3 right-3'
          >
            <XCircleIcon color={'#00ccbb'} size={50} />
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 bg-white my-3 px-4 py-3'>
          <Image
            className='h-7 w-7 bg-gray-300 rounded-full'
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
          />
          <Text className='flex-1'>Deliver in 50-75 min</Text>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text className='text-[#00ccbb]'>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItems).map(([key, items]) => {
            const item = items[0];
            return (
              <View
                className='flex-row items-center space-x-3 bg-white px-5 py-2'
                key={key}
              >
                <Text className='text-[#00ccbb]'>{items.length} x</Text>
                <Image
                  className='h-12 w-12 rounded-full'
                  source={{
                    uri: urlFor(item?.image).url(),
                  }}
                />
                <Text className='flex-1'>{item?.name}</Text>
                <Text className={'bg-gray-400'}>
                  <Currency
                    quantity={item?.price * items.length}
                    currency='GBP'
                  />
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(removeFromBasket(key));
                  }}
                >
                  <Text className='text-[#00ccbb]'>Remove</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View className='mt-5 space-y-4 bg-white p-5'>
          <View className='flex-row justify-between'>
            <Text className={'text-gray-400'}>Subtotal</Text>
            <Text className={'text-gray-400'}>
              <Currency quantity={basketTotal} currency='GBP' />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className={'text-gray-400'}>Delivery fee</Text>
            <Text className={'text-gray-400'}>
              <Currency quantity={5.99} currency='GBP' />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className={'font-extrabold'}>
              <Currency quantity={basketTotal + 5.99} currency='GBP' />
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('PreparingOrder')} className='rounded-lg bg-[#00ccbb] p-4'>
            <Text className='text-center text-white text-lg font-bold'>
              Place order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
