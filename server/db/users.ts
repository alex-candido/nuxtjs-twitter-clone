import bcrypt from "bcrypt";
import { userDataProps } from "~/@types/db";
import { prisma } from ".";

export const createUser = (userData: userDataProps) => {

    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10),
    }

    return prisma.user.create({
        data: finalUserData,
    })
}

export const getUserByUsername = (username: string) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

export const getUserById = (userId: string) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}
