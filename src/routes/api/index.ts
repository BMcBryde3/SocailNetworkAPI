import { Router } from 'express';
const router = Router();
import thoughtsRoutes from './thoughtsRoutes.js'
import userRoutes from './userRoutes.js'

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

export default router;
