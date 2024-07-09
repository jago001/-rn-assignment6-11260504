import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    storeData(cart);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    storeData(cart);
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cart');
      const retrievedCart = jsonValue != null ? JSON.parse(jsonValue) : [];
      setCart(retrievedCart);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('cart', jsonValue);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Products' }}
          initialParams={{ addToCart }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Cart' }}
          initialParams={{ cart, removeFromCart }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
