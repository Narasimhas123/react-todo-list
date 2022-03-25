import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, settodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedtodo = JSON.parse(temp);
    if (loadedtodo) {
      settodos(loadedtodo);
    }
  }, []);
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  function handelSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      complete: false
    };
    settodos([...todos].concat(newTodo));
    setTodo("");
  }
  function deleteTodo(id) {
    const updatedTodo = [...todos].filter((todo) => todo.id !== id);
    settodos(updatedTodo);
  }
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    settodos(updatedTodos);
  }
  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    settodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <input type="submit" value="submit" />
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todoEditing == todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div>{todo.text}</div>
          )}

          <button onClick={() => deleteTodo(todo.id)}>delete</button>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.complete}
          />
          {todoEditing === todo.id ? (
            <button onClick={() => editTodo(todo.id)}>save</button>
          ) : (
            <button onClick={() => setTodoEditing(todo.id)}>edit</button>
          )}
          {/* <button onClick={()=>editTodo(todo.id)}>save</button> */}
        </div>
      ))}
    </div>
  );
}
