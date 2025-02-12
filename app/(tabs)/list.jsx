import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TaskList from '../components/TaskList';

export default function List() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD' },
  header: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#0D47A1' },
});
