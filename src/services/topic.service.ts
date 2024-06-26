import { Schema } from 'mongoose';
import { Topic } from '../interfaces/topic.interface';
import TopicModel from '../models/topic.model';
import { Content } from '../interfaces/contentItem.interface';

const getTopics = async () => {
  const topics = await TopicModel.find()
    .populate('categoryID')
    .populate('createdBy');

  return topics;
};

const getTopic = async (id: string | Schema.Types.ObjectId) => {
  const topic = await TopicModel.findById(id)
    .populate('categoryID')
    .populate('createdBy');

  if (!topic) {
    throw new Error('Topic not found');
  }

  return topic;
};

const createTopic = async (topic: Topic) => {
  const { name, color, categoryID, allowContent, createdBy } = topic;

  const topicExists = await TopicModel.findOne({ name });

  if (topicExists) {
    throw new Error('Topic already exists');
  }

  const topicData = await TopicModel.create({
    name,
    color,
    categoryID,
    allowContent,
    createdBy,
  });

  return topicData;
};

const updateTopic = async (topic: Topic) => {
  const { id, name, color, categoryID, allowContent } = topic;

  const topicExists = await TopicModel.findById(id);

  if (!topicExists) {
    throw new Error('Topic not found');
  }

  topicExists.name = name;
  topicExists.color = color;
  topicExists.categoryID = categoryID;
  topicExists.allowContent = allowContent;

  await topicExists.save();

  return topicExists;
};

const deleteTopic = async (id: string) => {
  const topic = await TopicModel.findByIdAndDelete(id);

  if (!topic) {
    throw new Error('Topic not found');
  }

  return topic;
};

const deleteTopics = async (ids: string[]) => {
  const topics = await TopicModel.deleteMany({ _id: { $in: ids } });

  return topics;
};

const deleteTopicsByCategory = async (categoryID: string) => {
  const topics = await TopicModel.deleteMany({ categoryID });

  return topics;
};

const validateContentByTopic = async (
  topicID: string | Schema.Types.ObjectId,
  content: Content
) => {
  const topic = await getTopic(topicID);

  if (!topic.allowContent) {
    throw new Error('Topic does not allow content');
  }

  const contentAllowed = topic.allowContent[content.type];

  if (!contentAllowed) {
    throw new Error(`Content does not allow ${content.type}`);
  }
};

export {
  getTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
  deleteTopics,
  deleteTopicsByCategory,
  validateContentByTopic,
};
