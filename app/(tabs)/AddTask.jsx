import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../TaskContext';
import TaskForm from '../components/TaskForm';

export default function AddTask() {
  const router = useRouter();
  const { tasks, setTasks } = useTasks();
  const existingTask = useLocalSearchParams()?.id; // לא צריך לחפש אם יש משימה קיימת לפי מזהה

  const handleTaskSubmit = (newTask) => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1; // מחשב את ה-ID של המשימה החדשה
    const taskWithId = { ...newTask, id: newId }; // מוסיף את ה-ID לחשבונית החדשה
    setTasks([...tasks, taskWithId]); // הוספת המשימה החדשה עם ה-ID החדש
    router.push(`/List`); // ניווט לדף של המשימה החדשה על ידי המזהה שלה
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TaskForm existingTask={existingTask} onSave={handleTaskSubmit} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD', justifyContent: 'center' },
});
