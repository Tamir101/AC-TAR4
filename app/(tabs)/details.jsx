import { useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../components/TaskContext';
import TaskForm from '../components/TaskForm'; 
import { Text, Card, IconButton, Chip } from 'react-native-paper';

export default function Details() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { tasks, setTasks } = useTasks();
  const task = tasks.find((t) => t.id === Number(id)); 
  const [isEditing, setIsEditing] = useState(false);

  const handleTaskSubmit = (newTask) => {
    if (task) {
      setTasks(tasks.map((t) => (t.id === task.id ? newTask : t))); 
    } else {
      setTasks([...tasks, newTask]); 
    }
    setIsEditing(false); 
  };

  if (!task && id) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTask}>Task not found</Text>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
            setTasks(tasks.filter((t) => t.id !== Number(id)));
            router.push("/List");
        }},
      ]
    );
  };

  const handleBack = () => {
    setIsEditing(false);
    router.push("/List"); 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <IconButton 
          icon="arrow-left" 
          size={28} 
          style={styles.backButton} 
          onPress={handleBack} 
        />

        <Card style={styles.card}>
          <Card.Title
            title={isEditing ? 'Edit Task' : 'Task Details'}
            right={() => (
              <View style={styles.iconRow}>
                <IconButton icon="pencil" size={24} onPress={() => setIsEditing(!isEditing)} />
                <IconButton icon="delete" size={24} color="red" onPress={confirmDelete} />
              </View>
            )}
          />
          <Card.Content>
            {isEditing ? (
              <TaskForm existingTask={task} onSave={handleTaskSubmit} />
            ) : (
              <>
                <Text style={styles.taskTitle}>{task?.title}</Text>
                <Text style={styles.taskDescription}>{task?.description}</Text>
                <Text style={styles.dueDate}>Due Date: {new Date(task?.dueDate).toDateString()}</Text>
                <Text style={[styles.taskStatus, task?.done ? styles.doneStatus : styles.pendingStatus]}>
                  Status: {task?.done ? 'Completed' : 'Pending'}
                </Text>
                {/* הצגת הצ'יפ בהתאם אם דחוף או לא */}
                <Chip 
                  style={[
                    styles.urgentChip, 
                    task?.urgent ? styles.urgent : styles.notUrgent
                  ]}
                >
                  {task?.urgent ? 'Urgent' : 'Not Urgent'}
                </Chip>
              </>
            )}
          </Card.Content>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E3F2FD' },
  backButton: { position: 'absolute', top: 20, left: 20, zIndex: 10 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', maxHeight: 600, elevation: 4, alignItems: 'center' },
  iconRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  taskTitle: { fontSize: 24, fontWeight: 'bold', color: '#212121', marginBottom: 8, textAlign: 'center' },
  taskDescription: { fontSize: 16, color: '#616161', marginBottom: 8, textAlign: 'center' },
  dueDate: { fontSize: 14, color: '#1E88E5', marginBottom: 8, textAlign: 'center' },
  taskStatus: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  doneStatus: { color: '#4CAF50' },
  pendingStatus: { color: '#D32F2F' },
  urgentChip: { marginTop: 10, padding: 5, alignSelf: 'center' },
  urgent: { backgroundColor: '#FFCDD2', color: '#D32F2F' },
  notUrgent: { backgroundColor: '#C8E6C9', color: '#388E3C' },
  noTask: { fontSize: 24, fontWeight: 'bold', color: '#D32F2F', textAlign: 'center', padding: 20 },
});
