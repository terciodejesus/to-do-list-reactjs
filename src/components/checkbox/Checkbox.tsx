import styles from './Checkbox.module.css';

interface CheckboxProps {
  content: string;
  isCompleted: boolean;
  onCheckboxClick: () => void;
}

export function Checkbox({ content, isCompleted, onCheckboxClick }: CheckboxProps ) {
  function handleCheckboxClick() {
    onCheckboxClick();
  }

  return (
    <div className={styles.checkboxWrapper}>
      <label>
        <div className={styles.checkboxContent}>
          <input
            type="checkbox"
            defaultChecked={isCompleted}
            onClick={handleCheckboxClick}
          />
        </div>
        <span className={isCompleted ? styles.checkboxTextCompleted : ''}>{ content }</span>
      </label>
    </div>
  )
}
