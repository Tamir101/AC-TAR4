import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'list') iconName = 'list';
          else if (route.name === 'details') iconName = 'information-circle';
          else if (route.name === 'add-edit') iconName = 'create';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: '#BBDEFB', // תכלת בהיר
        tabBarStyle: {
          backgroundColor: '#1976D2', // כחול כהה
          height: 60, // גובה הסרגל התחתון
          alignItems: 'center', // ממרכז את התוכן של ה-Tab Bar
          justifyContent: 'center', // מבטיח שהאייקונים יהיו ממורכזים
          paddingBottom: 0, // מסיר רווחים מיותרים
        },
        tabBarIconStyle: {
          marginTop: 5, // אם צריך לדחוף את האייקון למרכז
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="list" options={{ title: 'List' }} />
      <Tabs.Screen name="details" options={{ title: 'Details' }} />
      <Tabs.Screen name="add-edit" options={{ title: 'Add/Edit' }} />
    </Tabs>
  );
}
