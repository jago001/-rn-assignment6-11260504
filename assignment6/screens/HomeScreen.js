import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', title: 'Office Wear', price: '$120', image: require('../assets/dress1.png') },
  { id: '2', title: 'Black', price: '$120', image: require('../assets/dress2.png') },
  { id: '3', title: 'Church Wear', price: '$120', image: require('../assets/dress3.png') },
  { id: '4', title: 'Lamerei', price: '$120', image: require('../assets/dress4.png') },
  { id: '5', title: '21WN', price: '$120', image: require('../assets/dress5.png') },
  { id: '6', title: 'Lopo', price: '$120', image: require('../assets/dress3.png') },
  { id: '7', title: '21WN', price: '$120', image: require('../assets/dress6.png') },
  { id: '8', title: 'lame', price: '$120', image: require('../assets/dress7.png') },
];

const ProductCard = ({ item, onAddToCart }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.price}>{item.price}</Text>
    <TouchableOpacity style={styles.plusButton} onPress={() => onAddToCart(item)}>
      <Text style={styles.plusText}>+</Text>
    </TouchableOpacity>
  </View>
);

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity>
      <Image source={require('../assets/Menu.png')} style={styles.icon} />
    </TouchableOpacity>
    <Image source={require('../assets/Logo.png')} style={styles.logo} />
    <View style={styles.rightIcons}>
      <TouchableOpacity>
        <Image source={require('../assets/Search.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
        <Image source={require('../assets/shoppingBag.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      const parsedItems = storedItems ? JSON.parse(storedItems) : [];
      setCartItems(parsedItems);
    } catch (error) {
      console.error('Error retrieving cart items:', error);
    }
  };

  const addToCart = async (item) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    try {
      const jsonValue = JSON.stringify(newCartItems);
      await AsyncStorage.setItem('cartItems', jsonValue);
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} onAddToCart={addToCart} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderIcons: {
    flexDirection: 'row',
  },
  subIcon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  list: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#f00',
    marginVertical: 8,
  },
  plusButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
