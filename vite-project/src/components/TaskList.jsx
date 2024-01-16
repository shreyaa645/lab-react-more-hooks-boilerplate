import { useRef, useReducer, useEffect } from 'react';
import './TaskList.css';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.payload, hidden: false }];
    case 'TOGGLE_TASK':
      return state.map((task) => (task.id === action.payload ? { ...task, hidden: !task.hidden } : task));
    default:
      return state;
  }
};

const TaskList = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tasks]);

  // Fix: Correct the argument name in handleAddTask function
  const handleAddTask = (payload) => {
    dispatch({ type: 'ADD_TASK', payload });
    // Fix: Clear the input value after adding a task
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleToggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
  };

  const handleBacktoTop = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container">
      <h2>Daily Task</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Task"
          ref={inputRef}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask(e.target.value)}
        />
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.hidden ? 'line-through' : 'none' }}>
              {task.hidden ? 'task is hidden' : task.text}
            </span>
            <button type="button" onClick={() => handleToggleTask(task.id)}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
      <button className="back-to-top-button" onClick={handleBacktoTop}>
        Back to Top
      </button>
    </div>
  );
};

export default TaskList;