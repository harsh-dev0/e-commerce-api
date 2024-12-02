import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  category: { 
    type: String, 
    required: true,
    trim: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  stockQuantity: { 
    type: Number, 
    required: true,
    min: 0 
  }
}, { 
  timestamps: true 
});

// Index for category and stock quantity
productSchema.index({ category: 1, stockQuantity: -1 });

export const Product = mongoose.model('Product', productSchema);