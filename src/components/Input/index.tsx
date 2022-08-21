import styles from './styles.module.css';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
    onAddTask: (taskTitle: string) => void;
  }

export function Input({ onAddTask }: Props) {
    const [title, setTitle] = useState("");

    function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onAddTask(title);
    setTitle("");
    }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);  
  }

    return (
        <div className={styles.container}>
            <div className={styles.containerForm} onSubmit={handleSubmit}>
                <form className={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Adicione uma nova tarefa" 
                        value={title}
                        onChange={onChangeTitle}
                        required
                    />
                    <button >
                        Criar
                        <AiOutlinePlusCircle size={20} />
                    </button>
                </form>
            </div>
            
        </div>
    )
}