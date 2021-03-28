import { useState } from "react";
const TaskForm = (props) => {
  const [taskTextValue, setTaskText] = useState("");
  const handleChange = (event) => {
    setTaskText(event.target.value);
  };

  const createTask = async (event) => {
    console.log("clicked new task add");
    event.preventDefault();
    const response = await fetch("/projects/newTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: props.projectId,
        taskText: taskTextValue,
        taskState: "todo",
      }),
    });
    if (response) {
      setTaskText("");
      props.newTaskAdded();
    }
  };

  return (
    <div className="card p-1 border-dark">
      <form onSubmit={createTask}>
        <div className="mb-3">
          <label htmlFor="taskText" className="form-label">
            New Task
          </label>
          <textarea
            className="form-control"
            id="taskText"
            name="taskText"
            rows="3"
            value={taskTextValue}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
