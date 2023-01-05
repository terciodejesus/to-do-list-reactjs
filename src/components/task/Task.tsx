import { Trash } from 'phosphor-react'
import { Checkbox } from '../checkbox/Checkbox'

import styles from './Task.module.css'

interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onDeleteTask: (taskId: string) => void;
  onToggleCompleteTask: (taskId: string) => void;
}

export function Task({ id, content, isCompleted, onDeleteTask, onToggleCompleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCheckboxClick() {
    onToggleCompleteTask(id);
  }

  return (
    <div className={styles.task}>
      <div>
        <Checkbox
          content={content}
          isCompleted={isCompleted}
          onCheckboxClick={handleCheckboxClick}
        />
      </div>
      <button
        onClick={handleDeleteTask}
        title="Apagar tarefa"
      >
        <Trash size={20} />
      </button>
    </div>
  )
}
