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
    })
    .populate('content.videos')
    .populate('content.images');

  const totalItemsSummary = {
    totalItems: contentItems.length,
    totalImages: 0,
    totalVideos: 0,
    totalText: 0,
  };

  contentItems.forEach((contentItem) => {
    totalItemsSummary.totalImages += contentItem.content.images.length;
    totalItemsSummary.totalVideos += contentItem.content.videos.length;
    totalItemsSummary.totalText += 1;
  });

  return { contentItems, totalItemsSummary };
};

const getContentItem = async (id: string) => {
  const contentItem = await ContentItemModel.findById(id)
    .populate('createdBy')
    .populate({
      path: 'topicID',
      populate: { path: 'categoryID' },
    })
    .populate('content.videos')
    .populate('content.images');

  if (!contentItem) {
    throw new Error('ContentItem not found');
  }

  return contentItem;
};

const getContentItemByUserID = async (userID: string) => {
  const contentItems = await ContentItemModel.find({ createdBy: userID })
    .populate('createdBy')
    .populate('topicID')
    .populate('content.videos')
    .populate('content.images');

  return contentItems;
};

const getTotalItemsSummary = async () => {
  //Get all content (images count, videos count, text count) from items
  const contentItems = await ContentItemModel.find()
    .populate('createdBy')
    .populate('topicID')
    .populate('content.videos')
    .populate('content.images');

  if (!contentItems) {
    throw new Error('ContentItems not found');
  }

  console.log({ contentItems });

  const totalItemsSummary = {
    totalItems: contentItems.length,
    totalImages: 0,
    totalVideos: 0,
    totalText: 0,
  };

  contentItems.forEach((contentItem) => {
    totalItemsSummary.totalImages += contentItem.content.images.length;
    totalItemsSummary.totalVideos += contentItem.content.videos.length;
    totalItemsSummary.totalText += 1;
  });

  return totalItemsSummary;
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

  await FilesItemModel.deleteMany({ _id: { $in: contentItem.content.images } });

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
