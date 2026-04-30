"use client";

import { useState } from "react";
import Modal from "./Modal";
import { createBooking } from "@/api/bookings";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    roomId: number;
};

export default function BookingModal({
    isOpen,
    onClose,
    onSuccess,
    roomId,
}: Props) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        try {
            await createBooking(roomId, {
                startTime,
                endTime,
                description,
            });

            onSuccess();
            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Booking">
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border rounded-lg px-3 py-2"
            />

            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border rounded-lg px-3 py-2"
            />

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-lg px-3 py-2"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 rounded-lg"
            >
                Create
            </button>
        </Modal>
    );
}