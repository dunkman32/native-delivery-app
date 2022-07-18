import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

const list = [
  { id: 0, title: 'ზურა' },
  { id: 1, title: 'nozza' },
  { id: 2, title: 'rma' },
  { id: 3, title: 'sssssss' },
  { id: 4, title: 'anabsi' },
  { id: 5, title: 'cccccc' },
  { id: 6, title: 'asad' },
  { id: 7, title: 'azsx' },
  { id: 8, title: 'gess' },
  { id: 9, title: 'vvvvv' },
  { id: 10, title: 'agasgba' },
  { id: 11, title: 'zzxcz' },
  { id: 12, title: 'czcz' },
  { id: 13, title: 'gepoooooos' },
];

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 1],
    extrapolate: 'clamp',
  });
  return (
    <View className='bg-[#388e3c] justify-center flex-1'>
      <Animated.Text
        style={{ transform: [{ scale }] }}
        className='text-white p-7'
      >
        Add to card
      </Animated.Text>
    </View>
  );
};

const RightActions = ({ progress, dragX, onPress, id }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [1, 1, 1, 1],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity
      className='h-full justify-center'
      onPress={() => onPress(id)}
    >
      <View
        
        className='bg-[red] justify-center items-end'
      >
        <Animated.Text style={{ transform: [{ scale }] }} className='text-white p-7'>Delete</Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const ListItem = ({ title, onSwipeFromLeft, onRightPress, id }) => {
  return (
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={onSwipeFromLeft}
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          id={id}
          dragX={dragX}
          onPress={onRightPress}
        />
      )}
    >
      <View className='m-5 flex-1'>
        <Text className='text-lg text-black'>{title}</Text>
      </View>
    </Swipeable>
  );
};

const HR = () => <View className='flex-1 bg-[#e4e4e4] h-[1px]' />;

const SwipableScreen = () => {
  const [items, setItems] = useState(list);

  const onDeleteAction = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
            <ListItem
              {...item.item}
              onSwipeFromLeft={() => {
                alert('swiped from left');
              }}
              onRightPress={onDeleteAction}
            />
          );
        }}
        ItemSeparatorComponent={HR}
      />
    </SafeAreaView>
  );
};

export default SwipableScreen;
