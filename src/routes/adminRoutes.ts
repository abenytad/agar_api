import { Router } from "express";
import { createAdmin } from "../controllers/admin.controller";
const adminRouter: Router = Router();
adminRouter.post('',createAdmin);
export default adminRouter;