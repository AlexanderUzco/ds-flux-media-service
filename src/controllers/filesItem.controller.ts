import { Request, Response } from 'express';
import { handleErrorHttp } from '../utils/errors';

import {
  createFilesItem,
  deleteFilesItem,
  getFilesItems,
  getFilesItem,
  updateFilesItem,
  createFilesItems,
} from '../services/filesItem.service';

const createFilesItemRequest = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newFilesItem = await createFilesItem(body);

    if (!newFilesItem) throw new Error('Error creating filesItem');

    res.status(201).send({
      message: 'FilesItem created',
      filesItem: newFilesItem,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error creating filesItem', error);
  }
};

const createFilesItemsRequest = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newFilesItem = await createFilesItems(body);

    if (!newFilesItem) throw new Error('Error creating filesItems');

    res.status(201).send({
      message: 'FilesItems created',
      filesItem: newFilesItem,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error creating filesItems', error);
  }
};

export { createFilesItemRequest, createFilesItemsRequest };
