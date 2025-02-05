import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TaskProvider } from '../comps/TaskContext'; // ✅ חיבור ה-Context


export default function Layout() {
  return (
    <TaskProvider>
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'list') iconName = 'list';
          else if (route.name === 'details') iconName = 'information-circle';
          else if (route.name === 'addEdit') iconName = 'create';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#BBDEFB',
        tabBarStyle: {
          backgroundColor: '#1976D2',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
        },
        headerShown: false, // ❌ הסתרת הכותרת מכל המסכים
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="list" options={{ title: 'List' }} />
      <Tabs.Screen name="details" options={{ title: 'Details' }} />
      <Tabs.Screen name="addEdit" options={{ title: 'Add/Edit' }} />
    </Tabs>
    </TaskProvider>
  );
}
