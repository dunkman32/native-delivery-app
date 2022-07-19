import React from 'react';
import Currency from 'react-currency-formatter';
import { Image, Text, TouchableOpacity, View, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../features/basketSlice';
import { urlFor } from '../sanity';
import { Swipeable } from 'react-native-gesture-handler';

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [1, 1, 1, 1],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity
      className='h-full justify-center'
      onPress={onPress}
    >
      <View className='bg-[red] justify-center items-end'>
        <Animated.Text
          style={{ transform: [{ scale }] }}
          className='text-white p-7'
        >
          Remove
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const BasketItem = ({ items, item, id }) => {
  const dispatch = useDispatch();
  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={() => {
            dispatch(removeFromBasket(id));
          }}
        />
      )}
    >
      <View className='flex-row items-center space-x-3 bg-white px-5 py-2'>
        <Text className='text-[#00ccbb]'>{items.length} x</Text>
        <Image
          className='h-12 w-12 rounded-full'
          source={{
            uri: urlFor(item?.image).url(),
          }}
        />
        <Text className='flex-1'>{item?.name}</Text>
        <Text>
          <Currency quantity={item?.price * items.length} currency='GBP' />
        </Text>
      </View>
    </Swipeable>
  );
};

export default BasketItem;
