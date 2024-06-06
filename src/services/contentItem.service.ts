import { ContentItem } from '../interfaces/contentItem.interface';
import ContentItemModel from '../models/contentItem.model';
import FilesItemModel from '../models/filesItem.model';
import { getTopic, validateContentByTopic } from './topic.service';

const getContentItems = async () => {
  const contentItems = await ContentItemModel.find()
    .populate('createdBy')
    .populate('topicID')
    .populate('content.videos')
    .populate('content.images')
    .populate('content.documents');

  return contentItems;
};

const getContentItem = async (id: string) => {
  // Get content item by id and populate createdBy field, topicID field, and content field
  const contentItem = await ContentItemModel.findById(id)
    .populate('createdBy')
    .populate('topicID')
    .populate('content.videos')
    .populate('content.images')
    .populate('content.documents');

  if (!contentItem) {
    throw new Error('ContentItem not found');
  }

  return contentItem;
};

const createContentItem = async (contentItem: ContentItem) => {
  const { title, description, topicID, content, createdBy } = contentItem;

  const contentItemExists = await ContentItemModel.findOne({ title }).populate(
    'topicID'
  );

  if (contentItemExists) {
    throw new Error('ContentItem already exists');
  }

  const topic = await getTopic(topicID);

  if (!topic.allowContent) {
    throw new Error('Topic does not allow content');
  }

  await validateContentByTopic(topicID, content);

  const contentItemData = await ContentItemModel.create({
    title,
    description,
    topicID,
    content,
    createdBy,
  });

  return contentItemData;
};

const updateContentItem = async (contentItem: ContentItem) => {
  const { id, title, description, topicID, content } = contentItem;

  const contentItemExists = await ContentItemModel.findById(id);

  if (!contentItemExists) {
    throw new Error('ContentItem not found');
  }

  contentItemExists.title = title;
  contentItemExists.description = description;
  contentItemExists.topicID = topicID;
  contentItemExists.content = content;

  await contentItemExists.save();

  return contentItemExists;
};

const deleteContentItem = async (id: string) => {
  const contentItem = await ContentItemModel.findByIdAndDelete(id);

  if (!contentItem) {
    throw new Error('ContentItem not found');
  }

  await FilesItemModel.deleteMany({ _id: { $in: contentItem.content.videos } });
  await FilesItemModel.deleteMany({ _id: { $in: contentItem.content.images } });
  await FilesItemModel.deleteMany({
    _id: { $in: contentItem.content.documents },
  });

  return contentItem;
};

export {
  getContentItems,
  getContentItem,
  createContentItem,
  updateContentItem,
  deleteContentItem,
};
