import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userControler = new UserController();
const router = Router();

router.post('/', userControler.create);

export default router;
