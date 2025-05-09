import express from 'express';
import isAdmin from '../middlewares/isAdmin.js';
import authenticate from '../middlewares/authmiddleare.js';
import { createValidator } from 'express-joi-validation';
import { allUser,singleUser,userCount,getComplaint,editComplaint,assignComplaint } from '../controller/admincontroller.js';

const router = express.Router();
const validator = createValidator({ passError: true });

router.get('/allusers', authenticate, isAdmin, allUser);
router.get('/singleuser/:id', authenticate, isAdmin, singleUser);
router.get('/usersCount', authenticate, isAdmin, userCount);

router.get('/complaints/:id', authenticate, isAdmin, getComplaint);
router.put('/complaints/:id', authenticate, isAdmin, editComplaint);
router.put('/complaints/:id/assign', authenticate, isAdmin, assignComplaint);

export default router;
