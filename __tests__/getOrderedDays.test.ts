import { Temporal } from '@js-temporal/polyfill';
import { getOrderedDays } from "@/lib/getOrderedDays";

describe("getOrderedDays", () => {
  it("should return the days of the week in order, starting from the given day", () => {
    const result = getOrderedDays();
    expect(result).toHaveLength(7);
    const today = Temporal.Now.plainDateISO();
    result.forEach((day, index) => {
      const expectedDay = today.add({ days: index });
      expect(day.iso).toBe(expectedDay.toString());
      expect(day.year).toBe(expectedDay.year);
      expect(day.month).toBe(expectedDay.month);
      expect(day.day).toBe(expectedDay.day);
      expect(day.dayOfWeek).toBe(expectedDay.dayOfWeek);
    });
  });
});