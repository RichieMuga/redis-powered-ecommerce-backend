import { Router } from 'express';
import { getUserDetails } from '../controllers/user.controller';

const router = Router();

router.get('/users/:userId', getUserDetails);

export default router;
