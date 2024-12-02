import express, { Request, Response } from 'express';
import { 
  createUser, 
  updateUser, 
  getUser 
} from '../controllers/user.controller';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  await createUser(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
  await updateUser(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  await getUser(req, res);
});

export default router;