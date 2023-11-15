import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
