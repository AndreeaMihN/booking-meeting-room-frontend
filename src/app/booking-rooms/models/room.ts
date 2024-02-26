import { Office } from "./office"

export interface Room {
  _id: string,
  name: string,
  description: string,
  capacity: number
  office: Office,
  imageUrl: string,
  floor: number,
}

