export const mediaFileTransformer = (mediFile: any): { id: string, url: string } => {
  return {
    id: mediFile.id,
    url: mediFile.url
  }
}
