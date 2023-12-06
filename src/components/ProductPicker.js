import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'
import styles from './styles';

const ProductsPicker = ({ onProductChange }) => {
    const [product, setProduct] = useState('');
    const [options, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const productsCollection = collection(db, 'products');
            const querySnapshot = await getDocs(productsCollection);

            const productsArray = [{ id: '', name: 'Escolha um produto' }];
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

    useEffect(() => {
        onProductChange(product);
    }, [product, onProductChange]);

    return (
        <Picker
            mode='dialog'
            style={styles.input}
            selectedValue={product}
            onValueChange={(value) => setProduct(value)}
            itemStyle={styles.input}
        >
            {options.map((option) => (
                <Picker.Item key={option.id} label={option.name} value={option} />
            ))}
        </Picker>
    );
};

export default ProductsPicker;
