import { Schema } from 'mongoose';
import { Topic } from '../interfaces/topic.interface';
import TopicModel from '../models/topic.model';
import { Content } from '../interfaces/contentItem.interface';

const getTopics = async () => {
  const topics = await TopicModel.find();

  return topics;
};

const getTopic = async (id: string | Schema.Types.ObjectId) => {
  const topic = await TopicModel.findById(id);

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

const validateContentByTopic = async (
  topicID: string | Schema.Types.ObjectId,
  content: Content
) => {
  const topic = await getTopic(topicID);

  if (!topic.allowContent) {
    throw new Error('Topic does not allow content');
  }

  // Verify is content is allowed by topic
  const { image, document, video, text } = topic.allowContent;

  if (content.images && !image) {
    throw new Error('Content does not allow image');
  }

  if (content.documents && !document) {
    throw new Error('Content does not allow document');
  }

  if (content.videos && !video) {
    throw new Error('Content does not allow video');
  }

  if (content.text && !text) {
    throw new Error('Content does not allow text');
  }
};

export {
  getTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
  validateContentByTopic,
};
