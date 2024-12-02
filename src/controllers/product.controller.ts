import { Request, Response } from 'express';
import { Product } from '../models/product.model';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, price, stockQuantity } = req.body;
    const product = new Product({ name, category, price, stockQuantity });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error creating product' });
  }
};

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
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error updating product' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error fetching product' });
  }
};

export const getTotalStockQuantity = async (req: Request, res: Response) => {
  try {
    const totalStock = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: '$stockQuantity' } } }
    ]);
    
    res.json({ totalStockQuantity: totalStock[0]?.totalStock || 0 });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error calculating total stock' });
  }
};