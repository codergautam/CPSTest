import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import ResultScreen from './ResultScreen';
import StatsScreen from './StatsScreen';
import DuoGameScreen from './DuoGameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="DuoGame" component={DuoGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}