import { Temporal } from '@js-temporal/polyfill';
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

export type Day = {
    iso: string;
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
    dayString: string;
    monthString: string;
}

export function getOrderedDays():Array<Day> {    
    const today = Temporal.Now.plainDateISO();
    const days = Array.from({ length: 7 }, (_, i) => {
        const day = today.add({ days: i })
        return {
            iso: day.toString(),
            year: day.year,
            month: day.month,
            day: day.day,
            dayOfWeek: day.dayOfWeek,
            dayString: dayMap[day.dayOfWeek - 1],
            monthString: monthMap[day.month - 1],
        };
    });    
    return days;
}