import { Room } from "./room";
import { Team } from "./team";

export interface BookingDetails {
  roomId: Room,
  teamId: Team,
  day: Date,
  morningBooked?: boolean,
  afternoonBooked?: boolean,
  allDayBooked?: boolean
}
