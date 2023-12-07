import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'
import styles from './styles';
import SearchableDropDown from 'react-native-searchable-dropdown';
import { View } from 'react-native';


const SupplierPicker = ({ onSupplierChange }) => {
    const [fornecedor, setFornecedor] = useState('');
    const [options, setSuppliers] = useState([]);

    const fetchSupplier = async () => {
        try {
            const supplierCollection = collection(db, 'supplier');
            const querySnapshot = await getDocs(supplierCollection);
            // { id: '', name: 'Escolha um fornecedor' }

            const supplierArray = [];
            querySnapshot.forEach((doc) => {
                supplierArray.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            setSuppliers(supplierArray);
        } catch (error) {
            console.error('Error fetching supplier:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchSupplier();
    }, []);

    useEffect(() => {
        onSupplierChange(fornecedor);
    }, [fornecedor, onSupplierChange]);

    return (
        <View style={styles.input}>
            <Picker
                mode='dialog'
                onValueChange={(value) => setFornecedor(value)}
                itemStyle={styles.input}
                prompt='Escolha um fornecedor'
            >
                {options.map((option) => (
                    <Picker.Item key={option.id} label={option.name} value={option.id} />
                ))}
            </Picker>
        </View >
    );


};

export default SupplierPicker;
