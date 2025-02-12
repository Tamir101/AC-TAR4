import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import TaskSummary from '../components/TaskSummary';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>WELCOME</Text>
      <Text style={styles.motivation}>Take control of your tasks with ease!</Text>

      {/* סיכום המשימות מועבר לרכיב נפרד */}
      <TaskSummary />

      {/* כפתור הוספת משימה */}
      <Button
        mode="contained"
        onPress={() => router.push('/(tabs)/AddTask')}
        style={styles.addButton}
      >
        Add New Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD' },
  header: { fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginTop: 10, color: '#0D47A1' },
  motivation: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 30, color: '#0D47A1' },
  addButton: { backgroundColor: '#1E90FF', marginTop: 20 },
});
