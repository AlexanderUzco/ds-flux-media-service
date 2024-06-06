import { Request, Response } from 'express';
import { handleErrorHttp } from '../utils/errors';

import {
  createTopic,
  deleteTopic,
  getTopics,
  getTopic,
  updateTopic,
} from '../services/topic.service';

const getTopicsRequest = async (req: Request, res: Response) => {
  try {
    const topics = await getTopics();

    if (!topics) throw new Error('Error getting topics');

    res.status(200).send({
      message: 'Topics found',
      topics,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error getting topics', error);
  }
};

const getTopicRequest = async (req: Request, res: Response) => {
  try {
    const { topicID } = req.params;

    const topic = await getTopic(topicID);

    if (!topic) throw new Error('Topic not found');

    res.status(200).send({
      message: 'Topic found',
      topic,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error getting topic', error);
  }
};

const createTopicRequest = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newTopic = await createTopic(body);

    if (!newTopic) throw new Error('Error creating topic');

    res.status(201).send({
      message: 'Topic created',
      topic: newTopic,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error creating topic', error);
  }
};

const updateTopicRequest = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { topicID } = req.params;

    const updatedTopic = await updateTopic({ ...body, id: topicID });

    if (!updatedTopic) throw new Error('Error updating topic');

    res.status(200).send({
      message: 'Topic updated',
      topic: updatedTopic,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error updating topic', error);
  }
};

const deleteTopicRequest = async (req: Request, res: Response) => {
  try {
    const { topicID } = req.params;

    const deletedTopic = await deleteTopic(topicID);

    if (!deletedTopic) throw new Error('Error deleting topic');

    res.status(200).send({
      message: 'Topic deleted',
      topic: deletedTopic,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error deleting topic', error);
  }
};

export {
  getTopicsRequest,
  getTopicRequest,
  createTopicRequest,
  updateTopicRequest,
  deleteTopicRequest,
};
