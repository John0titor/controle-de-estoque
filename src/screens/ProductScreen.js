import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, doc, getDoc, collection, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import SupplierPicker from '../components/SupplierPicker';

export default function ProductScreen({ route, navigation }) {
    const { productData } = route.params || {};

    const [id, setId] = useState(productData?.id || '');
    const [name, setName] = useState(productData?.name || '');
    const [brand, setBrand] = useState(productData?.brand || '');
    const [unit, setUnit] = useState(productData?.unit || '');
    const [group, setGroup] = useState(productData?.group || '');
    const [price, setPrice] = useState(productData?.price?.toString() || '');
    const [supplier, setSupplier] = useState(productData?.supplier || '');
    const [quantity, setQuantity] = useState(productData?.quantity || 0);


    const onSavePress = async () => {
        try {
            if (!name || name.trim().length === 0) {
                throw new Error("O nome do produto é obrigatório.");
            }

            if (!brand || brand.trim().length === 0) {
                throw new Error("A marca do produto é obrigatória.");
            }

            if (!unit || unit.trim().length === 0) {
                throw new Error("A unidade do produto é obrigatória.");
            }

            if (!group || group.trim().length === 0) {
                throw new Error("O grupo do produto é obrigatório.");
            }

            if (!price || isNaN(parseFloat(price))) {
                throw new Error("O preço do produto é inválido.");
            }

            if (!supplier || supplier.trim().length === 0) {
                throw new Error("O fornecedor do produto é obrigatório.");
            }

            if (id) {
                // Update an existing product
                const productRef = doc(db, "products", id);
                await setDoc(productRef, {
                    name: name,
                    brand: brand,
                    unit: unit,
                    group: group,
                    price: parseFloat(price),
                    supplier: doc(db, "supplier", supplier),
                    quantity: parseInt(quantity),
                }, { merge: true });

                console.log(`Document updated with ID: ${id}`);
            } else {
                // Create a new product
                const docRef = await addDoc(collection(db, 'products'), {
                    name: name,
                    brand: brand,
                    unit: unit,
                    group: group,
                    price: parseFloat(price),
                    supplier: doc(db, "supplier", supplier),
                    quantity: parseInt(quantity),
                });

                setId(docRef.id);
                console.log(`Document created with ID: ${docRef.id}`);
            }
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    const handleSupplierChange = (supplierId) => {
        setSupplier(supplierId);
    };


    const onDeletePress = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este produto?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        const productRef = doc(db, 'products', id);
                        await deleteDoc(productRef);
                        console.log("Document deleted with ID: ", id);
                        setId('');
                        setName('');
                        setBrand('');
                        setUnit('');
                        setGroup('');
                        setPrice(0);
                        setSupplier('');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    // useEffect(() => {
    //     try {
    //         const docRef = doc(db, 'products', productId);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //             console.log("Document data:", docSnap.data());
    //         } else {
    //             // docSnap.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     } catch (error) {
    //         console.error('Error fetching product details:', error);
    //     }

    // });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Produto</Text>


            <TextInput
                style={styles.input}
                placeholder='Nome'
                onChangeText={(text) => setName(text)}
                value={name}
            />

            <TextInput
                style={styles.input}
                placeholder='Marca'
                onChangeText={(text) => setBrand(text)}
                value={brand}
            />

            <TextInput
                style={styles.input}
                placeholder='Unidade de Medida'
                onChangeText={(text) => setUnit(text)}
                value={unit}
            />

            <TextInput
                style={styles.input}
                placeholder='Grupo'
                onChangeText={(text) => setGroup(text)}
                value={group}
            />

            <TextInput
                style={styles.input}
                placeholder='Preço'
                onChangeText={(text) => setPrice(text)}
                value={price}
                keyboardType="numeric"
            />

            <SupplierPicker onSupplierChange={handleSupplierChange} />

            <TouchableOpacity
                style={styles.button}
                onPress={onSavePress}>
                <Text style={styles.buttonTitle}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: 'red' }]}
                onPress={onDeletePress}>
                <Text style={styles.buttonTitle}>Excluir</Text>
            </TouchableOpacity>
        </View >
    );
}
