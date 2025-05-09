import Complaint from "../model/compleintmodel.js";
import CustomError from '../utils/customeror.js';

export const getComplaintsByUser = async (userId, status) => {
  let query = { assignedTo: userId };
  if (status) query.status = status;
  return await Complaint.find(query).populate('assignedTo', 'user email');
};

export const getComplaintByUser = async (userId, complaintId) => {
  return await Complaint.find({ assignedTo: userId })
};

export const updateComplaintByUser = async (userId, complaintId, data) => {
  console.log(userId,complaintId)
  const complaint = await Complaint.findOne({ _id: complaintId, assignedTo: userId });
  
  if (!complaint) throw new CustomError("Complaint not found or not assigned to you", 404);

  return await Complaint.findByIdAndUpdate(complaintId, data, { new: true });
};

export const getComplaintCounts = async (userId) => {
  const pendingCount = await Complaint.countDocuments({ assignedTo: userId, status: 'pending' });
  const closedCount = await Complaint.countDocuments({ assignedTo: userId, status: 'closed' });
  const escalatedCount = await Complaint.countDocuments({ assignedTo: userId, status: 'escalated' });

  return {
    pendingCount,
    closedCount,
    escalatedCount
  };
};
