import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../components/TaskContext';
import TaskForm from '../components/TaskForm';
import { Text } from 'react-native-paper';


export default function AddTask() {
  const router = useRouter();
  const { tasks, setTasks } = useTasks();
  const existingTask = useLocalSearchParams()?.id;

  const handleTaskSubmit = (newTask) => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1; 
    const taskWithId = { ...newTask, id: newId }; 
    setTasks([...tasks, taskWithId]); 
    router.push(`/List`); 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
        <TaskForm existingTask={existingTask} onSave={handleTaskSubmit} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD', justifyContent: 'center' },
  header: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#0D47A1' },
});
