import { getOrderedDays } from "@/lib/getOrderedDays";
import type { AppointmentProps } from "@/components/Appointment/Appointment";
import { Temporal } from '@js-temporal/polyfill';
import Day from "@/components/Day/Day";
import styles from "./page.module.css";

export default function Home() {
  const days = getOrderedDays();
  const appointments: Array<AppointmentProps> = [
    // Example appointments, replace with actual data fetching logic
    { id: 1, date: '2025-08-12', time: Temporal.PlainTime.from('10:00'), description: "Doctor's appointment" },
    { id: 2, date: '2025-08-10', time: Temporal.PlainTime.from('14:00'), description: "Meeting with client" },
    { id: 3, date: '2025-08-10', time: Temporal.PlainTime.from('09:00'), description: "Dentist"},
  ]
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {days.map((day, index) => {
          const daysAppointments = appointments
            .filter(appointment => appointment.date === day.iso)
            .sort((a, b) => Temporal.PlainTime.compare(a.time, b.time));    
          return <Day key={index} day={day} appointments={daysAppointments} />
        })}
      </main>      
    </div>
  );
}
