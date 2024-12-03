import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

export const createOrder = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { user, product, quantity } = req.body;

    // Check product availability (Approach 1: Transactional stock update)
    const productDoc = await Product.findById(product).session(session);
    if (!productDoc) {
      throw new Error('Product not found');
    }

    if (productDoc.stockQuantity < quantity) {
      throw new Error('Insufficient stock');
    }

    // Reduce stock quantity
    productDoc.stockQuantity -= quantity;
    await productDoc.save({ session });

    // Create order
    const order = new Order({ user, product, quantity });
    await order.save({ session });

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error creating order' });
  } finally {
    session.endSession();
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const order = await Order.findByIdAndUpdate(
      id, 
      { quantity }, 
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error updating order' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user').populate('product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error fetching order' });
  }
};

export const getRecentOrders = async (req: Request, res: Response) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orders = await Order.find({
      orderDate: { $gte: sevenDaysAgo }
    }).populate('user').populate('product');

    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error fetching recent orders' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate('product');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error fetching user orders' });
  }
};

export const getUsersByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const orders = await Order.find({ product: productId }).populate('user');
    const users = orders.map(order => order.user);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error fetching users by product' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('user').populate('product');
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }
    
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error fetching all orders' });
  }
};
