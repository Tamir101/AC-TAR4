import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button, RadioButton } from 'react-native-paper';
import { useTasks } from '../comps/TaskContext'; // ✅ שימוש ב-TaskContext

export default function details() {
  const { id } = useLocalSearchParams();
  const { tasks, setTasks } = useTasks();
  const router = useRouter();

  // 🔹 מציאת המשימה לפי ה-ID
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found</Text>
      </View>
    );
  }

  // 🔹 פונקציה לעדכון סטטוס המשימה
  const updateStatus = (newStatus) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  // 🔹 פונקציה למחיקת משימה עם אישור
  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
          setTasks(tasks.filter(t => t.id !== id));
          router.push('/list');
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Details</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>

          <View style={styles.row}>
            <Text style={styles.dueDate}>📅 Due Date: {new Date(task.dueDate).toDateString()}</Text>
            {task.urgent && <Text style={styles.urgent}>⚠️ Urgent</Text>}
          </View>

          <Text style={styles.status}>Status:</Text>
          <RadioButton.Group onValueChange={updateStatus} value={task.status || 'in-progress'}>
            <View style={styles.radioRow}>
              <RadioButton.Item label="✅ Completed" value="completed" />
              <RadioButton.Item label="⏳ In Progress" value="in-progress" />
              <RadioButton.Item label="❌ Cancelled" value="cancelled" />
            </View>
          </RadioButton.Group>
        </Card.Content>
      </Card>

      {/* 🔹 כפתורים לפעולות */}
      <View style={styles.buttonContainer}>
      <Button mode="contained" onPress={() => router.push({ pathname: '/addEdit', params: { id: task.id } })}>
  ✏️ Edit Task
</Button>


        <Button mode="contained" onPress={handleDelete} style={styles.deleteButton}>
          🗑️ Delete Task
        </Button>
      </View>
    </View>
  );
}

// ✅ סגנונות מותאמים לסגנון של שאר הדפים
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD', justifyContent: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#0D47A1' },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, marginBottom: 20 },

  title: { fontSize: 24, fontWeight: 'bold', color: '#0D47A1', textAlign: 'center', marginBottom: 10 },
  description: { fontSize: 18, textAlign: 'center', color: '#333', marginBottom: 15 },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  dueDate: { fontSize: 16, color: '#555' },
  urgent: { fontSize: 16, fontWeight: 'bold', color: 'red' },

  status: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginBottom: 15, color: '#0D47A1' },
  radioRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },

  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  editButton: { backgroundColor: '#1E90FF', paddingVertical: 5 },
  deleteButton: { backgroundColor: 'red', paddingVertical: 5 },
});
