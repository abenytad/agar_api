import { Router } from "express";
import { fetchCategoriesId,createCategory,createItem,fetchItemsIdForCategory,fetchItem,deleteCategory,deleteItem ,getCategories,getCategoryWithItems} from "../controllers/items.controller";
const itemsRouter: Router = Router();

itemsRouter.get('/category/ids',fetchCategoriesId);
itemsRouter.post('/category',createCategory);
itemsRouter.post('',createItem);
itemsRouter.get('/ids/:categoryId',fetchItemsIdForCategory);
itemsRouter.get('/:itemId',fetchItem);
itemsRouter.delete('/:categoryId',deleteItem);
itemsRouter.delete('/category/:categoryId',deleteCategory);
itemsRouter.get('/categories',getCategories);
itemsRouter.get('/categoryItems/:categoryId',getCategories);


export default itemsRouter;