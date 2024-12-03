import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: { 
    type: String, 
    required: true,
    trim: true
  }
}, { 
  timestamps: true 
});


userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);