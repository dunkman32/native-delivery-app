import { View, Text, TouchableOpacity } from 'react-native';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter';

const BasketIcon = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity onPress={() => navigation.navigate('Basket')} className='mx-5 rounded-lg p-4 flex-row bg-[#00ccbb] items-center space-x-1'>
        <Text className='text-white font-extrabold text-lg  bg-[#01A296] py-1 px-2'>
          {items.length}
        </Text>
        <Text className='flex-1 text-white font-extrabold text-lg text-center'>
          View Basket
        </Text>
        <Text className={'text-lg text-white font-extrabold'}>
          <Currency quantity={basketTotal} currency='GBP' />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
