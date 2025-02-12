import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTasks } from './TaskContext';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList() {
  const router = useRouter();
  const { tasks, setTasks } = useTasks();

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  return (
    <FlatList
      data={tasks.slice().reverse()}  
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={[styles.card, item.done ? styles.doneCard : styles.pendingCard]}>
          <Card.Content>
            <View style={styles.taskHeader}>
              <TouchableOpacity style={styles.taskRow} onPress={() => router.push(`/Details?id=${item.id}`)}>
                <Text style={styles.taskTitle} numberOfLines={2}>{item.title}</Text>
                <IconButton icon="eye" iconColor="#1E88E5" size={20} />
              </TouchableOpacity>
              <IconButton
                icon={item.done ? 'check-circle' : 'close-circle'}
                iconColor={item.done ? '#4CAF50' : '#D32F2F'}
                size={28}
                onPress={() => toggleTaskStatus(item.id)}
                style={[styles.statusButton, item.done ? styles.doneButton : styles.pendingButton]}
              />
            </View>

            <View style={styles.taskFooter}>
              <View style={styles.taskMeta}>
                <Ionicons name="calendar-outline" size={16} color="#616161" />
                <Text style={styles.dueDateText}>{new Date(item.dueDate).toDateString()}</Text>
              </View>
              <Chip style={item.urgent ? styles.urgentChip : styles.notUrgentChip}>
                {item.urgent ? 'Urgent' : 'Not Urgent'}
              </Chip>
            </View>
          </Card.Content>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', margin: 10, padding: 15, borderRadius: 12, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
    doneCard: { borderLeftWidth: 6, borderLeftColor: '#4CAF50' }, 
    pendingCard: { borderLeftWidth: 6, borderLeftColor: '#D32F2F' }, 
    taskHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    taskRow: { flexDirection: 'row', alignItems: 'center', gap: 0, flex: 1, flexWrap: 'wrap', overflow: 'hidden' },
    taskTitle: { fontSize: 18, fontWeight: 'bold', color: '#212121', flexShrink: 1 },
    taskFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    taskMeta: { flexDirection: 'row', alignItems: 'center' },
    dueDateText: { fontSize: 14, color: '#616161', marginLeft: 5, marginRight: 5 },
    statusButton: { borderRadius: 20, padding: 5, alignSelf: 'flex-start' },
    doneButton: { backgroundColor: '#E8F5E9' },
    pendingButton: { backgroundColor: '#FFEBEE' },
    urgentChip: { backgroundColor: '#FFCDD2', color: 'red', marginTop: 2 },
    notUrgentChip: { backgroundColor: '#C8E6C9', color: 'green', marginTop: 2 },
  });
  