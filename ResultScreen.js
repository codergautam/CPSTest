
import styles from './styles';
import { Text, View } from 'react-native';

export default function ResultScreen({ route }) {
  const { seconds } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.result}>You selected {seconds} seconds</Text>
    </View>
  );
}