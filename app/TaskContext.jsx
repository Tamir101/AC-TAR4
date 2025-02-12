import { createContext, useState, useContext } from 'react';

// יצירת ה-Context
const TaskContext = createContext();

// ספק (Provider) שמחזיק את כל המשימות
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

// פונקציה כדי לגשת למשימות מכל דף באפליקציה
export function useTasks() {
  return useContext(TaskContext);
}

export default TaskProvider; // ✅ הוספת export default כדי לפתור את השגיאה
