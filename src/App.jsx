import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const emojiMap = {
    bath: "🛁",
    shower: "🚿",
    eat: "🍔",
    food: "🍕",
    run: "🏃",
    work: "💼",
    study: "📚",
    sleep: "😴",
  };

  const addTask = () => {
    const text = input.trim();
    if (!text) return;

    const matchedEmoji =
      Object.keys(emojiMap).find((k) =>
        text.toLowerCase().includes(k.toLowerCase())
      ) || "";

    setTasks([
      ...tasks,
      { id: Date.now(), text, emoji: emojiMap[matchedEmoji] || "✨" },
    ]);

    triggerSparkles();
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id) => {
    const current = tasks.find((t) => t.id === id);
    const updated = prompt("Edit task:", current.text);
    if (updated && updated.trim()) {
      setTasks(
        tasks.map((t) =>
          t.id === id ? { ...t, text: updated.trim() } : t
        )
      );
    }
  };

  const triggerSparkles = () => {
    const container = document.querySelector(".todo-container");
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <>
      <div className="todo-container">
        <div className="header">
          <h2>🌸 To-Do App</h2>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <span className="emoji-bg">{task.emoji}</span>
              <span className="task-text">{task.text}</span>
              <div className="actions">
                <button onClick={() => editTask(task.id)}>✏️</button>
                <button onClick={() => deleteTask(task.id)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="quote">
        ✨ “Turn your plans into reality, plan task now.” ✨
      </p>
    </>
  );
}
