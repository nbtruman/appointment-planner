export type AppointmentProps = { 
    id: number;
    date: string; 
    time: number;
    description: string; 
}

export default function Appointment ({ appointment }: { appointment: AppointmentProps }) {
    return (
        <div>
            <h3>{appointment.description}</h3>
            <p>{appointment.time}</p>
        </div>
    )
}