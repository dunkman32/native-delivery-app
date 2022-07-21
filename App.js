import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwindcss-react-native';
import HomeScreen from './screens/HomeScreen';
import RestourantScreen from './screens/RestourantScreen';
import BasketScreen from './screens/BasketScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import PickImage from './screens/examples/PickImage';
import Camera from './screens/examples/Camera';
import SwipableScreen from './screens/examples/SwipableScreen';
import Iframe from './screens/examples/Iframe';
import { store } from './store';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Provider store={store}>
          <TailwindProvider>
            <Stack.Navigator>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Restourant' component={RestourantScreen} />
              <Stack.Screen
                name='Basket'
                component={BasketScreen}
                options={{
                  presentation: 'modal',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='PreparingOrder'
                component={PreparingOrderScreen}
                options={{
                  presentation: 'fullScreenModal',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='Delivery'
                component={DeliveryScreen}
                options={{
                  presentation: 'fullScreenModal',
                  headerShown: false,
                }}
              />
              <Stack.Screen name='Picker' component={PickImage} />
              <Stack.Screen name='Camera' component={Camera} />
              <Stack.Screen name='SwipableScreen' component={SwipableScreen} />
              <Stack.Screen name='Iframe' component={Iframe} />
            </Stack.Navigator>
          </TailwindProvider>
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
