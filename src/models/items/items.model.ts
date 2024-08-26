import Category, { CategoryType } from "./category.mongo";
import Item, { ItemType } from "./item.mongo";
import { Types } from "mongoose";

const getCategoriesId = async (): Promise<string[]> => {
  try {
    const categories = await Category.find({}, { _id: 1 }).lean();
    return categories.map((category) => category._id.toString());
  } catch (error) {
    throw new Error(`Error fetching category IDs: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const addCategory = async (catData: Omit<CategoryType, "items">): Promise<CategoryType | null> => {
  try {
    return await Category.create(catData);
  } catch (error) {
    throw new Error(`Error creating category: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const addItem = async (itemData: ItemType): Promise<ItemType | null> => {
  try {
    const item = await Item.create(itemData);
    await Category.findByIdAndUpdate(item.categoryId, { $push: { items: item._id } }).lean();
    return item;
  } catch (error) {
    throw new Error(`Error creating item: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const getItemsId = async (categoryId: string): Promise<string[]> => {
  try {
    const items = await Item.find({ categoryId }).select('_id').lean();
    return items.map((item) => item._id.toString());
  } catch (error) {
    throw new Error(`Error fetching items IDs: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const getCategoryDetails = async (categoryId: string): Promise<CategoryType | null> => {
  try {
    return await Category.findById(categoryId).populate('items').lean();
  } catch (error) {
    throw new Error(`Error fetching category details: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const getItem = async (itemId: string): Promise<ItemType | null> => {
  try {
    return await Item.findById(itemId).select('-createdAt -updatedAt').lean();
  } catch (error) {
    throw new Error(`Error fetching item: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const removeItem = async (itemId: string): Promise<ItemType | null> => {
  try {
    const item = await Item.findByIdAndDelete(itemId).lean();
    if (item) {
      await Category.findByIdAndUpdate(item.categoryId, { $pull: { items: item._id } }).lean();
    }
    return item;
  } catch (error) {
    throw new Error(`Error deleting item: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const removeCategory = async (categoryId: string): Promise<CategoryType | null> => {
  try {
    await Item.deleteMany({ categoryId });
    return await Category.findByIdAndDelete(categoryId).lean();
  } catch (error) {
    throw new Error(`Error deleting category: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export { getCategoriesId, addCategory, addItem, getItemsId, getCategoryDetails, getItem, removeItem, removeCategory };
