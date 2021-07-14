import { useState, useRef } from "react";
import { nanoid } from "nanoid";

export default function Home() {
  //build initialState for todos
  const initialState = [
    {
      id: nanoid(),
      text: "Feed the cat",
      completed: false,
    },
    {
      id: nanoid(),
      text: "Do the laundry",
      completed: true,
    },
  ];

  const [todos, setTodos] = useState(initialState);
  let [savingCount, setSavingCount] = useState(0);
  let [newTodo, setNewTodo] = useState({ text: "", completed: false });

  const createTodo = (event) => {
    event.preventDefault();
    setSavingCount((savingCount) => ++savingCount);

    let id = nanoid();
    setTodos([
      ...todos,
      {
        ...newTodo,
        id,
      },
    ]);

    setNewTodo({ text: "", isDone: false });
    setSavingCount((savingCount) => --savingCount);
  };

  function handleChange(event) {
    setNewTodo({ ...newTodo, text: event.target.value });
  }

  function handleCheck(id) {
    const checkedTodo = todos.find((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[newTodos.indexOf(checkedTodo)] = {
      ...checkedTodo,
      completed: !checkedTodo.completed,
    };
    setTodos(newTodos);
  }
  function handleDelete(id) {
    const newTodos = [...todos];
    newTodos.splice(newTodos.indexOf(todos.find((todo) => todo.id === id)), 1);
    setTodos(newTodos);
  }

  console.log(todos);
  return (
    <div className="bg-gray-100 flex justify-center align-middle h-screen">
      <div className="bg-white rounded-md shadow-lg m-auto w-1/4 overflow-hidden">
        <div className="relative h-48 bg-yellow-500 rounded-t-4xl">
          <div className="text-blue-500 absolute top-0 right-0">
            {/* Saving indicator */}
            {savingCount > 0 && (
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
                data-testid="saving"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1z" />
              </svg>
            )}
          </div>

          <svg
            className="absolute bottom-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="p-6">
          <h3 className="text-yellow-800 font-bold text-xl">Todo List</h3>
          <form
            className="mt-4"
            onSubmit={createTodo}
            data-testid="new-todo-form"
          >
            <div className="relative">
              <input
                id="todo"
                name="todo"
                type="text"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="Buy milk"
                value={newTodo.text}
                onChange={handleChange}
              />
              <label
                htmlFor="todo"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Write something to do
              </label>
            </div>
          </form>

          <div className="pt-10">
            {todos.length > 0 ? (
              <ul className="">
                {todos.map((todo) => (
                  <>
                    <li
                      key={todo.id}
                      className={
                        "flex items-center " +
                        (todo.completed ? "line-through" : "")
                      }
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleCheck(todo.id)}
                        className="mr-2"
                      />
                      <span>{todo.text}</span>
                      <button
                        className="ml-3 text-yellow-500"
                        onClick={() => handleDelete(todo.id)}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  </>
                ))}
              </ul>
            ) : (
              <p
                className="text-lg text-center text-yellow-500"
                data-testid="no-todos"
              >
                Everything's done!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
