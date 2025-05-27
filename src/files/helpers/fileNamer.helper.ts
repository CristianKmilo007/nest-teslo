import { randomUUID } from 'crypto';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, fileName: string) => void,
) => {

  const fileExtension = file.mimetype.split('/')[1];
  
  const fileName = `${randomUUID()}.${fileExtension}`;

  callback(null, fileName);
};