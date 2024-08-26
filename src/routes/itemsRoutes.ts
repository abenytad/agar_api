import { Router } from "express";
import { fetchCategoriesId,createCategory,createItem,fetchItemsIdForCategory,fetchItem,deleteCategory,deleteItem } from "../controllers/items.controller";
const itemsRouter: Router = Router();

itemsRouter.get('/category/ids',fetchCategoriesId);
itemsRouter.post('/category',createCategory);
itemsRouter.post('',createItem);
itemsRouter.get('/ids/:categoryId',fetchItemsIdForCategory);
itemsRouter.get('/:itemId',fetchItem);
itemsRouter.delete('/:cateegoryId',deleteItem);
itemsRouter.get('/category/:categoryId',deleteCategory);


export default itemsRouter;