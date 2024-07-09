import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => (
  <View style={styles.headerContainer}>
    <Image source={require('../assets/Logo.png')} style={styles.logo} />
    <View style={styles.rightIcons}>
      <TouchableOpacity>
        <Image source={require('../assets/Search.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const SubHeader = () => (
  <View style={styles.subHeaderContainer}>
    <Text style={styles.subHeaderText}>OUR STORY</Text>
    <View style={styles.subHeaderIcons}>
      <TouchableOpacity>
        <Image source={require('../assets/Filter.png')} style={styles.subIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../assets/Listview.png')} style={styles.subIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

const CartItem = ({ item }) => (
  <View style={styles.cartItem}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  </View>
);

const CartScreen = () => {
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

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      )}
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

export default CartScreen;
