import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header"
import { Input } from "./components/Input"
import { Tasks } from "./components/Tasks";
import styles from './styles/home.module.css';
import Trofeu from './assets/trofeu.png';

import { GrClose } from "react-icons/gr";

  const LOCAL_STORAGE_KEY = "todo:savedTasks";

  export interface ITask {
    id: string;
    title: string;
    isCompleted: boolean;
  }

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const [isModal, setIsModal] = useState(false);

  useMemo(() => {
      if(completedTasks !== 0 && tasksQuantity === completedTasks) {
            setIsModal(true);  
            setTasks([]);
      }
  }, [isModal])

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
      },
    ]);
  }

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }


  return (
    <>
     <Header/>

      <Input onAddTask={addTask}/>
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />

      {isModal === true && 
        (<div className={styles.containerCompleteTasks} >
            <div className={styles.completeTasks}>
              <div className={styles.areaTextModal} >
                <header>
                  <button onClick={() => setIsModal(!isModal)}>
                    <GrClose />
                  </button>
                </header>
                <strong>PARABENS!</strong>
                <img src={Trofeu} alt="" />
                <span>
                  você completou todas as <br/>
                  suas tarefas!
                </span>
              </div>      
            </div>
          </div>
        )
      }
    </>
  )
}

export default App
