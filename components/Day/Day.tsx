import type { Day } from "@/lib/getOrderedDays";
import Appointment, { AppointmentProps } from "@/components/Appointment/Appointment";
import Link from "next/link";
import styles from "./Day.module.css";

export default function Day({ day, appointments }:  { day: Day , appointments: Array<AppointmentProps> }) {
    
    const href = `/day_view/${day.dayString}`;
    return (
        <div className={styles["day-display"]}>
            <Link href={href}>
                <div className={styles["date-display"]}>
                    <h2>{day.dayString}</h2>
                    <h3>{day.day} {day.monthString} {day.year}</h3>
                </div>
            </Link>
            <div>
                {appointments && appointments.map(appointment => <Appointment key={appointment.id} appointment={appointment} />)}
            </div>
        </div>
    );
}