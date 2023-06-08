import { mediaFileProps } from "~/@types/db";
import { prisma } from ".";

export const createMediaFile = (mediaFile: mediaFileProps) => {
  return prisma.mediaFile.create({
    data: mediaFile
  })
}
