import asyncHandler from "../middlewares/asynchandler.js";
import * as complaintService from "../service/adminservice.js";
import { getAllUserServices, singleUserService,assignComplaintToEmployee,updateComplaint } from "../service/adminservice.js";
import { STATUS } from "../utils/constand.js";

export const allUser = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const pageInt = parseInt(page, 100) || 1;
  const limit = 100;
  const skip = (pageInt - 1) * limit;
  const { usersList, totalUsers } = await getAllUserServices(limit, skip);
  const message = usersList.length ? "User list" : "no user found";
  const totalPages = Math.ceil(totalUsers / limit);
  res.json({
    status: STATUS.SUCCESS,
    message,
    data: {
      users: usersList,
      totalUsers,
      totalPages,
      currentPage: pageInt
    }
  });
});

export const singleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await singleUserService(id);
  res.json({
    status: STATUS.SUCCESS,
    message: "user details...",
    user
  });
});

export const userCount = asyncHandler(async (req, res) => {
  const { totalUsers } = await getAllUserServices(10, 1);
  const message = totalUsers ? "User list" : "no users found";
  res.json({
    status: STATUS.SUCCESS,
    message,
    totalUsers
  });
});

export const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await complaintService.getAllComplaints();
  res.json({
    status: STATUS.SUCCESS,
    complaints
  });
});

export const getComplaint = asyncHandler(async (req, res) => {
  const complaint = await complaintService.getComplaintById(req.params.id);
  if (!complaint) return res.status(404).json({ message: 'Not found' });
  res.json({
    status: STATUS.SUCCESS,
    complaint
  });
});

export const editComplaint = asyncHandler(async (req, res) => {
  const {complaintId,...rest}=req.body;
  const updated = await updateComplaint(req.params.id, complaintId,rest);
  res.json({
    status: STATUS.SUCCESS,
    message: "Complaint updated",
    complaint: updated
  });
});

export const assignComplaint = asyncHandler(async (req, res) => {
  const {  title,description} = req.body;
  const {complaint} = await assignComplaintToEmployee(req.params.id, title,description);
  res.json({
    status: STATUS.SUCCESS,
    message: "Complaint assigned successfully",
    complaint: complaint
  });
});
