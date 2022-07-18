import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 flex-col justify-center items-center gap-x-8'>
        <TouchableOpacity
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('Home')}
        >
          <Text>Delivery App</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('Picker')}
        >
          <Text>Image Picker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('Camera')}
        >
          <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='p-4 m-2 border-[#00ccbb] border-2	rounded-lg active:border-[#8b00cc]'
          onPress={() => navigation.navigate('SwipableScreen')}
        >
          <Text>SwipableScreen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;
