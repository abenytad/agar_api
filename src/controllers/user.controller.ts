import { Request,Response } from "express";
import { addUser,getUser,getUserByPhoneNumber,removeUser } from "../models/users/user.model";
import { UserType } from "../models/users/user.mongo";

const createUser=async (req:Request,res:Response)=>{
try{
  const data:UserType=req.body;
  const user=await addUser(data);
  return res.status(201).json(user);
} catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
}

const fetchUser=async (req:Request,res:Response)=>{
    try{
    const {userId}:{userId?:string}=req.params;
    const user:UserType | null=await getUser(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    return res.status(200).json(user);
    }catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
}

const editProfile=async(req:Request,res:Response)=>{
    try{
        const { userId }: { userId?: string } = req.params;
        const { name, phoneNumber }: { name?: string; phoneNumber?: string } = req.body;
        if (!userId) {
          return res.status(400).json({ error: "User ID is required" });
        }
        if (!name && phoneNumber === undefined) {
          return res.status(400).json({
            error: "At least one field (name or phoneNumber) is required to update",
          });
        }
        const user = await getUser(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        if (name) {
          user.name = name;
        }
        if (phoneNumber !== undefined) {
          const isPhoneNumberAvailable = await getUserByPhoneNumber(phoneNumber, userId);
          if (!isPhoneNumberAvailable) {
            return res.status(400).json({ error: "Phone number already in use" });
          }
          user.phoneNumber = phoneNumber;
        }
      console.log(name);
      console.log(phoneNumber);
        await user.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(404).json({ error: `${err}` });
      }
}

const deleteUser=async(req:Request,res:Response)=>{
    // by the admin
    try{
        const { userId }: { userId?: string } = req.params;
            const user:UserType | null=await removeUser(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(404).json({ error: `${err}` });
      }
}

export {createUser,editProfile,fetchUser,deleteUser};