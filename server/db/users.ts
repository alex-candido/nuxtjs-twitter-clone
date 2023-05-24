import bcrypt from "bcrypt";
import { prisma } from ".";

export const createUser = (userData: any) => {

    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10),
    }

    return prisma.user.create({
        data: finalUserData,
    })
}

export const getUserByUsername = (username: any) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}