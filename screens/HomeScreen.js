import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronDownIcon,
  UserIcon,
  SearchIcon,
  AdjustmentsIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featured, setFeatured] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const fetchData = useCallback(() => {
    client
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restourant[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }`
      )
      .then((data) => {
        setFeatured(data);
      });
  }, []);

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView className='bg-white pt-5'>
      <View className='flex-row pb-3 items-center justify-between space-x-2  px-4'>
        <View className='flex-row  items-center space-x-2'>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className='g-7 w-7 bg-gray-300 p-4 rounded-full'
          />

          <View>
            <Text className='text-gray-400 font-bold'>Deliver now</Text>
            <Text className='font-bold text-xl'>
              Current location
              <ChevronDownIcon size={20} color='#00CCBB' />
            </Text>
          </View>
        </View>
        <UserIcon size={35} color='#00CCBB' />
      </View>
      <View className='flex-row items-center space-x-2 mx-4'>
        <View className='flex-row flex-1 bg-gray-200 p-3 '>
          <SearchIcon color='gray' size={20} />
          <TextInput
            placeholder='Restourants and cuisines'
            keyboardType='default'
          />
        </View>
        <AdjustmentsIcon color='#00CCBB' />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl refreshing={!featured.length} onRefresh={onRefresh} />
        }
        className='bg-gray-100 flex-1'
      >
        <Categories />

        {featured?.map((o) => (
          <FeaturedRow
            title={o.name}
            desc={o.short_description}
            id={o._id}
            key={o._id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
