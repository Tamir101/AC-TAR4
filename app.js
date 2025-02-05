import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { Slot } from 'expo-router';

// הגדרת תמה עם צבעים כחולים
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E90FF',  // כחול עיקרי (DodgerBlue)
    accent: '#87CEEB',   // תכלת רך (SkyBlue)
    background: '#E3F2FD', // רקע כחול בהיר מאוד
    text: '#0D47A1',  // כחול כהה
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
