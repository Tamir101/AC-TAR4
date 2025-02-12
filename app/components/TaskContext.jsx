import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

// **רשימה התחלתית של 10 משימות**
const initialTasks = [
  { id: 1, title: "Buy groceries", description: "Milk, Bread, Eggs", urgent: false, dueDate: new Date().toISOString(), done: false },
  { id: 2, title: "Finish project", description: "Complete React Native app", urgent: true, dueDate: new Date().toISOString(), done: false },
  { id: 3, title: "Call mom", description: "Check in and say hi", urgent: false, dueDate: new Date().toISOString(), done: true },
  { id: 4, title: "Workout", description: "Go for a 30-minute run", urgent: false, dueDate: new Date().toISOString(), done: false },
  { id: 5, title: "Study for exam", description: "Review business analytics notes", urgent: true, dueDate: new Date().toISOString(), done: false },
  { id: 6, title: "Doctor appointment", description: "Check-up at 5 PM", urgent: false, dueDate: new Date().toISOString(), done: false },
  { id: 7, title: "Read a book", description: "Finish reading 'Atomic Habits'", urgent: false, dueDate: new Date().toISOString(), done: true },
  { id: 8, title: "Fix the bike", description: "Repair the brakes and check tires", urgent: false, dueDate: new Date().toISOString(), done: false },
  { id: 9, title: "Prepare presentation", description: "Slides for the team meeting", urgent: true, dueDate: new Date().toISOString(), done: false },
  { id: 10, title: "Organize desk", description: "Clean up workspace and organize papers", urgent: false, dueDate: new Date().toISOString(), done: true },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

export default TaskContext;
