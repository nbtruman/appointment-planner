import styles from './Appointment.module.css';
import { Temporal } from '@js-temporal/polyfill';

export type AppointmentProps = { 
    id: string;
    dateTime: string;
    description: string;
}

export default function Appointment ({ appointment }: { appointment: AppointmentProps }) {
    const { id, dateTime, description } = appointment;
    return (
        <div className={styles.appointment}>
            <h3>{description}</h3>
            <p>{dateTime.slice(-5)}</p>
        </div>
    )
}