import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import * as Animate from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {

  const navigation = useNavigation()


  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery')
    }, 1000)
  }, [])

  return (
    <SafeAreaView className='bg-[#00ccbb] flex-1 justify-center items-center'>
      <Animate.Image
        source={require('../assets/delivery.png')}
        animation='slideInUp'
        iterationCount={1}
        className='h-96 w-96'
      />
      <Animate.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg my-10 text-white font-bold text-center'
      >
        <Text>Waiting for Restourant to accept your order!</Text>
      </Animate.Text>
      <ActivityIndicator size="large" color="#fff" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
