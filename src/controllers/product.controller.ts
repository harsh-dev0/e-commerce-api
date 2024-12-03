import { Request, Response } from 'express';
import { Product } from '../models/product.model';

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, price, stockQuantity } = req.body;
    const product = new Product({ name, category, price, stockQuantity });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error creating product',
    });
  }
};

// Update an existing product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price, stockQuantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, category, price, stockQuantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error updating product',
    });
  }
};

// Get a single product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error fetching product',
    });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error fetching products',
    });
  }
};

// Get total stock quantity
export const getTotalStockQuantity = async (req: Request, res: Response) => {
  try {
    // Aggregation to calculate total stock quantity
    const totalStock = await Product.aggregate([
      {
        $group: {
          _id: null,  // Group by null to get the sum for all documents
          totalStock: { $sum: '$stockQuantity' },  // Sum stockQuantity of all products
        },
      },
    ]);

    // If the aggregation result exists, return total stock quantity
    if (totalStock.length > 0) {
      res.json({ totalStockQuantity: totalStock[0].totalStock });
    } else {
      res.json({ totalStockQuantity: 0 });  // Return 0 if no products exist
    }
  } catch (error) {
    // Handle error if something goes wrong
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error calculating total stock',
    });
  }
};


