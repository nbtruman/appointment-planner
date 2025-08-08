import styles from './Appointment.module.css';
import { Temporal } from '@js-temporal/polyfill';

export type AppointmentProps = { 
    id: number;
    dateTime: Temporal.PlainDateTime;
    description: string;
}

export default function Appointment ({ appointment }: { appointment: AppointmentProps }) {
    const { id, dateTime, description } = appointment;
    // async function load(){
    //     const response = await fetch('http:/localhost:3000/api/appointments', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(appointment),
    //     });

    //     if (!response.ok) {
    //         console.log("the response was not ok");
    //     } else {
    //         console.log(response.json);
    //     }
    // }
    // load()
    return (
        <div className={styles.appointment}>
            <h3>{description}</h3>
            <p>{dateTime.toPlainTime().toString().slice(0, 5)}</p>
        </div>
    )
}