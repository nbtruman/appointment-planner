'use client'

import styles from './Adder.module.css';
import type { Day } from '@/lib/getOrderedDays';
import { useState } from 'react';
import { AppointmentProps } from '../Appointment/Appointment';

export default function Adder({ day, setter }: { day: Day, setter: (appointment: AppointmentProps) => void }){

    const [ details, setDetails ] = useState({
        id: '',
        description: '',
        time: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails(prev => ({ ...prev, [name]: value }))
    }

    const handleNewEntry = () => {
        const id = crypto.randomUUID();
        const appointment = {
            id: id,
            description: details.description ? details.description : 'appointment',
            dateTime: `${day.iso} ${details.time ? details.time : '00:00'}`,
        }

        fetch('/api/appointments', {
            method: 'POST',
            body: JSON.stringify(appointment)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Could not post appointment');
            }
            return res.json()
        })
        .then(data => {
            console.log(data);
            setter(appointment)
        })

        setDetails({
            id: '',
            description: '',
            time: '',
        })

    }

    return(
        <div className={styles.adder}>
            <div className={styles.inputs} >
                <fieldset>
                    <label htmlFor={`${day.iso}-description`}>Description:</label>
                    <input type="text" name="description" id={`${day.iso}-description`} value={details.description} onChange={handleChange}/>
                </fieldset>
                <fieldset>
                    <label htmlFor={`${day.iso}-time`}>Time:</label>
                    <input type="time" id={`${day.iso}-time`} name="time" value={details.time} onChange={handleChange}/>
                </fieldset>                
            </div>
            <div className={styles.plus} onClick={handleNewEntry}>
                +
            </div>
        </div>
    )
}