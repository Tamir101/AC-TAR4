import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Card, RadioButton, Text } from 'react-native-paper';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTasks } from '../comps/TaskContext'; // ✅ שימוש ב-TaskContext

export default function addEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // ✅ מזהה המשימה אם זו עריכה
  const { tasks, setTasks } = useTasks();

  // 🔹 חיפוש המשימה הקיימת אם עורכים משימה
  const existingTask = tasks.find(t => t.id === id);

  // 🔹 הגדרת מצב הטופס
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ✅ אתחול הטופס כאשר מזהה המשימה משתנה
  useEffect(() => {
    if (existingTask) {
      setTaskName(existingTask.title);
      setTaskDescription(existingTask.description);
      setIsUrgent(existingTask.urgent);
      setDueDate(new Date(existingTask.dueDate));
    } else {
      resetForm(); // אם אין משימה לעריכה, מאפסים את השדות
    }
  }, [id]);

  // ✅ ניקוי הטופס בכל פעם שיוצאים וחוזרים לדף
  useFocusEffect(
    useCallback(() => {
      return () => resetForm();
    }, [])
  );

  // 🔹 פונקציה לאיפוס כל השדות בטופס
  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setIsUrgent(false);
    setDueDate(new Date());
  };

  // 🔹 פתיחת בורר תאריך
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  // 🔹 שמירת משימה חדשה או עדכון קיימת
  const handleSaveTask = () => {
    if (taskName.trim() === '') {
      alert('📌 Please enter a task name');
      return;
    }

    const updatedTask = {
      id: id || Date.now().toString(), // ✅ אם זו משימה חדשה - ניצור לה ID חדש
      title: taskName,
      description: taskDescription,
      urgent: isUrgent,
      dueDate: dueDate.toISOString(),
      status: existingTask ? existingTask.status : 'in-progress',
      done: existingTask ? existingTask.done : false,
    };

    if (existingTask) {
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task))); // ✅ עדכון משימה קיימת
    } else {
      setTasks([...tasks, updatedTask]); // ✅ יצירת משימה חדשה
    }

    resetForm(); // ✅ ניקוי השדות אחרי השמירה
    router.push('/list'); // ✅ חזרה לרשימה
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <View style={styles.container}>
        <Text style={styles.title}>{existingTask ? '✏️ Edit Task' : '➕ Add New Task'}</Text>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Task Name"
              value={taskName}
              onChangeText={setTaskName}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Short Description"
              value={taskDescription}
              onChangeText={setTaskDescription}
              style={styles.input}
              mode="outlined"
            />

            <Text style={styles.radioTitle}>Is this task urgent?</Text>
            <View style={styles.radioRow}>
              <RadioButton value="yes" status={isUrgent ? 'checked' : 'unchecked'} onPress={() => setIsUrgent(true)} />
              <Text>Yes</Text>
              <RadioButton value="no" status={!isUrgent ? 'checked' : 'unchecked'} onPress={() => setIsUrgent(false)} />
              <Text>No</Text>
            </View>

            <Text style={styles.radioTitle}>Due Date:</Text>
            <Button mode="outlined" onPress={openDatePicker} style={styles.dateButton}>
              📅 {dueDate.toDateString()}
            </Button>

            {showDatePicker && Platform.OS === 'ios' && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDueDate(selectedDate);
                }}
              />
            )}

            <Button mode="contained" onPress={handleSaveTask} style={styles.saveButton}>
              {existingTask ? '💾 Save Changes' : '➕ Add Task'}
            </Button>
          </Card.Content>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}

// ✅ סגנון תואם לשאר הדפים
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#0D47A1' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
  input: { marginBottom: 15 },
  radioTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  dateButton: { marginBottom: 15, borderColor: '#1E90FF', borderWidth: 1 },
  saveButton: { backgroundColor: '#1E90FF', marginTop: 10 },
});
