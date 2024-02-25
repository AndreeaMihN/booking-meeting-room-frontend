import { Slot } from "./slot";

export interface Booking {
  roomId: string,
  morningBooked?: boolean,
  afternoonBooked?: boolean,
  allDayBooked?: boolean
}
