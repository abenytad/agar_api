import { Router } from "express";
import { createUser,editProfile,fetchUser,deleteUser } from "../controllers/user.controller";
const userRouter: Router = Router();

userRouter.get('/:userId',fetchUser);
userRouter.post('',createUser);
userRouter.put('/:userId',editProfile);
userRouter.delete('/:userId',deleteUser);


export default userRouter;
