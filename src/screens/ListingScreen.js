// ListingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from "firebase/firestore";
import styles from './styles';
import { db } from '../firebase/config';

export default function ListingScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


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
            setFilteredProducts(productsArray);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };

    const searchItem = (text) => {
        setSearch(text);

        // Filtrar os produtos com base no nome
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredProducts(filteredProducts);
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
            <View >
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.productDetails}>
                    <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
                    <Text style={styles.productQuantity}>Preço: ${item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar"
                onChangeText={(text) => searchItem(text)}
                value={search}
            />
            <FlatList style={styles.flatList}
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}
