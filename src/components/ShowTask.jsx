/* eslint-disable react/prop-types */
export const ShowTask = ({
  taskList,
  setTaskList,
  setTask,
  handleDeleteTask,
}) => {
  const handleEdit = (id) => {
    const selectedTask = taskList.find((todo) => todo.id === id);
    setTask(selectedTask);
  };

  const handleDelete = (id) => {
    handleDeleteTask(id);
  };

  return (
    <section className="showTask">
      <div className="head">
        <div>
          <span className="title">Todo</span>
          <span className="count">{taskList.length}</span>
        </div>
        <button onClick={() => setTaskList(taskList)} className="clearAll">
          Clear All
        </button>
      </div>
      <ul>
        {taskList.map((todo) => (
          <li key={todo.id}>
            <p>
              <span className="name">{todo.name}</span>
              <span className="time">{todo.time}</span>
            </p>
            <i
              className="bi bi-pencil-square"
              onClick={() => handleEdit(todo.id)}
            >

            </i>
            <i onClick={() => handleDelete(todo.id)} className="bi bi-trash">
              
            </i>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShowTask;
