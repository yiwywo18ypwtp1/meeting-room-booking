import { Booking } from "./booking";

export type Member = {
    id: number;
    userId: number;
    roomId: number;
    role: "ADMIN" | "USER";
};

export type Room = {
    id: number;
    name: string;
    description?: string;

    members: Member[];
    bookings: Booking[];
}

export type RoomCreate = {
    name: string;
    description?: string;
};

export type RoomUpdate = Partial<{
    name: string;
    description?: string;
}>;

export type RoomId = number;