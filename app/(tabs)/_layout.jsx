import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TaskProvider } from '../components/TaskContext';
import { PaperProvider } from 'react-native-paper';

const getTabBarIcon = (routeName, color, size) => {
  const icons = {
    index: 'home',
    List: 'list',
    Details: 'information-circle',
    AddTask: 'create',
  };
  return <Ionicons name={icons[routeName]} size={size} color={color} />;
};

export default function Layout() {
  return (
    <PaperProvider>
      <TaskProvider>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#BBDEFB',
            tabBarStyle: {
              backgroundColor: '#1976D2',
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 0,
            },
          })}
        >
          <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />
          <Tabs.Screen name="List" options={{ title: 'List', headerShown: false }} />
          <Tabs.Screen name="Details" options={{ title: 'Details', headerShown: false }} />
          <Tabs.Screen name="AddTask" options={{ title: 'Add Task', headerShown: false }} />
        </Tabs>
      </TaskProvider>
    </PaperProvider>
  );
}
