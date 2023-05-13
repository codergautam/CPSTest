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
  const [loading, setLoading] = useState(false);
  const params = route.params;
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
    const unsubscribe = navigation.addListener('focus', () => {
      setLoaded(false);
        // do something
        const unsubscribe2 = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          setLoaded(true);
        });
        // when interstitial is closed
        interstitial.addAdEventListener(AdEventType.CLOSED, () => {
          setLoading(false);
        });
        // when failed to load
        interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
          console.log(error);
          setLoading(false);
        });



        // Start loading the interstitial straight away
        if(params?.fromResult) {
        console.log('trying to load interstitial')
        interstitial.load();
        setLoading(true);
        }


        // Unsubscribe from events on unmount
        return unsubscribe2;
    });
    return unsubscribe;
}, [navigation]);

  useEffect(() => {
    if (loaded) {
      try {
        interstitial.show();
        setLoaded(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [loaded]);

if(loading) return (
  <View style={styles.container}>
  <Text style={{color: "black"}}>Loading...</Text>
  </View>
)

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

