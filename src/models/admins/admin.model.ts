import Admin,{AdminType} from "./admin.mongo";
const addAdmin=async(adminData:AdminType):Promise<AdminType>=>{
    return await Admin.create(adminData);
}

export {addAdmin};