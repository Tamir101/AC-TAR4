import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ListScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Finish project', done: false },
    { id: '2', title: 'Workout', done: true },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.task, item.done && styles.taskDone]}
            onPress={() => router.push({ pathname: '/details', params: { title: item.title, done: item.done } })}
          >
            <Text style={styles.taskText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  task: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  taskDone: { backgroundColor: '#d4edda' },
  taskText: { fontSize: 18 },
});
