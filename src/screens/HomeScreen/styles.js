import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#27ae60',
        marginTop: 20,
        height: 48,
        width: '70%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'red', // ou a cor desejada para o botão de logout
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

    logoutButtonTitle: {
        color: 'white',
        textAlign: 'center',
    },
});
