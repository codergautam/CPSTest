import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function ResultScreen({ route, navigation }) {
const { cps, seconds } = route.params;

return (
<View style={styles.container}>
<Text style={styles.title}>Results</Text>
<Text style={styles.resultText}>{seconds} second{seconds > 1 ? 's' : ''} test</Text>
<Text style={styles.resultText}>Your CPS: {cps.toFixed(2)}</Text>
<TouchableOpacity
style={styles.button}
onPress={() => navigation.navigate('Game', { seconds: seconds })}
>
<Text style={styles.buttonText}>Play Again</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.button}
onPress={() => navigation.navigate('Home')}
>
<Text style={styles.buttonText}>Home</Text>
</TouchableOpacity>
<StatusBar style="auto" />
</View>
);
}