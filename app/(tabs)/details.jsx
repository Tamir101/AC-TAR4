import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  const { title, done } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'No Task Selected'}</Text>
      <Text>Status: {done === 'true' ? '✅ Completed' : '⏳ Pending'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
