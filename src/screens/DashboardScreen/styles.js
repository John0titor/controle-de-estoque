import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    dashboardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    dashboardItemLabel: {
        fontSize: 16,
    },
    dashboardItemValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});