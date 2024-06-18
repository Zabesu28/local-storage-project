import { getAllTasks, useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import { AuthContext } from "./AuthContext";
import { ShowTask } from "./components/ShowTask";
import { addTask, updateTask, deleteTask } from "./db";

function App() {
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = sessionStorage.getItem('taskList');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState({});
  const [isRegister, setIsRegister] = useState(false);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasks();
      setTaskList(tasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      await Promise.all(taskList.map(task => updateTask(task)));
    }
    saveTasks();
  }, [taskList]);

  const handleAddTask = async (newTask) => {
    try {
      const id = await addTask(newTask);
      setTaskList([...taskList, { ...newTask, id }]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche :', error);
    }
  };
  
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      const updatedTasklist = taskList.filter(task => task.id !== id);
      setTaskList(updatedTasklist);
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };
  
  const handleUpdateTask = async (taskToUpdate) => {
    try {
      await Promise.all(taskToUpdate.map(task => updateTask(task)));
      setTaskList(taskToUpdate);
      setTask({}); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour des tâches :', error);
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  }

  return (
    <>
    {user ? (
      <div className="App">
      <Header />
      <AddTask
        taskList={taskList}
        setTaskList={handleAddTask}
        task={task}
        setTask={setTask}
        updateTask={handleUpdateTask}
      />
      <ShowTask
        taskList={taskList}
        setTaskList={setTaskList}
        task={task}
        setTask={setTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
    ) : (
      <div className="App">
        <Header />
        {isRegister ? <Register toggleForm={toggleForm} /> : <Login toggleForm={toggleForm} />}
      </div>
    )}
    </>
)
}

export default App;
