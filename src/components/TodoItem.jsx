import React from 'react';
import styles from '../styles/TodoItem.module.css';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;