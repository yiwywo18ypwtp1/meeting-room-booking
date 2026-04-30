import { api } from "@/lib/api";
import { UserLogin, UserSignup } from "@/types/user";

export const login = async (data: UserLogin) => {
    return api.post("/auth/login", data);
}

export const signup = async (data: UserSignup) => {
    return api.post("/auth/signup", data);
}

export const getMe = () => {
    return api.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};