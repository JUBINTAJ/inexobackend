import express from 'express';
import authenticate from '../middlewares/authmiddleare.js';
import {  getUserComplaint, updateUserComplaint } from '../controller/complintsuser.js';

const router = express.Router();

router.get('/complaints', authenticate, getUserComplaint);
router.put('/complaints/:id', authenticate, updateUserComplaint);

export default router;
