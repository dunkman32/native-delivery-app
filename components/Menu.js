import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = ({navigation}) => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 flex-col justify-center items-center gap-x-8'>
        <Pressable
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('Home')}
        >
          <Text>Delivery App</Text>
        </Pressable>
        <Pressable
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('Picker')}
        >
          <Text>Image Picker</Text>
        </Pressable>
        <Pressable
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('Camera')}
        >
          <Text>Camera</Text>
        </Pressable>
        <Pressable
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('SwipableScreen')}
        >
          <Text>SwipableScreen</Text>
        </Pressable>
        <Pressable
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('Iframe')}
        >
          <Text>Iframe</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
