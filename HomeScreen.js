import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import styles from './styles';
import { AdEventType, BannerAd, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';


// check if ios or android
const adUnitId = Platform.OS == "android" ? "ca-app-pub-3340825671684972/8009602288" : "ca-app-pub-3340825671684972/2354553566"
const adUnitIdInterstitial = Platform.OS == "android" ? "ca-app-pub-3340825671684972/3944350291" : "ca-app-pub-3340825671684972/4789145211"
const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
});
export default function HomeScreen({ navigation, route }) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState([0, false]);
  const params = route.params;

  useEffect(() => {
    console.log('adding a bunch of listeners this shuld only happen once')
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });
    // when interstitial is closed
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoading([false, false]);
    });
    // when failed to load
    interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log(error, "error", loading);
      // just say its loaded so we advance to the game screen
      setLoaded(true);
    });

    interstitial.addAdEventListener(AdEventType.CLICKED, () => {
      setLoading([false, false]);
    });
  }, []);

  // useEffect(() => {
  //   if(route.params?.fromResult) {
  //   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //     setLoaded(true);
  //   });

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  //   }
  // }, []);


  useEffect(() => {
    if (loaded) {
      try {
        try {
        interstitial.show();
        } catch (error) {
          console.log(error);
        }

        navigation.navigate(loading[1]?'DuoGame':'Game', {seconds: loading[0]});
        setLoaded(false);

        setLoading([0, false]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [loaded]);


  useEffect(() => {
    if(loading[0] > 0) {
    interstitial.load();
    }
  }, [loading]);

if(loading[0]) return (
  <View style={styles.container}>
  <Text style={{color: "black"}}>Loading...</Text>
  </View>
)

function navigateToGame(seconds, dualPlayer = false) {
  if(params?.fromResult) {
  setLoading([seconds, dualPlayer]);

  } else {
    navigation.navigate(dualPlayer?'DuoGame':'Game', {seconds: seconds});
  }
}

  return (
        <View style={styles.container}>
      <Text style={styles.title}>CPS Test</Text>
      <Text style={styles.subtitle}>How <Text style={{color: "red"}}>fast</Text> can you tap?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToGame(1)}
      >
        <Text style={styles.buttonText}>1 Second</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#ff9500'}]}
        onPress={() => navigateToGame(5)}
      >
        <Text style={styles.buttonText}>5 Seconds</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#ff3b30'}]}
        onPress={() => navigateToGame(60)}
      >
        <Text style={styles.buttonText}>60 Seconds</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#ff3b30'}]}
        onPress={() => navigateToGame(10, true)}
      >
        <Text style={styles.buttonText}>Two Player (new)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#007aff'}]}
        onPress={() => navigation.navigate('Stats')}
      >
        <Text style={styles.buttonText}>Stats</Text>
      </TouchableOpacity>

      <BannerAd
        unitId={adUnitId}
        size={'320x100'}
      />
      <StatusBar style="auto" />
    </View>
  )
}

