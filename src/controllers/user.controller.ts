import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const user = new User({ name, email, phoneNumber });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Error creating user' 
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body;
    const user = await User.findByIdAndUpdate(
      id, 
      { name, email, phoneNumber }, 
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Error updating user' 
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Error fetching user' 
    });
  }
};