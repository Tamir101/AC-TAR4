import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTasks } from '../comps/TaskContext'; // ✅ שימוש ב-TaskContext

export default function index() {
  const router = useRouter();
  const { tasks } = useTasks(); // ✅ קבלת המשימות מה-Context

  const completedTasks = tasks.filter(task => task.done).length;
  const pendingTasks = tasks.length - completedTasks;
  const upcomingTasks = tasks
    .filter(task => !task.done && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>WELCOME</Text>

      {/* Motivational Message */}
      <Text style={styles.motivation}>Take control of your tasks with ease!</Text>

      {/* Task Summary */}
      <Text style={styles.taskSummary}>You have a total of {tasks.length} tasks:</Text>

      {/* Completed & Pending Task Cards */}
      <View style={styles.row}>
        <Card style={[styles.card, styles.completedCard]}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Completed</Text>
            <Text style={styles.countText}>{completedTasks}</Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.pendingCard]}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Pending</Text>
            <Text style={styles.countText}>{pendingTasks}</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Upcoming Tasks Title */}
      <Text style={styles.taskSummary}>Upcoming Tasks:</Text>

      {/* Task Box - Shows upcoming tasks or a message if none exist */}
      <Card style={styles.upcomingTaskBox}>
        <Card.Content>
          {upcomingTasks.length > 0 ? (
            <FlatList
              data={upcomingTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.taskItem}>
                  <Text style={styles.taskText}>{item.title}</Text>
                  <Text style={styles.dueDateText}>Due: {new Date(item.dueDate).toDateString()}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noTasksText}>No tasks need to be completed soon</Text>
          )}
        </Card.Content>
      </Card>

      {/* Add New Task Button */}
      <Button
        mode="contained"
        onPress={() => router.push('/addEdit')}
        style={styles.addButton}
      >
        Add New Task
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
 
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD' },
  header:{fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginTop: 10, color: '#0D47A1'},
  motivation: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 30, color: '#0D47A1' },
  taskSummary: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  card: { flex: 1, padding: 10, borderRadius: 10, marginHorizontal: 5, alignItems: 'center', 
          justifyContent: 'center',flexDirection: 'column',},
  completedCard: { backgroundColor: '#DFFFD6', marginBottom: 20 },
  pendingCard: { backgroundColor: '#FFD6D6', marginBottom: 20},
  countText: { fontSize: 22, fontWeight: 'bold' },
  upcomingTaskBox: { backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 15 },
  taskItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  taskText: { fontSize: 16 },
  dueDateText: { color: 'gray', fontSize: 14 },
  noTasksText: { fontSize: 16, textAlign: 'center', color: 'gray' },
  addButton: { backgroundColor: '#1E90FF', marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  countText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
});


