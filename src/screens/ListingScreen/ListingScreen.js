// ListingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from "firebase/firestore";
import styles from './styles';
import { db } from '../../firebase/config';

export default function ListingScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);


    const fetchProducts = async () => {
        try {
            const productsCollection = collection(db, 'products');
            const querySnapshot = await getDocs(productsCollection);

            const productsArray = [];
            querySnapshot.forEach((doc) => {
                productsArray.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            setProducts(productsArray);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onEditPress = (productData) => {
        navigation.navigate('Product', { productData });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => onEditPress(item)}>
            <View style={styles.productItem}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDetail}>Quantidade: {item.quantity}</Text>
                <Text style={styles.productDetail}>Preço: ${item.price}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar"
                onChangeText={(text) => setSearch(text)}
                value={search}
            />
            <FlatList
                data={products}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
            />
        </View>
    );
}
