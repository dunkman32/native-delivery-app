import React, { useRef } from 'react'
import Currency from 'react-currency-formatter'
import { Animated, Image, Pressable, Text, Vibration, View } from 'react-native'
import {
  Swipeable
} from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../features/basketSlice'
import { urlFor } from '../sanity'
import { TrashIcon } from 'react-native-heroicons/solid';


const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [1, 1, 1, 1],
    extrapolate: 'clamp',
  });
  return (
    <Pressable className='h-full justify-center' onPress={onPress}>
      <View className='bg-[red] justify-center items-end'>
        <Animated.View
          style={{ transform: [{ scale }] }}
          className='p-7'
        >
          <TrashIcon size={32} color='white'/>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const BasketItem = ({ items, item, id }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const onLongPress = () => {
    Vibration.vibrate()
    ref.current.openRight()
  }

  return (
    <Swipeable
      ref={ref}
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
      <Pressable onLongPress={onLongPress}>
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
      </Pressable>
    </Swipeable>
  );
};

export default BasketItem;
