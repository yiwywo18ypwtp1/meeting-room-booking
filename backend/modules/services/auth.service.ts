import { prisma } from "../../db";

import { checkPass, hashPass } from "../../utils/hashPass";
import { generate_token } from "../../middlewares/JWTAuth";
import { UserId, UserLogin, UserSignup } from "../../types/user";
import { HttpError } from "../../utils/HttpError";


export const signup = async ({ name, email, password }: UserSignup) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new HttpError("User already exists", 409);
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
        throw new HttpError("No User with this email exists", 404);
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
        throw new HttpError("User not found", 404);
    }

    return user;
};