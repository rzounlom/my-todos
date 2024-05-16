import "./Todo.css";

const Todo = ({ todo, removeTodo, toggleTodo }) => {
  // destructuring id, name, completed, confidence, removeTodo, and toggleTodo from props
  const { id, name, completed, confidence } = todo;
  return (
    <li>
      {/* Checkbox to mark a todo as completed */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id, completed)}
      />
      {/* Display the todo name and confidence level */}
      <span
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {name} (Confidence: {confidence})
      </span>
      {/* Button to remove a todo */}
      <button onClick={() => removeTodo(id)}>Remove</button>
    </li>
  );
};

export default Todo;
