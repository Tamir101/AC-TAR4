import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton, Chip, Button, Menu } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTasks } from '../comps/TaskContext'; // ✅ שימוש ב-TaskContext
import { useState } from 'react';

export default function list() {
  const router = useRouter();
  const { tasks, setTasks } = useTasks(); // ✅ קבלת המשימות מה-Context
  const [sortBy, setSortBy] = useState('date');
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'date') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === 'done') return a.done - b.done;
    if (sortBy === 'urgent') return b.urgent - a.urgent;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <View style={styles.sortMenuContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Button mode="contained" onPress={() => setMenuVisible(true)}>Sort Options</Button>}
        >
          <Menu.Item onPress={() => { setSortBy('date'); setMenuVisible(false); }} title="Sort by Date" />
          <Menu.Item onPress={() => { setSortBy('done'); setMenuVisible(false); }} title="Sort by Done" />
          <Menu.Item onPress={() => { setSortBy('urgent'); setMenuVisible(false); }} title="Sort by Urgency" />
        </Menu>
      </View>

      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <TouchableOpacity onPress={() => router.push(`/details?id=${item.id}`)}>
              <Card.Content>
                <View style={styles.taskHeader}>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <IconButton
                    icon={item.done ? 'check-circle' : 'close-circle'}
                    iconColor={item.done ? 'green' : 'red'}
                    size={24}
                    onPress={() => toggleTaskStatus(item.id)}
                  />
                </View>

                <View style={styles.taskInfo}>
                  <Text style={styles.dueDateText}>{new Date(item.dueDate).toDateString()}</Text>
                  {item.urgent && <Chip style={styles.urgentChip}>Urgent</Chip>}
                </View>
              </Card.Content>
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD' },
  header: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#0D47A1' },

  sortMenuContainer: { alignItems: 'center', marginBottom: 20 },

  card: { backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius: 10 },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
 
  taskHeader: { flexDirection: 'row', alignItems: 'center' },
  taskTitle: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  taskInfo: { flexDirection: 'row', justifyContent: 'space-between' },

  urgentChip: { backgroundColor: '#FFCDD2', color: 'red' },
  dueDateText: { color: 'gray', fontSize: 14 },
});
