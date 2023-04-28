import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import PureChart from 'react-native-pure-chart';
import * as SecureStore from 'expo-secure-store';
import { BannerAd } from 'react-native-google-mobile-ads';

const adUnitId = Platform.OS == "android" ? "ca-app-pub-3340825671684972/8009602288" : "ca-app-pub-3340825671684972/2354553566"


const ResultScreen =  ({ route, navigation }) => {
const { cps, seconds, clicks, history } = route.params;
const [timeReached, setTimeReached] = useState(Date.now());
const [highScoreText, setHighScoreText] = useState("");

useEffect(() => {
  setTimeReached(Date.now());
}, []);


const handleSave = async () => {
  try {
    const value = await  SecureStore.getItemAsync('highscores');
    if (value !== null) {
      let returnval = `Your personal best for this mode: ${JSON.parse(value)[seconds+"seconds"]} CPS`
      // value previously stored
      const parsedValue = JSON.parse(value);
      if(parsedValue[seconds+"seconds"] === undefined) {
        parsedValue[seconds+"seconds"] = cps;
        returnval = `NEW PERSONAL BEST!`
      } else {
        if(Number(parsedValue[seconds+"seconds"]) < cps) {
          parsedValue[seconds+"seconds"] = cps;
          returnval = `NEW PERSONAL BEST!`
        }
      }
      await SecureStore.setItemAsync('highscores', JSON.stringify(parsedValue));
      return returnval;
    } else {
      const newHighscore = {};
      newHighscore[seconds+"seconds"] = cps;
      await SecureStore.setItemAsync('highscores', JSON.stringify(newHighscore));
      return `Score saved!`
    }
  } catch (error) {
    // Error saving data
    console.log(error);
    return "";
  }
};




useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
      handleSave().then((res) => {
        setHighScoreText(res);
      });
  });
  return unsubscribe;
}, [navigation]);

return (
<View style={container}>
<BannerAd
        unitId={adUnitId}
        size={'320x50'}
      />
<Text style={title}>Results</Text>
<Text style={resultText}>You clicked {clicks} times in {seconds} seconds!</Text>
<Text style={resultText}>Your CPS: {cps.toFixed(2)}</Text>
<Text style={resultText}>{highScoreText}</Text>

<PureChart data={history} type='line' gap={(Dimensions.get('window').width - 120) / history.length} />

<View style={buttonsContainer}>
<TouchableOpacity
style={[button, playAgainButton]}
onPress={() =>
  Date.now() - timeReached > 1000 ? navigation.navigate('Game', { seconds: seconds }) : null
}
>
<Text style={[buttonText, playAgainButtonText]}>Play Again</Text>
</TouchableOpacity>
<TouchableOpacity
style={[button, homeButton]}
onPress={() => Date.now() - timeReached > 1000 ?  navigation.navigate('Home', {fromResult: true}) : null}
>
<Text style={[buttonText, homeButtonText]}>Home</Text>
</TouchableOpacity>
</View>
</View>
);
};

const container = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  paddingHorizontal: 20,
};

const title = {
  fontSize: 36,
  fontWeight: 'bold',
  marginBottom: 20,
  color: '#2d2d2d',
};

const resultText = {
  fontSize: 24,
  textAlign: 'center',
  marginBottom: 30,
  color: '#2d2d2d',
};

const buttonsContainer = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  width: '100%',
  paddingHorizontal: 20,
};

const button = {
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 10,
};

const playAgainButton = {
  backgroundColor: '#2d2d2d',
};

const homeButton = {
  backgroundColor: '#5f5f5f',
};

const buttonText = {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#f5f5f5',
};

const playAgainButtonText = {
  color: '#f5f5f5',
};

const homeButtonText = {
  color: '#f5f5f5',
};

export default ResultScreen;