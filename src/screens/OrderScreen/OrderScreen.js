import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Provider, TextInput, Button, HelperText, Portal, Modal, Text, List } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import SupplierPicker from '../../components/SupplierPicker';
import { addDoc, doc, setDoc, Timestamp, increment } from "firebase/firestore";
import ProductsPicker from '../../components/ProductPicker';

export default function OrderScreen() {
    const [id, setId] = useState('');
    const [items, setItems] = useState([]);
    const [newProductId, setNewProductId] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState(1);
    const [fornecedor, setFornecedor] = useState('');
    const [date, setDate] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [valorFrete, setValorFrete] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);


    const showDatePicker = () => setDatePickerVisible(true);
    const hideDatePicker = () => setDatePickerVisible(false);


    const addItem = () => {
        setItems([...items, { productId: newProductId, price: newProductPrice, quantity: newProductQuantity, name: newProductName }]);
        setNewProductId('');
        setNewProductName('');
        setNewProductPrice('');
        setNewProductQuantity(1);
    };

    const incrementQuantity = async (productId, qnt) => {
        const itemRef = doc(db, 'products', productId);

        await updateDoc(itemRef, {
            quantity: increment(parseInt(qnt))
        });
    };

    const removeItem = (index) => {
        const newItems = items.filter((item, i) => i !== index);
        setItems(newItems);
    };

    const handleSupplierChange = (supplierId) => {
        setFornecedor(supplierId);
    };

    const handleProductChange = (product) => {
        setNewProductId(product.id);
        setNewProductName(product.name);
    };

    const calculateTotal = () => {
        let total = valorFrete;
        items.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    };


    const onSaveOrderPress = async () => {
        try {
            if (!fornecedor) {
                throw new Error("Selecione um fornecedor.");
            }

            if (!timestamp) {
                throw new Error("Selecione uma data.");
            }

            if (items.length === 0) {
                throw new Error("Adicione pelo menos um item ao pedido.");
            }

            items.forEach((item, index) => {
                if (!item.name || !item.price || !item.quantity) {
                    throw new Error(`Preencha corretamente os detalhes do item ${index + 1}.`);
                }
            });



            const orderData = {
                supplier: doc(db, "supplier", fornecedor),
                date: timestamp,
                freight: parseFloat(valorFrete),
                amount: items.map(item => item.quantity),
                products: items.map(item => doc(db, "products", item.productId)),
            };

            items.forEach((item) => {
                incrementQuantity(item.productId, item.quantity)
            });

            if (id) {
                const orderRef = doc(db, "order", id);
                await setDoc(orderRef, orderData, { merge: true });
                console.log(`Order updated with ID: ${id}`);
            } else {
                const orderRef = await addDoc(collection(db, "order"), orderData);
                setId(orderRef.id);
                console.log(`Order created with ID: ${orderRef.id}`);
            }

            console.log("Order saved/updated successfully!");

        } catch (error) {
            console.error("Error saving/updating order: ", error);
        }
    };


    const handleConfirm = (selectedDate) => {
        hideDatePicker();
        const d = new Date(selectedDate);
        setTimestamp(Timestamp.fromDate(d));
        console.log(timestamp.toString());

        setDate(d.toLocaleDateString());
    };

    const saveInfo = () => {
        handlePress();
        if (fornecedor == '') {
            throw new Error("Selecione um fornecedor.");
        }

        if (!timestamp) {
            throw new Error("Selecione uma data.");
        }

    }

    const handlePress = () => setExpanded(!expanded);

    useEffect(() => {
    }, []);

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.title}>Pedido</Text>

                <List.Section>
                    <List.Accordion
                        title="Informações"
                        left={(props) => <List.Icon {...props} icon='' />}
                        expanded={expanded}
                        onPress={handlePress}
                    >


                        <SupplierPicker onSupplierChange={handleSupplierChange} />


                        {isDatePickerVisible ? (
                            <TextInput
                                placeholder="Data"
                                value={date.toLocaleString()}
                                style={styles.input}
                                editable={false}
                            />
                        ) : (
                            <TextInput
                                placeholder="Data"
                                value={date}
                                style={styles.input}
                                onTouchStart={showDatePicker}
                            />
                        )}
                        <Portal>
                            <Modal visible={isDatePickerVisible} onDismiss={hideDatePicker}>
                                <View style={{ backgroundColor: 'white', padding: 16 }}>
                                    <DateTimePicker
                                        isVisible={isDatePickerVisible}
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        mode="date"
                                    />
                                </View>
                            </Modal>
                        </Portal>

                        <TextInput
                            style={styles.input}
                            placeholder="Valor do frete"
                            value={valorFrete}
                            onChangeText={(text) => setValorFrete(parseInt(text))}
                            keyboardType="numeric"
                        />

                        <Button onPress={handlePress}>Salvar</Button>
                    </List.Accordion>
                </List.Section>

                <ProductsPicker onProductChange={handleProductChange} />

                <TextInput
                    style={styles.input}
                    placeholder="Preço"
                    value={newProductPrice}
                    onChangeText={(text) => setNewProductPrice(text)}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Quantidade "
                    value={newProductQuantity.toString()}
                    onChangeText={(text) => setNewProductQuantity(text)}
                    keyboardType="numeric"
                />



                <TouchableOpacity style={styles.button} onPress={addItem}>
                    <Text style={styles.buttonText}>Adicionar produto</Text>
                </TouchableOpacity>

                <FlatList
                    data={items}
                    renderItem={({ item, index }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.itemText}>R${item.price}</Text>
                            <Text style={styles.itemText}>Qnt: {item.quantity}</Text>
                            <TouchableOpacity style={styles.removeItemButton} onPress={() => removeItem(index)}>
                                <Text style={styles.buttonText}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.name}
                />

                <Text style={styles.totalText}>Total: R${calculateTotal()}</Text>

                <TouchableOpacity style={styles.button} onPress={onSaveOrderPress}>
                    <Text style={styles.buttonText}>Salvar pedido</Text>
                </TouchableOpacity>
            </View >
        </Provider >
    );
}
