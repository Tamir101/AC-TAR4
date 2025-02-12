import { useState } from 'react';
import { View, StyleSheet, Alert, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, Card, IconButton, Button, RadioButton, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../TaskContext';

export default function details() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { tasks, setTasks } = useTasks();
  const task = tasks.find((t) => t.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task?.title || '');
  const [taskDescription, setTaskDescription] = useState(task?.description || '');
  const [isUrgent, setIsUrgent] = useState(task?.urgent || false);
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate) : new Date());
  const [isCompleted, setIsCompleted] = useState(task?.done || false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTask}>Task not found</Text>
      </View>
    );
  }

  const handleSave = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === Number(id) ? { ...t, title: taskName, description: taskDescription, urgent: isUrgent, dueDate, done: isCompleted } : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title 
            title={isEditing ? 'Edit Task' : 'Task Details'}
            right={(props) => (
              <View style={styles.iconRow}>
                <IconButton {...props} icon="pencil" size={24} onPress={() => setIsEditing(!isEditing)} />
                <IconButton {...props} icon="delete" size={24} color="red" onPress={handleSave} />
              </View>
            )}
          />
          <Card.Content>
            {isEditing ? (
              <>
                <TextInput label="Task Name" value={taskName} onChangeText={setTaskName} style={styles.input} mode="outlined" />
                <TextInput label="Description" value={taskDescription} onChangeText={setTaskDescription} style={styles.input} mode="outlined" />
                <Text style={styles.label}>Is this task urgent?</Text>
                <RadioButton.Group onValueChange={(value) => setIsUrgent(value === 'yes')} value={isUrgent ? 'yes' : 'no'}>
                  <View style={styles.radioRow}>
                    <RadioButton value="yes" /><Text>Yes</Text>
                    <RadioButton value="no" /><Text>No</Text>
                  </View>
                </RadioButton.Group>
                <Text style={styles.label}>Due Date:</Text>
                <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                  📅 {dueDate.toDateString()}
                </Button>
                {showDatePicker && (
                  <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) setDueDate(selectedDate);
                    }}
                  />
                )}
                <Text style={styles.label}>Has this task been completed?</Text>
                <RadioButton.Group onValueChange={(value) => setIsCompleted(value === 'yes')} value={isCompleted ? 'yes' : 'no'}>
                  <View style={styles.radioRow}>
                    <RadioButton value="yes" /><Text>Yes</Text>
                    <RadioButton value="no" /><Text>No</Text>
                  </View>
                </RadioButton.Group>
                <Button mode="contained" onPress={handleSave} style={styles.saveButton}>Save Changes</Button>
              </>
            ) : (
              <>
                <Text style={styles.infoText}>Task Name: {taskName}</Text>
                <Text style={styles.infoText}>Description: {taskDescription}</Text>
                <Text style={styles.infoText}>Urgent: {isUrgent ? 'Yes' : 'No'}</Text>
                <Text style={styles.infoText}>Due Date: {dueDate.toDateString()}</Text>
                <Text style={styles.infoText}>Completed: {isCompleted ? 'Yes' : 'No'}</Text>
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
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
  input: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  dateButton: { marginBottom: 15, borderColor: '#1E90FF', borderWidth: 1 },
  saveButton: { backgroundColor: '#1E90FF', marginTop: 10 },
  noTask: { textAlign: 'center', fontSize: 18, color: 'red' },
  infoText: { fontSize: 16, marginBottom: 10 },
  iconRow: { flexDirection: 'row', justifyContent: 'flex-end' },
});
