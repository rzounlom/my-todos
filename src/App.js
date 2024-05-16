import "./App.css";

import { useEffect, useState } from "react";

import TodoList from "./components/todo-list/TodoList";

// import { initialTodos } from "./data";

const BaseUrl = "https://64407795792fe886a88f6162.mockapi.io/api/todos";

function App() {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);
  // State to manage the input field for new todo names
  const [todoName, setTodoName] = useState("");
  // State to manage the confidence level for new todos
  const [confidence, setConfidence] = useState(5);

  const handleTodoNameChange = (e) => {
    setTodoName(e.target.value);
    // console.log({ todoName });
  };

  const handleConfidenceNameChange = (e) => {
    setConfidence(e.target.value);
    console.log({ todoName });
  };

  const getTodos = async () => {
    //async function to fetch the todos from the API
    const response = await fetch(`${BaseUrl}`); //fetching the todos from the API
    const fetchedTodos = await response.json(); //converting the response to JSON
    setTodos(fetchedTodos); //updating the todos state with the fetched todos
  };

  // Function to add a new todo
  const addTodo = async () => {
    if (todoName) {
      //checking if the todoName is not empty
      const newTodo = {
        name: todoName,
        completed: false,
        confidence: parseInt(confidence, 10),
      };

      try {
        await fetch(`${BaseUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        });

        // getTodos();
      } catch (error) {
        console.log(error.message);
      }

      setTodoName(""); // Reset the input field for new todo names
      setConfidence(5); // Reset the confidence level to default
    }
  };

  // Function to toggle the 'completed' state of a todo
  const toggleTodo = async (id, completed) => {
    try {
      await fetch(`${BaseUrl}/${id}`, {
        //sending a DELETE request
        method: "PUT", //specifying the method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });

      getTodos(); //fetching the updated list of todos
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to remove a todo by id
  const removeTodo = async (id) => {
    try {
      await fetch(`${BaseUrl}/${id}`, {
        //sending a DELETE request
        method: "DELETE", //specifying the method
      });

      getTodos(); //fetching the updated list of todos
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos(); //calling the getTodos function when the component mounts
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <div className="todo-header">
        {/* Input field for new todo names */}
        <input
          className="add-todo"
          type="text"
          placeholder="Add a new todo..."
          value={todoName}
          onChange={handleTodoNameChange}
          style={{ flexGrow: 1, marginRight: "10px" }}
        />
        {/* Input field for confidence level */}
        <input
          className="todo-confidence"
          type="number"
          min="1"
          max="5"
          value={confidence}
          onChange={handleConfidenceNameChange}
        />
        <button onClick={addTodo}>Submit</button>
      </div>

      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </div>
  );
}

export default App;
