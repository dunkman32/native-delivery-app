import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Pressable,
  View,
  Platform,
} from 'react-native';
import { XIcon } from 'react-native-heroicons/solid';
import MapView, { Marker } from 'react-native-maps';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { selectRestourant } from '../features/restourantSlice';

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restourant = useSelector(selectRestourant);

  return (
    <View className='bg-[#00ccbb] flex-1'>
      <SafeAreaView className='z-40'>
        <View className='flex-row justify-between items-center p-5'>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <XIcon color={'white'} size={30} />
          </Pressable>
          <Text className='font-light text-white text-lg'>Order help</Text>
        </View>

        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-gray-400 text-lg'>Estimated Arrival</Text>
              <Text className='font-bold text-4xl'>45-55 Minutes</Text>
            </View>
            <Image
              className='h-20 w-20'
              source={{
                uri: 'https://links.papareact.com/fls',
              }}
            />
          </View>
          <Progress.Bar
            size={30}
            className='z-0'
            color={'#00ccbb'}
            indeterminate={true}
          />
          <Text className='mt-3 text-gray-500'>
            Your order at {restourant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      {Platform.OS === 'android' ||
        (Platform.OS === 'ios' && restourant && (
          <MapView
            initialRegion={{
              latitude: restourant.lat,
              longitude: restourant.long,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            className={'flex-1 -mt-10 z-0'}
            mapType='mutedStandard'
          >
            <Marker
              coordinate={{
                latitude: restourant.lat,
                longitude: restourant.long,
              }}
              title={restourant.title}
              description={restourant.short_description}
              pinColor='#00ccbb'
            />
          </MapView>
        ))}

      <SafeAreaView className='bg-white flex-row items-center justify-between space-x-5 h-28 w-full'>
        <View className='flex-row items-center space-x-5'>
          <Image
            className='h-12 w-12 bg-gray-300 rounded-full ml-5'
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
          />
          <View>
            <Text className='text-lg'>noZZa</Text>
            <Text className='text-gray-400'>Your Rider</Text>
          </View>
        </View>
        <Text className='text-[#00ccbb] text-lg mr-5 font-bold'>Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
