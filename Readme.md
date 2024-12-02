# E-commerce API Server

## Overview

A TypeScript-based E-commerce API server using Express and MongoDB, supporting user, product, and order management.

## Features

- User management (Create, Update, Get)
- Product management (Create, Update, Get)
- Order tracking and management
- Stock quantity tracking
- Recent order retrieval
- User and product-based order queries

## Prerequisites

- Node.js (v14+)
- MongoDB
- npm

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file
   - Add `MONGODB_URI` for database connection

## Running the Application

- Development: `npm run dev`
- Production: `npm start`

## API Endpoints

### Users

- `POST /api/users`: Create user
- `PUT /api/users/:id`: Update user
- `GET /api/users/:id`: Get user details

### Products

- `POST /api/products`: Create product
- `PUT /api/products/:id`: Update product
- `GET /api/products/:id`: Get product details
- `GET /api/products/total-stock`: Get total stock quantity

### Orders

- `POST /api/orders`: Create order
- `PUT /api/orders/:id`: Update order
- `GET /api/orders/:id`: Get order details
- `GET /api/orders/recent`: Get orders from last 7 days
- `GET /api/orders/user/:userId`: Get user's orders
- `GET /api/orders/product/:productId/users`: Get users who bought a product

## Stock Update Approaches

1. **Transactional Update**:
   - Used in current implementation
   - Ensures atomic stock reduction during order creation
2. **Separate Stock Management**:
   - Alternative approach using events/background jobs

## License

MIT
