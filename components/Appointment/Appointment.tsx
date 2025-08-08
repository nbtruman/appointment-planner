import styles from './Appointment.module.css';
import { Temporal } from '@js-temporal/polyfill';

export type AppointmentProps = { 
    id: number;
    date: string; 
    time: Temporal.PlainTime;
    description: string; 
}

export default function Appointment ({ appointment }: { appointment: AppointmentProps }) {
    const { id, date, time, description } = appointment;
    return (
        <div className={styles.appointment}>
            <h3>{appointment.description}</h3>
            <p>{time.toString().slice(0, 5)}</p>
        </div>
    )
}