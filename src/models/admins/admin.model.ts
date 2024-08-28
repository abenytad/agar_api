import Admin, { AdminType } from "./admin.mongo";

const addAdmin = async (adminData: Omit<AdminType, '_id'>): Promise<Partial<AdminType>> => {
  try {
    const admin = await Admin.create(adminData);
    const { name, phoneNumber, _id } = admin;
    return { name, phoneNumber, _id };
  } catch (error) {
    console.error('Error adding admin:', error);
    throw new Error('Error adding admin');
  }
};
export { addAdmin };
