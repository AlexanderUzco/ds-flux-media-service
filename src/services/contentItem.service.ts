import { ContentItem } from '../interfaces/contentItem.interface';
import ContentItemModel from '../models/contentItem.model';
import FilesItemModel from '../models/filesItem.model';
import { getTopic, validateContentByTopic } from './topic.service';

const getContentItems = async () => {
  const contentItems = await ContentItemModel.find()
    .populate('createdBy')
    .populate({
      path: 'topicID',
      populate: { path: 'categoryID' },
    });

  return { contentItems };
};

const getContentItem = async (id: string) => {
  const contentItem = await ContentItemModel.findById(id)
    .populate('createdBy')
    .populate({
      path: 'topicID',
      populate: { path: 'categoryID' },
    });

  if (!contentItem) {
    throw new Error('ContentItem not found');
  }

  return contentItem;
};

const getContentItemByUserID = async (userID: string) => {
  const contentItems = await ContentItemModel.find({ createdBy: userID })
    .populate('createdBy')
    .populate({
      path: 'topicID',
      populate: { path: 'categoryID' },
    });

  return contentItems;
};

const getTotalItemsSummary = async () => {
  //Get all content (images count, videos count, text count) from items
  const contentItems = await ContentItemModel.find()
    .populate('createdBy')
    .populate('topicID');

  if (!contentItems) {
    throw new Error('ContentItems not found');
  }

  const count = contentItems.reduce(
    (acc, contentItem) => {
      const { type, data } = contentItem.content;

      if (type === 'image') {
        acc.images += data.length;
      } else if (type === 'video') {
        acc.videos += data.length;
      } else if (type === 'text') {
        acc.text += 1;
      }

      return acc;
    },
    { contentItems: contentItems.length, images: 0, videos: 0, text: 0 }
  );

  return count;
};

const createContentItem = async (contentItem: ContentItem) => {
  const { title, topicID, content, createdBy } = contentItem;

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
    topicID,
    content,
    createdBy,
  });

  return contentItemData;
};

const updateContentItem = async (contentItem: ContentItem) => {
  const { id, title, topicID, content } = contentItem;

  const contentItemExists = await ContentItemModel.findById(id);

  if (!contentItemExists) {
    throw new Error('ContentItem not found');
  }

  contentItemExists.title = title;
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

  if (contentItem.content.type === 'image') {
    await FilesItemModel.deleteMany({ _id: { $in: contentItem.content.data } });
  }

  return contentItem;
};

export {
  getContentItems,
  getContentItem,
  createContentItem,
  updateContentItem,
  deleteContentItem,
  getContentItemByUserID,
  getTotalItemsSummary,
};
