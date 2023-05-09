import { prisma } from ".";
import bcrypt from "bcrypt"

export const createUser = (userData) => {
    return prisma.user.create({
        data: userData
    })
}