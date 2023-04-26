import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import PureChart from 'react-native-pure-chart';

const ResultScreen = ({ route, navigation }) => {
const { cps, seconds, clicks, history } = route.params;
const [timeReached, setTimeReached] = useState(Date.now());

useEffect(() => {
  setTimeReached(Date.now());
}, []);

console.log(history);

return (
<View style={container}>
<Text style={title}>Results</Text>
<Text style={resultText}>You clicked {clicks} times in {seconds} seconds!</Text>
<Text style={resultText}>Your CPS: {cps.toFixed(2)}</Text>

<PureChart data={history} type='line' gap={(Dimensions.get('window').width - 120) / history.length} />

<View style={buttonsContainer}>
<TouchableOpacity
style={[button, playAgainButton]}
onPress={() =>
  Date.now() - timeReached > 300 ? navigation.navigate('Game', { seconds: seconds }) : null
}
>
<Text style={[buttonText, playAgainButtonText]}>Play Again</Text>
</TouchableOpacity>
<TouchableOpacity
style={[button, homeButton]}
onPress={() => Date.now() - timeReached > 300 ?  navigation.navigate('Home') : null}
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