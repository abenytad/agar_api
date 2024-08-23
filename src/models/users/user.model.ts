import User, {UserType} from "./user.mongo";

const addUser=async(userData:UserType):Promise<UserType>=>{
    return await User.create(userData);
}
const getUser = async (userId: string): Promise<UserType | null> => {
    return await User.findById(userId,{
        _id: 1,
        name: 1,
       phoneNumber:1,
       orders:1
      });
  };
  const getUserByPhoneNumber = async (
    phoneNumber: string,
    userId: string
  ): Promise<boolean> => {
    const existingUser: UserType | null = await User.findOne({ phoneNumber }).exec();
    if (existingUser && existingUser._id.toString() !== userId) {
      return false;
    }
    return true;
  };
  const removeUser=async (id:string):Promise<UserType |null>=>{
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  export {addUser,getUser,getUserByPhoneNumber,removeUser};