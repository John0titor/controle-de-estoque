import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import styles from './styles';

export default function HomeScreen({ navigation }) {

    const auth = getAuth()

    const onProductPress = () => {
        navigation.navigate('Product');
    };

    const onListingPress = () => {
        navigation.navigate('Listing');
    };

    const onSupplierPress = () => {
        navigation.navigate('Supplier');
    };

    const onOrderPress = () => {
        navigation.navigate('Order');
    };

    const onDashboardPress = () => {
        navigation.navigate('Dashboard');
    };


    const onLogoutPress = async () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela Inicial</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={onProductPress}>
                <Text style={styles.buttonTitle}>Ir para Produto</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={onListingPress}>
                <Text style={styles.buttonTitle}>Ir para Listagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={onSupplierPress}>
                <Text style={styles.buttonTitle}>Ir para Fornecedor</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={onDashboardPress}>
                <Text style={styles.buttonTitle}>Ir para Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={onOrderPress}>
                <Text style={styles.buttonTitle}>Ir para Pedido</Text>
            </TouchableOpacity>

            {/* Botão de Logout */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={onLogoutPress}>
                <Text style={styles.logoutButtonTitle}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}
