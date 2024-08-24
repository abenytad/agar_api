import { Router } from "express";
import { fetchCategoriesId,createCategory,createItem,fetchItemsIdForCategory,fetchItem } from "../controllers/items.controller";
const itemsRouter: Router = Router();

itemsRouter.get('/category/ids',fetchCategoriesId);
itemsRouter.post('/category',createCategory);
itemsRouter.post('',createItem);
itemsRouter.get('/ids/:categoryId',fetchItemsIdForCategory);
itemsRouter.get('/:itemId',fetchItem);


export default itemsRouter;