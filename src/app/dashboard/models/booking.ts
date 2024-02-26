import { Slot } from "./slot";

export interface Booking {
  roomId: string,
  teamIdId?: string,
  morningBooked?: boolean,
  afternoonBooked?: boolean,
  allDayBooked?: boolean
}
