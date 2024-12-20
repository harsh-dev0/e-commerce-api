import express from 'express';
import { 
  createProduct, 
  updateProduct, 
  getProduct,
  getTotalStockQuantity, 
  getAllProducts
} from '../controllers/product.controller';
import { 
  validateRequiredFields 
} from '../utils/validation';

const router = express.Router();

router.post('/', 
  validateRequiredFields(['name', 'category', 'price', 'stockQuantity']),
  async (req, res) => await createProduct(req, res)
);
router.get('/total-stock', async (req, res) => await getTotalStockQuantity(req, res));


router.put('/:id', async (req, res) => await updateProduct(req, res));
router.get('/', async (req, res) => await getAllProducts(req, res));
router.get('/:id', async (req, res) => await getProduct(req, res));




export default router;