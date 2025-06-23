import React, { useState } from 'react';
import TodoItem from '../components/TodoItem';
import styles from '../styles/App.module.css';

const Home = ({ todos, addTodo, toggleTodo, deleteTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo, 'General');
      setNewTodo('');
    }
  };

  return (
    <div className={styles.page}>
      <h1>My Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>
      <div className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default Home;