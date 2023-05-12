import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const StatsScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await SecureStore.getItemAsync('history');
      setHistory(JSON.parse(data));
    };
    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.when.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Date: {new Date(item.when).toLocaleDateString()}</Text>
            <Text style={styles.itemText}>Time: {item.seconds} seconds</Text>
            <Text style={styles.itemText}>Clicks: {item.clicks}</Text>
            <Text style={styles.itemText}>CPS: {item.cps.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d2d2d',
    textAlign: 'center',
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    color: '#2d2d2d',
  },
});

export default StatsScreen;