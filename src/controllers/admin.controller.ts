import { Request, Response } from "express";
import { addAdmin } from "../models/admins/admin.model";
import { AdminType } from "../models/admins/admin.mongo";

const createAdmin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const adminData: AdminType = req.body;
    if (!adminData.name || !adminData.phoneNumber || !adminData.password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const admin = await addAdmin(adminData);

    return res.status(201).json(admin);
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export { createAdmin };
