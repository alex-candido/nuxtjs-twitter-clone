import { prisma } from ".";

export interface mediaFileProps {
  url: string;
  providerPublicId: string;
  userId: string;
  tweetId: string;
}

export const createMediaFile = (mediaFile: mediaFileProps) => {
  return prisma.mediaFile.create({
    data: mediaFile
  })
}
