import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      if (editingId !== null) {
        setTodos(
          todos.map((todo) =>
            todo.id === editingId ? { ...todo, text: inputValue } : todo
          )
        );
        setEditingId(null);
      } else {
        setTodos([
          ...todos,
          { id: Date.now(), text: inputValue, completed: false },
        ]);
      }
      setInputValue("");
    }
  };
  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInputValue(todoToEdit.text);
    setEditingId(id);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-center text-2xl font-bold mb-4">Todo App</h1>
        <div className="flex mb-4">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                className="flex-grow mr-2 p-2 border rounded"
                placeholder="Add a new todo"
            />
            <button
                onClick={handleAddTodo}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                {editingId !== null ? "Update" : "Add"}
            </button>
        </div>
        <ul className="list-none p-0">
            {todos.map((todo) => (
                <li key={todo.id} className="flex items-center bg-gray-100 p-2 rounded mb-2">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleTodo(todo.id)}
                        className="mr-2"
                    />
                    <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.text}
                    </span>
                    <button
                        onClick={() => handleEditTodo(todo.id)}
                        className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleRemoveTodo(todo.id)}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    </div>
);
}

export default App;