import { api } from "@/lib/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getRooms = () => {
    return api.get("/rooms", getAuthHeaders());
};

export const getRoom = (id: number) => {
    return api.get(`/rooms/${id}`, getAuthHeaders());
};

export const createRoom = (data: {
    name: string;
    description?: string;
}) => {
    return api.post("/rooms", data, getAuthHeaders());
};

export const updateRoom = (id: number, data: {
    name?: string;
    description?: string;
}) => {
    return api.put(`/rooms/${id}`, data, getAuthHeaders());
};

export const deleteRoom = (id: number) => {
    return api.delete(`/rooms/${id}`, getAuthHeaders());
};

export const addMember = (
    roomId: number,
    data: { email: string; role: "USER" | "ADMIN" }
) => {
    return api.post(`/rooms/${roomId}/members`, data, getAuthHeaders());
};