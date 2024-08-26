import { Router } from "express";
import { createAdmin } from "../controllers/admin.controller";
const adminRouter: Router = Router();
adminRouter.post('/category',createAdmin);
export default adminRouter;