import React, { useState, useEffect } from "react";
import axios from "axios";

import { AiFillDelete } from "react-icons/ai";

import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users/1/todos"
        );
        console.log(response);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="input-con">
        <div>
          <input
            className="input-v"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
          />
          <button className="btn" onClick={addTodo}>
            Add
          </button>
        </div>
        <img
          className="img"
          alt="logo"
          src="https://res.cloudinary.com/dcr2fwzyk/image/upload/v1697532044/notes-7353278_1280_ovvefe.png"
        />
      </div>
      <div className="main">
        <div>
          <ul className="item">
            {todos.map((todo) => (
              <li className="items" key={todo.id}>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                <div>
                  <button
                    className="btn-cmplt"
                    onClick={() => toggleComplete(todo.id)}
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    className="del-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
