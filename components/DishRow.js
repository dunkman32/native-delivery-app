import { View, Text, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  selectBasketWithCurrentIdItems,
} from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) =>
    selectBasketWithCurrentIdItems(state, id)
  );

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length) return;
    dispatch(removeFromBasket(id));
  };

  return (
    <>
      <Pressable
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border border-gray-200 p-4 ${
          isPressed && 'border-b-0'
        }`}
      >
        <View className='flex-row'>
          <View className='flex-1 pr-2'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400'>{description}</Text>
            <Text className='text-gray-400'>
              <Currency quantity={price} currency='GBP' />
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#f3f3f3',
              }}
              className='h-20 w-20 bg-gray-300 p-4'
              source={{
                uri: urlFor(image).url(),
              }}
            />
          </View>
        </View>
      </Pressable>
      {isPressed && (
        <View className='bg-white px-4'>
          <View className='flex-row items-center space-x-2 pb-3'>
            <Pressable
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon
                color={items.length > 0 ? '#00ccbb' : 'gray'}
                size={40}
              />
            </Pressable>
            <Text>{items.length}</Text>
            <Pressable onPress={addItemToBasket}>
              <PlusCircleIcon
                color={items.length > 0 ? '#00ccbb' : 'gray'}
                size={40}
              />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
