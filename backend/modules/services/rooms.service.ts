import { prisma } from "../../db";
import { RoomCreate, RoomUpdate } from "../../types/room";
import { UserId } from "../../types/user";

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
        const err = new Error("Room not found") as any;
        err.status = 404;
        throw err;
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
        const err = new Error("No access or room not found") as any;
        err.status = 403;
        throw err;
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
        const err = new Error("No access or room not found") as any;
        err.status = 403;
        throw err;
    }

    return prisma.room.delete({
        where: { id },
    });
};