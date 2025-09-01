'use client'
import { Day } from "@/lib/getOrderedDays";
import Adder from "../Adder/Adder";
import Appointment, { AppointmentProps } from "../Appointment/Appointment"
import { useState } from "react";
import { Temporal } from "@js-temporal/polyfill";

export default function AppointmentContainer({ appointments, date }: { appointments: AppointmentProps[], date: string }){

    const [ dayAppointments, setDayAppointments ] = useState(appointments);

    const removeAppointment = (id: string) => {
        setDayAppointments(prev => prev.filter(a => a.id !== id));
    }

    const addAppointment = (appointment: AppointmentProps) => {
        setDayAppointments(prev => [...prev, appointment]);
    }

    function getDay():Day {    
        const dayMap = [    
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];

        const monthMap = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const day = Temporal.PlainDate.from(date);
        return {
            iso: date,
            year: day.year,
            month: day.month,
            day: day.day,
            dayOfWeek: day.dayOfWeek,
            dayString: dayMap[day.dayOfWeek - 1],
            monthString: monthMap[day.month - 1],
        };
    }
    
    return(
        <div>
            {dayAppointments.map((appointment: AppointmentProps) => 
                <Appointment key={appointment.id} appointment={appointment} removeAppointment={removeAppointment} />
            )}
            <Adder day={getDay()} setter={addAppointment} />
        </div>
    )
}