'use client'
import { getOrderedDays } from "@/lib/getOrderedDays";
import type { AppointmentProps } from "@/components/Appointment/Appointment";
import { Temporal } from '@js-temporal/polyfill';
import Day from "@/components/Day/Day";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import deleteAppointment from "@/lib/deleteAppointment";

export default function Home() {
  const days = getOrderedDays();

  const [user, setUser] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Array<AppointmentProps>>([])

  useEffect(() => {
    fetch('/api/getUser')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`api/appointments?user=${user}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch appointments')
        }
        return res.json()
      })
      .then(data => {
        const now = Temporal.Now.plainDateTimeISO();
        
        const futureAppointments = data.filter((appointment: AppointmentProps) => {
          const appointmentDate = Temporal.PlainDateTime.from(appointment.dateTime);

          if (Temporal.PlainDateTime.compare(appointmentDate, now) === -1) {
            deleteAppointment(appointment.id).catch(err => console.error(err));
            return false;
          }

          return true;
        })       
        
        setAppointments(futureAppointments)
      })
      .catch(err => console.error(err))
  }, [user])

  const addAppointment = (appointment: AppointmentProps) => {
    setAppointments(prev => [...prev, appointment]);
  }

  const removeAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Week View</h2>
        {days.map((day, index) => {
          const daysAppointments = appointments
            .filter(appointment => Temporal.PlainDate.from(appointment.dateTime).toString() === day.iso)
            .sort((a, b) => Temporal.PlainTime.compare(a.dateTime, b.dateTime));
          return <Day key={index} day={day} appointments={daysAppointments} addAppointment={addAppointment} removeAppointment={removeAppointment} />
        })}
      </main>
    </div>
  );
}
