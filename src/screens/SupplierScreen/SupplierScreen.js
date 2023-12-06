import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, doc, getDoc, collection, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

export default function SupplierScreen({ navigation }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cnpj, setCnpj] = useState(0);
    const [phone, setPhone] = useState(0);

    const onSavePress = async () => {
        try {
            if (!name || name.trim().length === 0) {
                throw new Error("O nome do fornecedor é obrigatório.");
            }

            if (!address || address.trim().length === 0) {
                throw new Error("O endereço do fornecedor é obrigatório.");
            }

            if (!cnpj || cnpj.trim().length !== 14) {
                throw new Error("O CNPJ do fornecedor deve ter 14 dígitos.");
            }

            if (!phone || phone.trim().length !== 11) {
                throw new Error("O telefone do fornecedor deve ter 11 dígitos.");
            }

            if (id) {
                // Update an existing supplier
                const supplierRef = doc(db, "supplier", id);
                await setDoc(supplierRef, {
                    name,
                    address,
                    cnpj,
                    phone,
                }, { merge: true });
                console.log(`Document updated with ID: ${id}`);
            } else {
                // Create a new supplier
                const docRef = await addDoc(collection(db, "supplier"), {
                    name,
                    address,
                    cnpj,
                    phone,
                });
                setId(docRef.id);
                console.log(`Document created with ID: ${docRef.id}`);
            }

            navigation.navigate('SupplierList');
        } catch (error) {
            console.error("Error saving/updating document: ", error);
        }
    };

    const onDeletePress = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este fornecedor?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        const supplierRef = doc(db, "supplier", id);
                        await deleteDoc(supplierRef);
                        console.log("Document deleted with ID: ", id);

                        setId('');
                        setName('');
                        setAddress('');
                        setCnpj(0);
                        setPhone(0);

                        navigation.navigate('SupplierList');
                    },
                },
            ],
            { cancelable: false }
        );
    };


    // useEffect(() => {
    //   try {
    //     const docRef = doc(db, 'suppliers', supplierId);
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       console.log("Document data:", docSnap.data());
    //     } else {
    //       // docSnap.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   } catch (error) {
    //     console.error('Error fetching supplier details:', error);
    //   }

    // });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Fornecedor</Text>

            <TextInput
                style={styles.input}
                placeholder='Id'
                onChangeText={(text) => setName(text)}
                value={id}
                editable={false}

            />

            <TextInput
                style={styles.input}
                placeholder='Nome'
                onChangeText={(text) => setName(text)}
                value={name}
            />

            <TextInput
                style={styles.input}
                placeholder='Endereço'
                onChangeText={(text) => setAddress(text)}
                value={address}
            />

            <TextInput
                style={styles.input}
                placeholder='CNPJ'
                onChangeText={(text) => setCnpj(text)}
                value={cnpj}
                keyboardType='numeric'
            />

            <TextInput
                style={styles.input}
                placeholder='Telefone'
                onChangeText={(text) => setPhone(text)}
                value={phone}
                keyboardType='numeric'
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
        </View>
    );
}

