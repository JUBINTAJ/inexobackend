import asyncHandler from "../middlewares/asynchandler.js";
import * as complaintService from "../service/usercomplints.js";
import { STATUS } from "../utils/constand.js";

export const getUserComplaints = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const userId = req.user._id;
  const complaints = await complaintService.getComplaintsByUser(userId, status);
  const counts = await complaintService.getComplaintCounts(userId);
  
  res.json({
    status: STATUS.SUCCESS,
    complaints,
    counts
  });
});

export const getUserComplaint = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const complaint = await complaintService.getComplaintByUser(userId);
  
  if (!complaint) {
    return res.status(404).json({ message: 'Complaint not found' });
  }
  
  res.json({
    status: STATUS.SUCCESS,
    complaint
  });
});

export const updateUserComplaint = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const updatedComplaint = await complaintService.updateComplaintByUser(userId, req.params.id, req.body);
  
  res.json({
    status: STATUS.SUCCESS,
    message: "Complaint updated successfully",
    complaint: updatedComplaint
  });
});
