import { useEffect, useState } from 'react';
import { ITask } from '../../App';
import clipboard from '../../assets/clipboard.svg';
import { Task } from '../Task';
import styles from './styles.module.css';

interface Props {
    tasks: ITask[];
    onComplete: (taskId: string) => void;
    onDelete: (taskId: string) => void;
  }

export function Tasks({ tasks, onComplete, onDelete }: Props) {
    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter((task) => task.isCompleted).length;

    return (
        <div className={styles.container}>
                <div className={styles.counterTasksAera}>
                    <p>Tarefas criadas <span>{tasksQuantity}</span></p>
                    <p>Concluídas <span>{completedTasks} de {tasksQuantity}</span></p>
                </div>

                    <div className={styles.list}>
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onComplete={onComplete}
                            onDelete={onDelete}
                        />
                        ))}
                    </div>

                { tasks.length <= 0 && (
                    <div className={styles.AreaTasksNotFound}>
                        <div className={styles.Areaanimation} >
                            <img src={clipboard} alt="" />
                            <div>
                                <p>Você ainda não tem tarefas cadastradas</p>
                                Crie tarefas e organize seus itens a fazer
                            </div>
                        </div>
                    </div>
                )} 
            </div>
    )
}