import { FilesItem } from '../interfaces/filesItem.interface';
import FilesItemModel from '../models/filesItem.model';

const getFilesItems = async () => {
  const filesItems = await FilesItemModel.find();

  return filesItems;
};

const getFilesItemByIds = async (ids: string[]) => {
  const filesItems = await FilesItemModel.find({ _id: { $in: ids } });

  return filesItems;
};

const getFilesItem = async (id: string) => {
  const filesItem = await FilesItemModel.findById(id);

  if (!filesItem) {
    throw new Error('FilesItem not found');
  }

  return filesItem;
};

const createFilesItem = async (filesItem: FilesItem) => {
  const { name, type, url, ref, createdBy } = filesItem;

  const filesItemData = await FilesItemModel.create({
    name,
    type,
    url,
    createdBy,
    ref,
  });

  return filesItemData;
};

const createFilesItems = async (filesItems: FilesItem[]) => {
  const filesItemsData = await FilesItemModel.insertMany(filesItems);

  return filesItemsData;
};

const updateFilesItem = async (filesItem: FilesItem) => {
  const { id, name, type, url } = filesItem;

  const filesItemExists = await FilesItemModel.findById(id);

  if (!filesItemExists) {
    throw new Error('FilesItem not found');
  }

  filesItemExists.name = name;
  filesItemExists.type = type;
  filesItemExists.url = url;

  await filesItemExists.save();

  return filesItemExists;
};

const deleteFilesItem = async (id: string) => {
  const filesItem = await FilesItemModel.findByIdAndDelete(id);

  if (!filesItem) {
    throw new Error('FilesItem not found');
  }

  return filesItem;
};

const deleteFilesItems = async (ids: string[]) => {
  const filesItems = await FilesItemModel.deleteMany({ _id: { $in: ids } });

  return filesItems;
};

export {
  getFilesItems,
  getFilesItemByIds,
  getFilesItem,
  createFilesItem,
  createFilesItems,
  updateFilesItem,
  deleteFilesItem,
  deleteFilesItems,
};
