import styles from './Appointment.module.css';

export type AppointmentProps = { 
    id: number;
    date: string; 
    time: number;
    description: string; 
}

export default function Appointment ({ appointment }: { appointment: AppointmentProps }) {
    return (
        <div className={styles.appointment}>
            <h3>{appointment.description}</h3>
            <p>{appointment.time}</p>
        </div>
    )
}