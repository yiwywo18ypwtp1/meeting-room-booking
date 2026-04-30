export type User = {
    id?: number
    name: string;
    email: string
    password: string;
}

export type UserSignup = Omit<User, "id">
export type UserLogin = Omit<User, "name">

export type UserOutput = Omit<User, "password">

export type UserId = number;