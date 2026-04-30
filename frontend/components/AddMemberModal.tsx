"use client";

import { useState } from "react";
import Modal from "./Modal";
import { addMember } from "@/api/rooms";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    roomId: number;
};

export default function AddMemberModal({
    isOpen,
    onClose,
    onSuccess,
    roomId,
}: Props) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"USER" | "ADMIN">("USER");

    const handleSubmit = async () => {
        try {
            await addMember(roomId, { email, role });
            onSuccess();
            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add member">
            <input
                placeholder="User email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg px-3 py-2"
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")}
                className="border rounded-lg px-3 py-2"
            >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
            </select>

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 rounded-lg"
            >
                Add
            </button>
        </Modal>
    );
}