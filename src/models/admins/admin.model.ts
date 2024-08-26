import Admin, { AdminType } from "./admin.mongo";

const addAdmin = async (adminData: Omit<AdminType, '_id'>): Promise<AdminType> => {
  try {
    const admin = await Admin.create(adminData);
    return admin;
  } catch (error) {
    console.error('Error adding admin:', error);
    throw new Error('Error adding admin');
  }
};

export { addAdmin };
