import styles from './Appointment.module.css';
import deleteAppointment from '@/lib/deleteAppointment';

export type AppointmentProps = { 
    id: string;
    dateTime: string;
    description: string;    
}

export default function Appointment ({ appointment, removeAppointment }: { appointment: AppointmentProps, removeAppointment: (id: string) => void }) {
    const { id, dateTime, description } = appointment;

    const handleRemove = async () => {
        const response = await deleteAppointment(id);
        console.log(response);
        removeAppointment(id);
    }

    return (
        <div className={styles.container}>
            <div className={styles.appointment}>
                <h3>{description}</h3>
                <p>{dateTime.slice(-5)}</p>
            </div>
            <div className={styles.remove} onClick={handleRemove}>
                -
            </div>
        </div>
    )
}