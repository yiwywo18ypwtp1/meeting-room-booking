import { api } from "@/lib/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getBookingsByRoom = (roomId: number) => {
    return api.get(`/rooms/${roomId}/bookings`, getAuthHeaders());
};

export const createBooking = (
    roomId: number,
    data: {
        startTime: string;
        endTime: string;
        description?: string;
    }
) => {
    return api.post(`/rooms/${roomId}/bookings`, data, getAuthHeaders());
};

export const deleteBooking = (id: number) => {
    return api.delete(`/bookings/${id}`, getAuthHeaders());
};