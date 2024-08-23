import Category, {CategoryType} from "./category.mongo";
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
    const itemIds = await Item.find({categoryId}, { _id: 1 }).lean();
    return itemIds.map((item) => item._id.toString()); // _id is now a string
  };



  export {getCategoriesId,addCategory,addItem,getItemsId};