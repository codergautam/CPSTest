import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { BannerAd, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = TestIds.BANNER;

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CPS Test</Text>
      <Text style={styles.subtitle}>How <Text style={{color: "red"}}>fast</Text> can you tap?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game', { seconds: 1 })}
      >
        <Text style={styles.buttonText}>1 Second</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#ff9500'}]}
        onPress={() => navigation.navigate('Game', { seconds: 5 })}
      >
        <Text style={styles.buttonText}>5 Seconds</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#ff3b30'}]}
        onPress={() => navigation.navigate('Game', { seconds: 60 })}
      >
        <Text style={styles.buttonText}>60 Seconds</Text>
      </TouchableOpacity>
      <BannerAd
        unitId={adUnitId}
        size={'320x100'}
      />
      <StatusBar style="auto" />
    </View>
  );
}

