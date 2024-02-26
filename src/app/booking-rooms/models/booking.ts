export interface Booking {
  roomId: string,
  teamId?: string,
  morningBooked?: boolean,
  afternoonBooked?: boolean,
  allDayBooked?: boolean
}
