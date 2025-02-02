import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddEditScreen() {
  const [task, setTask] = useState('');

  const handleSaveTask = () => {
    alert(`Task "${task}" saved!`);
    setTask('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Save Task" onPress={handleSaveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
});
