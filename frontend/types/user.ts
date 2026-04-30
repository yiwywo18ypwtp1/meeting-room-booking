export type User = {
    id: number;
    email: string;
    name: string;
}

export type UserSignup = {
    name: string;
    email: string;
    password: string;
}

export type UserLogin = {
    email: string;
    password: string;
}