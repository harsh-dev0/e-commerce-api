import { Request, Response, NextFunction } from 'express';

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (basic)
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s-]{10,14}$/;
  return phoneRegex.test(phone);
};

// Middleware for email validation
export const validateEmailMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  next();
};

// Middleware for phone number validation
export const validatePhoneMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { phoneNumber } = req.body;
  if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }
  next();
};

// Validation helper for required fields
export const validateRequiredFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }
    next();
  };
};