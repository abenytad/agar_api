import { Request,Response } from "express";
import { addAdmin } from "../models/admins/admin.model";
import { AdminType } from "../models/admins/admin.mongo";
const createAdmin= async (req: Request, res: Response) => {
    try {
      const data=req.body;
      const admin=await addAdmin(data);
      return res.status(201).json(admin);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  };

  export {createAdmin};