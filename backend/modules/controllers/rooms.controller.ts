import { Request, Response } from "express";

import * as roomsService from "../services/rooms.service";
import { RoomCreate, RoomUpdate } from "../../types/room";

export const createRoom = async (req: Request<{}, {}, RoomCreate>, res: Response) => {
	try {
		const userId = (req as any).user.id;

		const room = await roomsService.create(req.body, userId);

		res.json(room);
	} catch (err: any) {
		res.status(err.status || 500).json({
			message: err.message,
		});
	}
};

export const getRooms = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.id;

		const rooms = await roomsService.findAll(userId);

		res.json(rooms);
	} catch (err: any) {
		res.status(err.status || 500).json({
			message: err.message,
		});
	}
};

export const getRoom = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = Number(req.params.id);
		const userId = (req as any).user.id;

		const room = await roomsService.findOne(id, userId);

		res.json(room);
	} catch (err: any) {
		res.status(err.status || 500).json({
			message: err.message,
		});
	}
};

export const updateRoom = async (req: Request<{ id: string }, {}, RoomUpdate>, res: Response) => {
	try {
		const id = Number(req.params.id);
		const userId = (req as any).user.id;

		const room = await roomsService.update(id, userId, req.body);

		res.json(room);
	} catch (err: any) {
		res.status(err.status || 500).json({
			message: err.message,
		});
	}
};

export const deleteRoom = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = Number(req.params.id);
		const userId = (req as any).user.id;

		await roomsService.remove(id, userId);

		res.json({ message: "Room deleted" });
	} catch (err: any) {
		res.status(err.status || 500).json({
			message: err.message,
		});
	}
};

export const addMember = async (
	req: Request<{ roomId: string }, {}, { email: string; role: "USER" | "ADMIN" }>,
	res: Response
) => {
	try {
		const adminId = (req as any).user.id;
		const roomId = Number(req.params.roomId);
		const { email, role } = req.body;

		const member = await roomsService.addMember(roomId, adminId, email, role);

		res.json(member);
	} catch (err: any) {
		res.status(err.status || 500).json({
			message: err.message,
		});
	}
};