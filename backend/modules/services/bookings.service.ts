import { prisma } from "../../db";

import { CreateBooking } from "../../types/booking";
import { RoomId } from "../../types/room";
import { UserId } from "../../types/user";
import { HttpError } from "../../utils/HttpError";

export const create = async (data: CreateBooking, userId: UserId, roomId: RoomId) => {
    const { startTime, endTime, description } = data;

    const start = new Date(startTime);
    const end = new Date(endTime);

    const room = await prisma.room.findUnique({
        where: { id: roomId },
    });

    if (!room) {
        throw new HttpError("Room not found", 404);
    }

    if (start >= end) {
        throw new HttpError("Invalid time range", 400);
    }

    const isMember = await prisma.roomMember.findFirst({
        where: {
            roomId,
            userId,
        },
    });

    if (!isMember) {
        throw new HttpError("No access to this room", 403);
    }

    const conflict = await prisma.booking.findFirst({
        where: {
            roomId,
            AND: [
                {
                    startTime: { lt: end },
                },
                {
                    endTime: { gt: start },
                },
            ],
        },
    });

    if (conflict) {
        throw new HttpError("Time slot already booked", 409);
    }

    return prisma.booking.create({
        data: {
            startTime: start,
            endTime: end,
            description,
            userId,
            roomId,
        },
    });
};

export const findAllByRoom = async (roomId: RoomId, userId: UserId) => {
    const isMember = await prisma.roomMember.findFirst({
        where: { roomId, userId },
    });

    if (!isMember) {
        throw new HttpError("No access to this room", 403);
    }

    return prisma.booking.findMany({
        where: { roomId },
        orderBy: { startTime: "asc" },
    });
};

export const remove = async (id: number, userId: number) => {
    const booking = await prisma.booking.findUnique({
        where: { id },
    });

    if (!booking) {
        throw new HttpError("Booking not found", 404);
    }

    if (booking.userId !== userId) {
        throw new HttpError("No access to delete", 403);
    }

    return prisma.booking.delete({
        where: { id },
    });
};