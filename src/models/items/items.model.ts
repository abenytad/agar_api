import Category, {CategoryType} from "./category.mongo";
import { Types } from "mongoose";
import Item, {ItemType} from "./item.mongo";
const getCategoriesId = async (): Promise<string[]|[]> => {
    const catIds = await Category.find({}, { _id: 1 }).lean();
    return catIds.map((category) => category._id.toString()); // _id is now a string
  };

  const addCategory=async(catData:CategoryType):Promise<CategoryType | null>=>{
    return await Category.create(catData);
  }
  const addItem=async(item:ItemType):Promise<ItemType | null>=>{
    return await Item.create(item);
  }

  const getItemsId = async (categoryId:string): Promise<string[]|[]> => {
    const objectId = new Types.ObjectId(categoryId);
    const items = await Item.find({ categoryId }).select('_id').lean().exec();
    return items.map((item) => item._id.toString()); 
  };
  const getCategoryDetails = async (categoryId:string): Promise<CategoryType | null> => {
     return await Category.findById(categoryId).lean();
  };



  export {getCategoriesId,addCategory,addItem,getItemsId,getCategoryDetails};