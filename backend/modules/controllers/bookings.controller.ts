import { Request, Response } from "express";

import * as bookingService from "../services/bookings.service";
import { CreateBooking } from "../../types/booking";

export const createBooking = async (req: Request<{ roomId: string }, {}, CreateBooking>, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const roomId = Number(req.params.roomId);

        const booking = await bookingService.create(
            req.body,
            userId,
            roomId
        );

        res.json(booking);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const getBookings = async (req: Request<{ roomId: string }>, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const roomId = Number(req.params.roomId);

        const bookings = await bookingService.findAllByRoom(roomId, userId);

        res.json(bookings);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const deleteBooking = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const id = Number(req.params.id);

        await bookingService.remove(id, userId);

        res.json({ message: "Booking deleted" });
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};