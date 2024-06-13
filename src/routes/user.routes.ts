import { Router } from 'express';
import { getUserDetails, deleteUser, addUser, updateUser } from '../controllers/user.controller';

const router = Router();

router.get('/users/:userId', getUserDetails);
router.delete('/users/:userId', deleteUser);
router.patch('/users/:userId', updateUser);
router.post('/users', addUser);

export default router;
