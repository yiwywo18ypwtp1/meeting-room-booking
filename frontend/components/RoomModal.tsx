"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { createRoom, updateRoom } from "@/api/rooms";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    room?: {
        id: number;
        name: string;
        description?: string;
    };
};

export default function RoomModal({
    isOpen,
    onClose,
    onSuccess,
    room,
}: Props) {
    const isEdit = !!room;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (room) {
            setName(room.name);
            setDescription(room.description || "");
        } else {
            setName("");
            setDescription("");
        }
    }, [room]);

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await updateRoom(room!.id, { name, description });
            } else {
                await createRoom({ name, description });
            }

            onSuccess();
            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Edit Room" : "Create Room"}
        >
            <input
                placeholder="Room name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg px-3 py-2"
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-lg px-3 py-2"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 rounded-lg"
            >
                {isEdit ? "Save" : "Create"}
            </button>
        </Modal>
    );
}