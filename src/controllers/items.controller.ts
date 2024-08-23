import { Request,Response } from "express";
import { CategoryType } from "../models/items/category.mongo";
import { getCategoriesId,addItem,addCategory,getItemsId } from "../models/items/items.model";
import { ItemType } from "../models/items/item.mongo";

const fetchCategoriesId = async (req: Request, res: Response) => {
    try {
      const ids: string[] | [] = await getCategoriesId();
      console.log("mobile");
      return res.status(200).json(ids);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  };
  const createItem = async (req: Request, res: Response) => {
    try {
        const data: ItemType = req.body;
        const item:ItemType | null = await addItem(data);
        console.log("hi there");
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
          }
        return res.status(201).json(item);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  };
  const createCategory = async (req: Request, res: Response) => {
    try {
        const data: CategoryType = req.body;
        const category:CategoryType | null = await addCategory(data);
        console.log("hi there");
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
          }
        return res.status(201).json(category);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  };

  const fetchItemsIdForCategory = async (req: Request, res: Response) => {
    try {
        const categoryIds: string[] = await getCategoriesId();
        const result = [];
        for (const categoryId of categoryIds) {
            const itemIds = await getItemsId(categoryId);
            result.push({
                categoryId,
                itemIds
            });
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: `${err}` });
    }
};
  
 

  export {fetchCategoriesId,createItem,createCategory,fetchItemsIdForCategory};
