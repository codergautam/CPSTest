import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { BannerAd } from 'react-native-google-mobile-ads';
const adUnitId = Platform.OS == "android" ? "ca-app-pub-3340825671684972/8009602288" : "ca-app-pub-3340825671684972/2354553566"


export default function GameScreen({ route, navigation }) {
  const { seconds } = route.params;
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        // do something
        setTaps(0);
        setTimeLeft(seconds);
        setGameStarted(false);
        setStartTime(Date.now());
        setHistory([]);
    });
    return unsubscribe;
}, [navigation]);

  useEffect(() => {
    if (gameStarted) {

      setTimeout(() => {
        if (gameStarted && timeLeft > 0) {
          setTimeLeft(Number(seconds - Number(((Date.now() - startTime) / 1000).toFixed(1))).toFixed(1));
          if(timeLeft > 0 && seconds-timeLeft > 0) {
            if(seconds < 30) {
          setHistory([...history, {x: (seconds-timeLeft).toFixed(1), y: Number((taps / (seconds-timeLeft)).toFixed(1))}]);
            } else {
              // only update once every 2 secs
              if((seconds-timeLeft) % 2 === 0) {
                setHistory([...history, {x: (seconds-timeLeft).toFixed(1), y: Number((taps / (seconds-timeLeft)).toFixed(1))}]);
              }
          }
        }
        } else if (timeLeft <= 0) {
          setGameStarted(false);
          setTaps(0);
          // Navigate to Result Screen
          navigation.navigate('Result', { cps: taps / seconds, seconds, clicks: taps, history: [...history,  {x: seconds, y: Number(taps / seconds.toFixed(1))}] });
        }
      }, 100);
    }
  }, [timeLeft, gameStarted]);

  const handleTap = () => {
    if (!gameStarted) {
    setGameStarted(true);
    setStartTime(Date.now());
    setTimeLeft(seconds);
    setTaps(0);
    setHistory([]);

  } else if(timeLeft > 0) setTaps(taps + 1);
  };


  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={'320x50'}
      />
      <Text style={styles.title}>Tap as fast as you can!</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{Math.max(timeLeft, 0)}</Text>
        <Text style={styles.timerLabel}>Seconds Left</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Taps:</Text>
        <Text style={styles.resultCount}>{taps}</Text>

      </View>
      { gameStarted && taps > 0 && (seconds - timeLeft) > 0 ?
      <Text style={styles.resultLabel}>CPS: {(taps / (seconds-timeLeft)).toFixed(1)}</Text>
      : null }
      <TouchableOpacity style={gameStarted ? styles.tapButton : [styles.tapButton, {backgroundColor: '#234F1E'}]} onPress={handleTap} disabled={timeLeft <= 0}>
        <Text style={styles.tapButtonText}>{gameStarted ? 'Tap!' : 'Start!'}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    paddingTop:20
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 10,
  },
  timerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tapButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    height: Dimensions.get('window').height - 330,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  resultLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  resultCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
