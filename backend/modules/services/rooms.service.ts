import { prisma } from "../../db";

import { RoomCreate, RoomUpdate } from "../../types/room";
import { UserId } from "../../types/user";
import { HttpError } from "../../utils/HttpError";

export const create = async (data: RoomCreate, userId: UserId) => {
    return prisma.room.create({
        data: {
            name: data.name,
            description: data.description,

            members: {
                create: {
                    userId,
                    role: "ADMIN",
                },
            },
        },
    });
};

export const findAll = async (userId: UserId) => {
    return prisma.room.findMany({
        where: {
            members: {
                some: {
                    userId,
                },
            },
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true
                        }
                    }
                }
            }
        }
    });
};

export const findOne = async (id: number, userId: UserId) => {
    const room = await prisma.room.findFirst({
        where: {
            id,
            members: {
                some: {
                    userId,
                },
            },
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            },
            bookings: true,
        },
    });

    if (!room) {
        throw new HttpError("Room not found", 404);
    }

    return room;
};

export const update = async (id: number, userId: UserId, data: RoomUpdate) => {
    const room = await prisma.room.findFirst({
        where: {
            id,
            members: {
                some: {
                    userId,
                    role: "ADMIN",
                },
            },
        },
    });

    if (!room) {
        throw new HttpError("No access or room not found", 403);
    }

    return prisma.room.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number, userId: UserId) => {
    const room = await prisma.room.findFirst({
        where: {
            id,
            members: {
                some: {
                    userId,
                    role: "ADMIN",
                },
            },
        },
    });

    if (!room) {
        throw new HttpError("No access or room not found", 403);
    }

    return prisma.$transaction([
        prisma.roomMember.deleteMany({
            where: { roomId: id }
        }),
        prisma.booking.deleteMany({
            where: { roomId: id }
        }),
        prisma.room.delete({
            where: { id }
        })
    ]);
};

export const addMember = async (
    roomId: number,
    adminId: number,
    email: string,
    role: "USER" | "ADMIN"
) => {
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
        throw Object.assign(new Error("Room not found"), { status: 404 });
    }

    const isAdmin = await prisma.roomMember.findFirst({
        where: {
            roomId,
            userId: adminId,
            role: "ADMIN",
        },
    });

    if (!isAdmin) {
        throw new HttpError("No access", 403);
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw Object.assign(new Error("User not found"), { status: 404 });
    }

    const exists = await prisma.roomMember.findFirst({
        where: {
            roomId,
            userId: user.id,
        },
    });

    if (exists) {
        throw new HttpError("Already a member", 409)
    }

    return prisma.roomMember.create({
        data: {
            roomId,
            userId: user.id,
            role,
        },
    });
};