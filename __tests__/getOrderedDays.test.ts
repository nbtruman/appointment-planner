import { getOrderedDays } from "@/lib/getOrderedDays";

describe("getOrderedDays", () => {
  it("should return the days of the week in order, starting from the given day", () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < 7; i++) {
        jest.spyOn(global, 'Date').mockImplementation(() => ({getDay: () => i}) as unknown as Date);
        const orderedDays = getOrderedDays();

        expect(orderedDays[0]).toBe(days[i]);
        expect(orderedDays.length).toBe(7);

        jest.clearAllMocks();
    }
  });
});