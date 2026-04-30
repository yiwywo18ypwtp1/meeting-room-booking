import { prisma } from "../../db";

import { checkPass, hashPass } from "../../utils/hashPass";
import { User } from "../../types/user";
import { generate_token } from "../../middlewares/JWTAuth";
import { UserId, UserLogin, UserSignup } from "../../types/user";


export const signup = async ({ name, email, password }: UserSignup) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        const err = new Error('User already exists') as any;
        err.status = 409;
        throw err;
    }

    const hashedPassword = await hashPass(password);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        },
    });

    return {
        "created_user": {
            "id": user.id,
            "email": user.email,
        },
    }
}

export const login = async ({ email, password }: UserLogin) => {
    const existUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!existUser) {
        const err = new Error("No User with this email exists") as any;
        err.status = 404;
        throw err;
    }

    await checkPass(password, existUser.password);

    return await generate_token({ id: existUser.id, name: existUser.name, email: existUser.email });
}

export const getMe = async (userId: UserId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            createdAt: true,
        },
    });

    if (!user) {
        const err = new Error("User not found") as any;
        err.status = 404;
        throw err;
    }

    return user;
};