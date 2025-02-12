import { useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../TaskContext';
import TaskForm from '../components/TaskForm'; // ייבוא של TaskForm
import { Text, Card, IconButton } from 'react-native-paper';

export default function Details() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { tasks, setTasks } = useTasks();
  const task = tasks.find((t) => t.id === Number(id)); // חיפוש המשימה על פי מזהה

  const [isEditing, setIsEditing] = useState(false);

  // פונקציה שתשמור את המשימה החדשה או תעדכן את המשימה הקיימת
  const handleTaskSubmit = (newTask) => {
    if (task) {
      setTasks(tasks.map((t) => (t.id === task.id ? newTask : t))); // עדכון משימה קיימת
    } else {
      setTasks([...tasks, newTask]); // הוספת משימה חדשה
    }
    setIsEditing(false); // סוגרים את מצב העריכה אחרי השמירה
  };

  // אם המשימה לא נמצאה, הראה הודעה
  if (!task && id) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTask}>Task not found</Text>
      </View>
    );
  }

  // פונקציה לאישור מחיקת המשימה
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

  // פונקציה לסגור את מצב העריכה בעת יציאה מהמסך
  const handleBack = () => {
    setIsEditing(false); // סגירת מצב העריכה
    router.push("/List"); // חזרה לדף הרשימה
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* כפתור חזרה */}
        <IconButton 
          icon="arrow-left" 
          size={28} 
          style={styles.backButton} 
          onPress={handleBack} // סגירת העריכה במקרה של חזרה
        />

        <Card style={styles.card}>
          <Card.Title
            title={isEditing ? 'Edit Task' : 'Task Details'}
            right={() => (
              <View style={styles.iconRow}>
                {/* כפתור עריכה */}
                <IconButton icon="pencil" size={24} onPress={() => setIsEditing(!isEditing)} />
                {/* כפתור מחיקה */}
                <IconButton icon="delete" size={24} color="red" onPress={confirmDelete} />
              </View>
            )}
          />
          <Card.Content>
            {isEditing ? (
              // הצגת טופס העריכה
              <TaskForm existingTask={task} onSave={handleTaskSubmit} />
            ) : (
              <>
                {/* הצגת פרטי המשימה */}
                <Text style={styles.infoText}>Task Name: {task?.title}</Text>
                <Text style={styles.infoText}>Description: {task?.description}</Text>
                <Text style={styles.infoText}>Due Date: {new Date(task?.dueDate).toDateString()}</Text>
                <Text style={styles.infoText}>Completed: {task?.done ? 'Yes' : 'No'}</Text>
              </>
            )}
          </Card.Content>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD', justifyContent: 'center' },
  backButton: { position: 'absolute', top: 20, left: 20, zIndex: 10 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
  iconRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  infoText: { fontSize: 16, marginBottom: 10 },
});
