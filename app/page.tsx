import { getOrderedDays } from "@/lib/getOrderedDays";
import type { AppointmentProps } from "@/components/Appointment/Appointment";
import Day from "@/components/Day/Day";
import styles from "./page.module.css";

export default function Home() {
  const days = getOrderedDays();
  const appointments: Array<AppointmentProps> = [
    // Example appointments, replace with actual data fetching logic
    { id: 1, date: '2025-08-07', time: 1000, description: "Doctor's appointment" },
    { id: 2, date: '2025-08-10', time: 1400, description: "Meeting with client" },
  ]
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {days.map((day, index) => {
          const daysAppointments = appointments.filter(appointment => appointment.date === day.iso);
          
          return <Day key={index} day={day} appointments={daysAppointments} />
        })}
      </main>      
    </div>
  );
}
