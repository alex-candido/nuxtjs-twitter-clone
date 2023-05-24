import bcrypt from "bcrypt";
import { prisma } from ".";

interface userDataProps {
    username: string;
    email: string;
    password: string;
    name: string;
    profileImage: string;
}

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