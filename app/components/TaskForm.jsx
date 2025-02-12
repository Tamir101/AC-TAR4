import { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Card, RadioButton, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskForm({ existingTask, onSave }) {
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
  }, [existingTask?.id]);

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

    onSave({
      id: existingTask ? existingTask.id : Date.now().toString(),
      title: taskName,
      description: taskDescription,
      urgent: isUrgent,
      dueDate: dueDate.toISOString(),
      status: existingTask ? existingTask.status : 'in-progress',
      done: existingTask ? existingTask.done : false,
    });

    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput label="Task Name" value={taskName} onChangeText={setTaskName} style={styles.input} mode="outlined" />
          <TextInput label="Short Description" value={taskDescription} onChangeText={setTaskDescription} style={styles.input} mode="outlined" />
          
          <Text style={styles.radioTitle}>Is this task urgent?</Text>
          <View style={styles.radioRow}>
            <RadioButton value="yes" status={isUrgent ? 'checked' : 'unchecked'} onPress={() => setIsUrgent(true)} />
            <Text>Yes</Text>
            <RadioButton value="no" status={!isUrgent ? 'checked' : 'unchecked'} onPress={() => setIsUrgent(false)} />
            <Text>No</Text>
          </View>

          <Text style={styles.radioTitle}>Due Date:</Text>
          <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            📅 {dueDate.toDateString()}
          </Button>
          
          {showDatePicker && Platform.OS === 'ios' && (
            <DateTimePicker value={dueDate} mode="date" display="default" onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDueDate(selectedDate);
            }} />
          )}

          <Button mode="contained" onPress={handleSubmit} style={styles.saveButton}>
            {existingTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
  input: { marginBottom: 15 },
  radioTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  dateButton: { marginBottom: 15, borderColor: '#1E90FF', borderWidth: 1 },
  saveButton: { backgroundColor: '#1E90FF', marginTop: 10 },
});