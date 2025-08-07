import type { Day } from "@/lib/getOrderedDays";
import type { Appointment } from "@/components/Appointment/Appointment";
import Link from "next/link";
import styles from "./DayDisplay.module.css";

export default function DayDisplay({ day, appointments }:  { day: Day , appointments: Array<Appointment> }) {
    
    const href = `/day_view/${day.dayString}`;
    return (
        <Link href={href}>
            <div className={styles["day-display"]}>
                <h2>{day.dayString}</h2>
                <h3>{day.day} {day.monthString} {day.year}</h3>
                <div>

                </div>
            </div>
        </Link>
    );
}