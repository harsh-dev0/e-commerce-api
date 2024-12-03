import express from 'express';
import { 
  createOrder, 
  updateOrder, 
  getOrder,
  getRecentOrders,
  getUserOrders,
  getUsersByProduct, 
  getAllOrders
} from '../controllers/order.controller';
import { 
  validateRequiredFields 
} from '../utils/validation';

const router = express.Router();

router.post('/', 
  validateRequiredFields(['user', 'product', 'quantity']),
  async (req, res) => await createOrder(req, res)
);
router.get('/', async (req, res) => await getAllOrders(req, res));
router.get('/recent', async (req, res) => await getRecentOrders(req, res));
router.put('/:id', async (req, res) => await updateOrder(req, res));
router.get('/:id', async (req, res) => await getOrder(req, res));
router.get('/user/:userId', async (req, res) => await getUserOrders(req, res));
router.get('/product/:productId/users', async (req, res) => await getUsersByProduct(req, res));

export default router;