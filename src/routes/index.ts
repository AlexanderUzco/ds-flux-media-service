import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const clearFileName = (filename: string) => {
  return filename.replace('.ts', '').replace('.js', '');
};

readdirSync(PATH_ROUTER).forEach((filename) => {
  const cleanName = clearFileName(filename);

  if (cleanName == 'index') return;

  import(`./${cleanName}`).then((module) => {
    router.use(`/${cleanName}`, module.router);
  });
});

export { router };
