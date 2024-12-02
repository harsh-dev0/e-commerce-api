import express from 'express';
import { 
  createUser, 
  updateUser, 
  getUser 
} from '../controllers/user.controller';
import { 
  validateEmailMiddleware, 
  validatePhoneMiddleware,
  validateRequiredFields 
} from '../utils/validation';

const router = express.Router();

router.post('/', 
  validateRequiredFields(['name', 'email', 'phoneNumber']),
  validateEmailMiddleware,
  validatePhoneMiddleware,
  async (req, res) => await createUser(req, res)
);

router.put('/:id', 
  validateEmailMiddleware,
  validatePhoneMiddleware,
  async (req, res) => await updateUser(req, res)
);

router.get('/:id', async (req, res) => await getUser(req, res));

export default router;