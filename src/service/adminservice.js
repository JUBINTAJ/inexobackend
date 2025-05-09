import User from "../model/usermodel.js";
import Complaint from "../model/compleintmodel.js";
import CustomError from '../utils/customeror.js';

export const getAllUserServices = async (limit, skip) => {
  const usersList = await User.find({ role: { $ne: "admin" } }).skip(skip).limit(limit);
  const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });
  return { usersList, totalUsers };
};

export const singleUserService = async (id) => {
  const users = await User.findById(id);
  if (!users) throw new CustomError("user not found", 400);
  return users;
};

export const getAllComplaints = async () => {
  return await Complaint.find().populate('assignedTo', 'user email');
};

export const getComplaintById = async (id) => {
  return await Complaint.find({assignedTo:id})
};

export const updateComplaint = async (id,complaintId, data) => {
  return await Complaint.findByIdAndUpdate({_id:complaintId,assignedTo:id}, data, { new: true });
};

export const assignComplaintToEmployee = async (employeeId, title,description) => {

   const complaint=await Complaint.create({assignedTo:employeeId,title,description});
   return {complaint}
};
