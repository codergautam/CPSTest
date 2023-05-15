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

  function msToTime(duration) {
    const portions = [];
      const msInDay = 1000 * 60 * 60 * 24;
    const days = Math.trunc(duration / msInDay);
    if (days > 0) {
      portions.push(days + 'd');
      duration = duration - (days * msInDay);
    }

    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
      portions.push(hours + 'h');
      duration = duration - (hours * msInHour);
    }

    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
      portions.push(minutes + 'm');
      duration = duration - (minutes * msInMinute);
    }

    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
      portions.push(seconds + 's');
    }

    return portions[0];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <FlatList
        data={history.reverse()}
        keyExtractor={(item) => item.when.toString()}
        renderItem={({ item }) => (


          <View style={styles.item}>
            <Text style={styles.itemText}>Date: {new Date(item.when).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true }) + " (" + msToTime(Date.now() - item.when) + " ago)"}</Text>
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
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  flatList: {
    paddingVertical: 10,
  },
});

export default StatsScreen;
