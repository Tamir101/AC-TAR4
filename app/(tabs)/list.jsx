import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTasks } from '../comps/TaskContext'; // ✅ שימוש ב-TaskContext

export default function TaskListScreen() {
  const router = useRouter();
  const { tasks } = useTasks(); // ✅ קבלת המשימות מה-Context

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
           <TouchableOpacity onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}>
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

  sortButtons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  button: {backgroundColor: '#1E90FF', color: 'white'},

  card: { backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius: 10 },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
 
  taskHeader: { flexDirection: 'row', alignItems: 'center', },
  taskTitle: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  taskInfo: { flexDirection: 'row', justifyContent: 'space-between', },

  urgentChip: { backgroundColor: '#FFCDD2', color: 'red' },
  dueDateText: { color: 'gray', fontSize: 14 },
});
