import { Temporal } from '@js-temporal/polyfill';

export function getOrderedDays():Array<Temporal.PlainDate> {
    const today = Temporal.Now.plainDateISO();
    const days = Array.from({ length: 7 }, (_, i) => today.add({ days: i }));
    return days;
}