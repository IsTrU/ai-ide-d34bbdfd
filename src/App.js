import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Completed from './pages/Completed';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import styles from './styles/App.module.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping']);
  const [theme, setTheme] = useState('light');

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, category) => {
    const newTodo = { id: Date.now(), text, completed: false, category };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={`${styles.app} ${theme === 'dark' ? styles.dark : ''}`}>
      <Header />
      <main className={styles.main}>
        <Route path="/" exact>
          <Home todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </Route>
        <Route path="/categories">
          <Categories todos={todos} categories={categories} />
        </Route>
        <Route path="/completed">
          <Completed todos={todos} />
        </Route>
        <Route path="/settings">
          <Settings theme={theme} setTheme={setTheme} />
        </Route>
        <Route path="/statistics">
          <Statistics todos={todos} />
        </Route>
      </main>
    </div>
  );
}

export default App;