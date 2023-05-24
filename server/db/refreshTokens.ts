import { prisma } from ".";

interface refreshTokenProps {
  token: string;
  userId: string;
}

export const createRefreshToken = (refreshToken: refreshTokenProps) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  })
}

export const getRefreshTokenByToken = (token: any) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    }
  })
}

export const removeRefreshToken = (token: any) => {
  return prisma.refreshToken.delete({
    where: {
      token: token,
    }
  })
}