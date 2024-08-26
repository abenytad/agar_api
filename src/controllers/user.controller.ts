import { Request, Response } from 'express';
import { addUser, getUser, getUserByPhoneNumber, removeUser } from '../models/users/user.model';
import { UserType } from '../models/users/user.mongo';

const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userData: Partial<UserType> = req.body;
        const user = await addUser(userData);
        return res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

const fetchUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId } = req.params;
        const user = await getUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
};

const editProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId } = req.params;
        const { name, phoneNumber }: { name?: string; phoneNumber?: string } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        if (!name && phoneNumber === undefined) {
            return res.status(400).json({
                error: 'At least one field (name or phoneNumber) is required to update',
            });
        }

        const user = await getUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (name) user.name = name;

        if (phoneNumber !== undefined) {
            const isPhoneNumberAvailable = await getUserByPhoneNumber(phoneNumber, userId);
            if (!isPhoneNumberAvailable) {
                return res.status(400).json({ error: 'Phone number already in use' });
            }
            user.phoneNumber = phoneNumber;
        }

        await user.save();
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error updating profile:', err);
        return res.status(500).json({ error: 'An error occurred while updating the profile' });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId } = req.params;
        const user = await removeUser(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};

export { createUser, editProfile, fetchUser, deleteUser };
