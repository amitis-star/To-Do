import { useState } from "react";
import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/todos";

const Home = () => {
  const [newGoal, setNewGoal] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async () => {
    const title = newGoal.trim();
    if (!title) return;
    const tempId = Date.now();
    const newTodo = { id: tempId, title, completed: false, userId: 1 };

    setTodos((prev) => [...prev, newTodo]);
    setNewGoal("");
  };

  const toggleComplete = (id) => {
    todos.find((item) => item.id === id);

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    try {
      await axios.delete(`${API}/${id}`);
    } catch {
      alert("failed to delete");
    }
  };

  const handleAction = (todo) => {
    todo.completed ? deleteTodo(todo.id) : toggleComplete(todo.id);
  };

  return (
    <div className="container w-70">
      <div className=" flex flex-col items-center pt-10 px-4">
        <div className="flex gap-2 mb-6 w-full">
          <input
            className="flex-1 border border-gray-300 rounded px-4 py-2"
            type="text"
            placeholder="Write new goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <div className="w-full space-y-3">
          {todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className={`flex items-center justify-between px-4 py-2 rounded shadow ${
                  todo.completed ? "bg-green-100" : "bg-white"
                }`}
              >
                <div className="flex">
                  <span
                    className={`block ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <button
                  className="ml-4 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  onClick={() => handleAction(todo)}
                >
                  {todo.completed ? "Delete" : "check"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
