import { Request, Response } from 'express';
import { handleErrorHttp } from '../utils/errors';

import {
  createContentItem,
  deleteContentItem,
  getContentItem,
  updateContentItem,
  getContentItems,
} from '../services/contentItem.service';

const getContentItemRequest = async (req: Request, res: Response) => {
  try {
    const { contentItemID } = req.params;

    const contentItem = await getContentItem(contentItemID);

    if (!contentItem) throw new Error('ContentItem not found');

    res.status(200).send({
      message: 'ContentItem found',
      contentItem,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error getting contentItem', error);
  }
};

const getContentItemsRequest = async (req: Request, res: Response) => {
  try {
    const contentItems = await getContentItems();

    if (!contentItems) throw new Error('Error getting contentItems');

    res.status(200).send({
      message: 'ContentItems found',
      contentItems,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error getting contentItems', error);
  }
};

const createContentItemRequest = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newContentItem = await createContentItem(body);

    if (!newContentItem) throw new Error('Error creating contentItem');

    res.status(201).send({
      message: 'ContentItem created',
      contentItem: newContentItem,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error creating contentItem', error);
  }
};

const updateContentItemRequest = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const updatedContentItem = await updateContentItem(body);

    if (!updatedContentItem) throw new Error('Error updating contentItem');

    res.status(200).send({
      message: 'ContentItem updated',
      contentItem: updatedContentItem,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error updating contentItem', error);
  }
};

const deleteContentItemRequest = async (req: Request, res: Response) => {
  try {
    const { contentItemID } = req.params;

    const deletedContentItem = await deleteContentItem(contentItemID);

    if (!deletedContentItem) throw new Error('Error deleting contentItem');

    res.status(200).send({
      message: 'ContentItem deleted',
      contentItem: deletedContentItem,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error deleting contentItem', error);
  }
};

export {
  getContentItemRequest,
  getContentItemsRequest,
  createContentItemRequest,
  updateContentItemRequest,
  deleteContentItemRequest,
};
