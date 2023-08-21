import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { BannerAd } from 'react-native-google-mobile-ads';
const adUnitId = Platform.OS == "android" ? "ca-app-pub-3340825671684972/8009602288" : "ca-app-pub-3340825671684973/2354553567"

export default function DuoGameScreen({ route, navigation }) {
  const { seconds } = route.params;
  const [tapsPlayer1, setTapsPlayer1] = useState(0);
  const [tapsPlayer2, setTapsPlayer2] = useState(0);
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    navigation.addListener('focus', () => {
        setTapsPlayer1(0);
        setTapsPlayer2(0);
        setTimeLeft(seconds);
        setGameStarted(false);
        setStartTime(Date.now());
    });
  }, []);

  useEffect(() => {
    if (gameStarted) {
      setTimeout(() => {
        if (gameStarted && timeLeft > 0) {
          setTimeLeft(Number(seconds - Number(((Date.now() - startTime) / 1000).toFixed(1))).toFixed(1));
        } else if (timeLeft <= 0) {
          setGameStarted(false);
          setTapsPlayer1(0);
          setTapsPlayer2(0);
          navigation.navigate('Result', { cpsPlayer1: tapsPlayer1 / seconds, cpsPlayer2: tapsPlayer2 / seconds, seconds, clicksPlayer1: tapsPlayer1, clicksPlayer2: tapsPlayer2 });
        }
      }, 100);
    }
  }, [timeLeft, gameStarted]);

  const handleTapPlayer1 = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
      setTimeLeft(seconds);
      setTapsPlayer1(0);
      setTapsPlayer2(0);
    } else if(timeLeft > 0) setTapsPlayer1(tapsPlayer1 + 1);
  };

  const handleTapPlayer2 = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
      setTimeLeft(seconds);
      setTapsPlayer1(0);
      setTapsPlayer2(0);
    } else if(timeLeft > 0) setTapsPlayer2(tapsPlayer2 + 1);
  };

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={'320x50'}
      />
      <Text style={styles.title}>2 Player Mode - Tap as fast as you can!</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{Math.max(timeLeft, 0)}</Text>
        <Text style={styles.timerLabel}>Seconds Left</Text>
      </View>

      <Text style={styles.resultLabel}>Player 1 Taps: {tapsPlayer1}</Text>
      <TouchableOpacity style={gameStarted ? styles.tapButtonPlayer1 : [styles.tapButtonPlayer1, {backgroundColor: '#234F1E'}]} onPress={handleTapPlayer1} disabled={timeLeft <= 0}>
        <Text style={styles.tapButtonText}>{gameStarted ? 'Tap!' : 'Start!'}</Text>
      </TouchableOpacity>

      <Text style={styles.resultLabel}>Player 2 Taps: {tapsPlayer2}</Text>
      <TouchableOpacity style={gameStarted ? styles.tapButtonPlayer2 : [styles.tapButtonPlayer2, {backgroundColor: '#234F1E'}]} onPress={handleTapPlayer2} disabled={timeLeft <= 0}>
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
    paddingTop: 20,
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
  tapButtonPlayer1: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    height: (Dimensions.get('window').height - 330) / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapButtonPlayer2: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    height: (Dimensions.get('window').height - 330) / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
});