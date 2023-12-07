import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Estilos do primeiro arquivo
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        height: 50,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerView: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d',
    },
    footerLink: {
        color: '#3498db',
        fontWeight: 'bold',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3498db',
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
    },
    removeItemButton: {
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 5,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },

    // Estilos do terceiro arquivo
    paddingContainer: {
        padding: 16,
    },

    // Estilos do quarto arquivo
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: '#2e2e2d',
    },

    // Estilos do quinto arquivo
    logoutButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    logoutButtonTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Estilos do sexto arquivo
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 5,
    },
    productItem: {
        backgroundColor: '#3498db',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    productDetail: {
        fontSize: 14,
        color: '#fff',
    },
});
