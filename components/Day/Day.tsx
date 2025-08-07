import type { Day } from "@/lib/getOrderedDays";
import Appointment, { AppointmentProps } from "@/components/Appointment/Appointment";
import Link from "next/link";
import styles from "./DayDisplay.module.css";

export default function Day({ day, appointments }:  { day: Day , appointments: Array<AppointmentProps> }) {
    
    const href = `/day_view/${day.dayString}`;
    return (
        <Link href={href}>
            <div className={styles["day-display"]}>
                <div className={styles["date-display"]}>
                    <h2>{day.dayString}</h2>
                    <h3>{day.day} {day.monthString} {day.year}</h3>
                </div>
                <div>
                    {appointments && appointments.map(appointment => <Appointment key={appointment.id} appointment={appointment} />)}
                </div>
            </div>
        </Link>
    );
}