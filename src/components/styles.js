import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'left',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 48,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f2f2f2',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 16,
    },
    button: {
        backgroundColor: '#3498db',
        marginTop: 20,
        height: 48,
        width: '100%',
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    itemText: {
        fontSize: 16,
    },
    removeItemButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    totalText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
});
