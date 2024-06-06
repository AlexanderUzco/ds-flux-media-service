import { Request } from 'express';

const getBaseUrl = (req: Request): string => {
  const protocol = req.protocol; // Obtener el protocolo (http o https)
  const hostname = req.get('host'); // Obtener el nombre del host
  return `${protocol}://${hostname}`;
};

export { getBaseUrl };
