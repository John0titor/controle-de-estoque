import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, doc, getDoc, collection } from "firebase/firestore";
import { db } from '../../firebase/config';

export default function ProductScreen({ navigation }) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [unit, setUnit] = useState('');
    const [group, setGroup] = useState('');
    const [price, setPrice] = useState('');
    const [supplier, setSupplier] = useState('');

    const onSavePress = async () => {
        try {
            const docRef = await addDoc(collection(db, 'products'), {
                name: name,
                brand: brand,
                unit: unit,
                group: group,
                price: price,
                supplier: supplier,
            });
            console.log("Document written with ID: ", docRef.id);
            navigation.navigate('ProductList');
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    const onDeletePress = () => {
        // Lógica para excluir o produto
        // Você pode adicionar a lógica para confirmar a exclusão e depois navegar para a tela de lista de produtos
        // ou mostrar uma mensagem de sucesso/erro.
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
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
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
                />

                <TextInput
                    style={styles.input}
                    placeholder='Fornecedor'
                    onChangeText={(text) => setSupplier(text)}
                    value={supplier}
                />

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
            </KeyboardAwareScrollView>
        </View>
    );
}
