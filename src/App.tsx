import { v4 as uuidv4  } from 'uuid';
import { Header } from "./components/header/Header";
import { Task } from './components/task/Task';
import { useState } from 'react';
import { Input } from './components/input/Input';

import clipboard from '/src/assets/clipboard.png'
import styles from './App.module.css'

interface ITask {
  id: string;
  content: string;
  isCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksCreatedCount, setTasksCreatedCount] = useState(0);
  const [tasksCompletedCount, setTasksCompletedCount] = useState(0);

  function deleteTask(taskId: string) {
    const tasksWithoutTaskDeleted = tasks.filter(t => t.id !== taskId)

    setTasks(tasksWithoutTaskDeleted)
    setTasksCreatedCount(tasksWithoutTaskDeleted.length);

    setTasksCompletedCount(
      tasksWithoutTaskDeleted.reduce((acc, task) => {
        if (task.isCompleted) { return acc + 1; }
        return acc;
      }, 0)
    )
  }

  function toggleCompleteStatusTask(taskId: string) {
    const newTasks = tasks;
    const taskIndex = newTasks.findIndex(t => t.id === taskId);
    const toggledTask = newTasks[taskIndex]

    newTasks[taskIndex] = {
      ...toggledTask,
      isCompleted: !toggledTask.isCompleted,
    }

    setTasks(newTasks);

    setTasksCompletedCount(
      tasks.reduce((acc, task) => {
        if (task.isCompleted) { return acc + 1; }
        return acc;
      }, 0)
    )
  }

  function newTask(task: string) {
    setTasks([...tasks, {
      id: uuidv4(),
      content: task,
      isCompleted: false,
    }]);

    setTasksCreatedCount((state) => state + 1);
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Input onNewTask={newTask} />

        <main>
          <div className={styles.taskCountContent}>
            <div className={styles.taskCount}>
              <strong>Tarefas criadas</strong>
              <span>{tasksCreatedCount}</span>
            </div>

            <div className={styles.taskCount}>
              <strong>Concluídas</strong>
              <span>{`${tasksCompletedCount} de ${tasksCreatedCount}`}</span>
            </div>
          </div>

          { tasks.length == 0 &&
            <div className={styles.taskEmptyContent}>
              <img src={clipboard} alt="Prancheta conteúdo vazio" />
              <div className={styles.taskEmptyContentText}>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            </div>
          }

          { tasks.length > 0 &&
            tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  content={task.content}
                  isCompleted={task.isCompleted}
                  onDeleteTask={deleteTask}
                  onToggleCompleteTask={toggleCompleteStatusTask}
                />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}
