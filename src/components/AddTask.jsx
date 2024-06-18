/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export const AddTask = ({ taskList, setTaskList, task, setTask, updateTask }) => {
  const { user } = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.id) {
      const date = new Date();
      const updatedTaskList = taskList.map((todo) => {
        if (todo.id === task.id) {
          return {
            ...todo,
            username: user.username,
            name: task.name,
            time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
          };
        }
        return todo;
      });
      updateTask(updatedTaskList)
    } else {
      const date = new Date();
      const newTask = {
        id: date.getTime(),
        username: user.username,
        name: e.target.task.value,
        time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
      };
      setTaskList(newTask);
      setTask({});
    }
  };

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={task.name || ""}
          autoComplete="off"
          placeholder="Add task"
          maxLength="25"
          onChange={e => setTask({ ...task, name: e.target.value })}
        />
        <button type="submit">{task.id ? "Update" : "Add"}</button>
      </form>
    </section>
  );
};

export default AddTask;
