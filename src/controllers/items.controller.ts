import { Request, Response } from "express";
import { CategoryType } from "../models/items/category.mongo";
import { ItemType } from "../models/items/item.mongo";
import {
  getCategoriesId,
  addCategory,
  addItem,
  getItemsId,
  getCategoryDetails,
  getItem,
  removeItem,
  removeCategory,
  getAllCategories,
  getItemForCategory
} from "../models/items/items.model";

const fetchCategoriesId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ids = await getCategoriesId();
    return res.status(200).json(ids);
  } catch (err) {
    return res.status(500).json({ error: `Failed to fetch category IDs: ${err}` });
  }
};

const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: Omit<CategoryType, "items"> = req.body;
    const category = await addCategory(data);
    if (!category) {
      return res.status(404).json({ error: "Category creation failed" });
    }
    return res.status(201).json(category);
  } catch (err) {
    return res.status(500).json({ error: `Failed to create category: ${err}` });
  }
};

const createItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: ItemType = req.body;
    const item = await addItem(data);
    if (!item) {
      return res.status(404).json({ error: "Item creation failed" });
    }
    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ error: `Failed to create item: ${err}` });
  }
};

const fetchItemsIdForCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const category = await getCategoryDetails(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ error: `Failed to fetch items for category: ${err}` });
  }
};

const fetchItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      return res.status(400).json({ error: "Item ID is required" });
    }

    const item = await getItem(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ error: `Failed to fetch item: ${err}` });
  }
};

const deleteItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { itemId } = req.params;
    const item = await removeItem(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: `Failed to delete item: ${err}` });
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { categoryId } = req.params;
    const category = await removeCategory(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category and associated items deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: `Failed to delete category: ${err}` });
  }
};
const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ error: `Failed to delete category: ${err}` });
  }
};

const getCategoryWithItems = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const category = await getCategoryDetails(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const items = await getItemForCategory(categoryId);
    const data = {
      ...category,
      items,
    };

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: `Failed to fetch the category: ${err instanceof Error ? err.message : "Unknown error"}` });
  }
};

export {
  fetchCategoriesId,
  createCategory,
  createItem,
  fetchItemsIdForCategory,
  fetchItem,
  deleteItem,
  deleteCategory,
  getCategories,
  getCategoryWithItems
};
