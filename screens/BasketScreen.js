import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';
import {
  Image,
  SafeAreaView,
  Text,
  Pressable,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { useSelector } from 'react-redux';
import BasketItem from '../components/BasketItem';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestourant } from '../features/restourantSlice';

const BasketScreen = () => {
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
          <Pressable
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100 absolute top-3 right-3'
          >
            <XCircleIcon color={'#00ccbb'} size={50} />
          </Pressable>
        </View>
        <View className='flex-row items-center space-x-4 bg-white my-3 px-4 py-3'>
          <Image
            className='h-7 w-7 bg-gray-300 rounded-full'
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
          />
          <Text className='flex-1'>Deliver in 50-75 min</Text>
          <Pressable onPress={navigation.goBack}>
            <Text className='text-[#00ccbb]'>Change</Text>
          </Pressable>
        </View>

        <FlatList
          data={Object.entries(groupedItems)}
          renderItem={(it) => {
            const item = it.item[1][0];
            return (
              <BasketItem item={item} items={it.item[1]} id={it.item[0]} />
            );
          }}
          keyExtractor={(it) => it[0]}
        />

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
          <Pressable
            onPress={() => navigation.navigate('PreparingOrder')}
            className='rounded-lg bg-[#00ccbb] p-4'
          >
            <Text className='text-center text-white text-lg font-bold'>
              Place order
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
