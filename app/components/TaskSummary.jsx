import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useTasks } from '../TaskContext';

export default function TaskSummary() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(task => task.done).length;
  const pendingTasks = tasks.length - completedTasks;
  const upcomingTasks = tasks
    .filter(task => !task.done && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 2);

  return (
    <View>
      <Text style={styles.taskSummary}>You have a total of {tasks.length} tasks:</Text>

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

      <Text style={styles.taskSummary}>Upcoming Tasks:</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  taskSummary: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  card: { flex: 1, padding: 10, borderRadius: 10, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' },
  completedCard: { backgroundColor: '#DFFFD6' },
  pendingCard: { backgroundColor: '#FFD6D6' },
  upcomingTaskBox: { backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 15 },
  taskItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  taskText: { fontSize: 16 },
  dueDateText: { color: 'gray', fontSize: 14 },
  noTasksText: { fontSize: 16, textAlign: 'center', color: 'gray' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  countText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
});
