import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true,
    min: 1 
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

// Index for user and order date for faster queries
orderSchema.index({ user: 1, orderDate: -1 });

export const Order = mongoose.model('Order', orderSchema);