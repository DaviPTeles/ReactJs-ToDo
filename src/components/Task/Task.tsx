import styles from './task.module.css'
import {Trash} from 'phosphor-react'

interface taskDto{
    id: string;
    title: string;
    isCompleted: (id: string) => void;
    isDeleted: (id: string) => void;
    checked: boolean;
}
export default function Task ({id, title, isCompleted, isDeleted, checked}: taskDto){
    return(
        <div className={styles.task}>
            <div key={id}>
                <input type="checkbox" name="task" id="task" onChange={() => isCompleted(id)} checked={checked}/>
                <label htmlFor="task">{title}</label>
            </div>
            <button type="button" onClick={() => isDeleted(id)}>
                <Trash size={24}/>
            </button>
        </div>
    )
}