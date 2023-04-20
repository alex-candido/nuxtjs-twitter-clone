import { prisma } from ".";

export const createUser = (userData) => {
    return prisma.create({
        data: userData,
    })
}