import styles from './Adder.module.css';
import type { Day } from '@/lib/getOrderedDays';

export default function Adder({ day }: { day: Day }){

    return(
        <div className={styles.adder}>
            <div className={styles.inputs}>
                <fieldset>
                    <label htmlFor={`${day.iso}-title`}>Title:</label>
                    <input type="text" name="title" id={`${day.iso}-title`} placeholder="Appointment"/>
                </fieldset>
                <fieldset>
                    <label htmlFor={`${day.iso}-time`}>Time:</label>
                    <input type="time" id={`${day.iso}-time`}/>
                </fieldset>                
            </div>
            <div className={styles.plus}>
                <p>+</p>
            </div>
        </div>
    )
}