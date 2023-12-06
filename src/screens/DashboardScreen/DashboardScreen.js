import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const styles = require('./styles.js');

export default function DashboardScreen({ navigation }) {
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        // Fetch the dashboard data from the API
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            <FlatList
                data={dashboardData}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.dashboardItem}>
                        <Text style={styles.dashboardItemLabel}>{item.name}</Text>
                        <Text style={styles.dashboardItemValue}>{item.value}</Text>
                    </View>
                )}
            />
        </View>
    );
}