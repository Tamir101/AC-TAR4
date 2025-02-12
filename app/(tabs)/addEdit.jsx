import { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Card, RadioButton, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../comps/TaskContext';

export default function addEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { tasks, setTasks } = useTasks();
  const existingTask = tasks.find((t) => t.id === Number(id)) || null;

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (existingTask) {
      setTaskName(existingTask.title || '');
      setTaskDescription(existingTask.description || '');
      setIsUrgent(existingTask.urgent || false);
      setDueDate(existingTask.dueDate ? new Date(existingTask.dueDate) : new Date());
    } else {
      resetForm();
    }
  }, [existingTask]);

  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setIsUrgent(false);
    setDueDate(new Date());
  };

  const handleSubmit = () => {
    if (taskName.trim() === '') {
      alert('📌 Please enter a task name');
      return;
    }

    const newTask = {
      id: existingTask ? existingTask.id : Date.now(),
      title: taskName,
      description: taskDescription,
      urgent: isUrgent,
      dueDate: dueDate.toISOString(),
      done: existingTask ? existingTask.done : false,
    };

    if (existingTask) {
      setTasks(tasks.map((t) => (t.id === existingTask.id ? newTask : t)));
    } else {
      setTasks([...tasks, newTask]);
    }

    router.push('/list');
    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput label="Task Name" value={taskName} onChangeText={setTaskName} style={styles.input} mode="outlined" />
            <TextInput label="Short Description" value={taskDescription} onChangeText={setTaskDescription} style={styles.input} mode="outlined" />
            
            <Text style={styles.label}>Is this task urgent?</Text>
            <RadioButton.Group onValueChange={(value) => setIsUrgent(value === 'yes')} value={isUrgent ? 'yes' : 'no'}>
              <View style={styles.radioRow}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
                <RadioButton value="no" />
                <Text>No</Text>
              </View>
            </RadioButton.Group>

            <Text style={styles.label}>Due Date:</Text>
          
              <DateTimePicker
                value={dueDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDueDate(selectedDate);
                }}
              />
            

            <Button mode="contained" onPress={handleSubmit} style={styles.saveButton}>
              {existingTask ? '💾 Save Changes' : '➕ Add Task'}
            </Button>
          </Card.Content>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD', justifyContent: 'center' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
  input: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  dateButton: { marginBottom: 15, borderColor: '#1E90FF', borderWidth: 1 },
  saveButton: { backgroundColor: '#1E90FF', marginTop: 10 },
});
