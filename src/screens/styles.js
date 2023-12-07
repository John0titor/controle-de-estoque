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
        padding: 10,
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
        width: '95%',
        backgroundColor: '#87cefa',
        marginVertical: 3,
        borderRadius: 5,
        padding: 15,
        margin: 5,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
    },
    removeItemButton: {
        backgroundColor: '#ff6961',
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
        height: 50,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 10,
        marginBottom: 7,
        padding: 10,
    },
    productItem: {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 15,
        margin: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    productQuantity: {
        fontSize: 16,
    },
    productPrice: {
        fontSize: 16,
    },
    flatList: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
});
