import User, { UserType } from './user.mongo';

const addUser = async (userData: Partial<UserType>): Promise<Partial<UserType>> => {
    try {
        const user = new User(userData);
        const savedUser = await user.save();
        const { name, phoneNumber, _id } = savedUser;
        return { name, phoneNumber, _id };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating user: ${error.message}`);
        } else {
            throw new Error('Unknown error occurred while creating user');
        }
    }
};
const getUser = async (userId: string): Promise<UserType | null> => {
    try {
        return await User.findById(userId, {
            _id: 1,
            name: 1,
            phoneNumber: 1,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error fetching user: ${error.message}`);
        } else {
            throw new Error('Unknown error occurred while fetching user');
        }
    }
};

const getUserByPhoneNumber = async (
    phoneNumber: string,
    userId?: string
): Promise<boolean> => {
    try {
        const existingUser = await User.findOne({ phoneNumber }).lean();
        return !(existingUser && existingUser._id.toString() !== userId);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error checking phone number: ${error.message}`);
        } else {
            throw new Error('Unknown error occurred while checking phone number');
        }
    }
};

const removeUser = async (userId: string): Promise<UserType | null> => {
    try {
        return await User.findByIdAndDelete(userId).lean();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting user: ${error.message}`);
        } else {
            throw new Error('Unknown error occurred while deleting user');
        }
    }
};

export { addUser, getUser, getUserByPhoneNumber, removeUser };
