import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from './styles';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const handleFooterLinkPress = () => {
        navigation.navigate('Registration');
    }

    const handleLoginPress = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Continue with signed-in user...
        } catch (error) {
            const { code, message } = error;
            // Handle login error...
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={text => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleLoginPress}>
                <Text style={styles.buttonTitle}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>
                    {' '}
                    <Text onPress={handleFooterLinkPress} style={styles.footerLink}>
                        Registrar
                    </Text>
                </Text>
            </View>
        </View >
    );
}
