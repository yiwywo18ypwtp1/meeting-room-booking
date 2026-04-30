export type ISODateString = string;

export type Booking = {
    id: number;

    startTime: ISODateString;
    endTime: ISODateString;

    description?: string;

    userId: number;
    roomId: number;

    createdAt: string;
};

export type CreateBooking = {
    startTime: string;
    endTime: string;
    description?: string;
};

export type UpdateBooking = Partial<{
    startTime: string;
    endTime: string;
    description?: string;
}>;

export type BookingWithUser = Booking & {
    user: {
        id: number;
        email: string;
    };
};