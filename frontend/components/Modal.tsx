"use client";

import { ReactNode } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* modal */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {children}
            </div>
        </div>
    );
}