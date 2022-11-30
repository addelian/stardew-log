import { readDate, removeSingleTimer } from "./common";

test("Returns a SV date readout when passed a positive integer", () => {
    expect(readDate(0)).toBe("Spring 1");
});