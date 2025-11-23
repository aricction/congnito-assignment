# E-Commerce Full Stack Application

A modern full-stack e-commerce application built with Next.js (React) and NestJS, featuring user authentication, product management, shopping cart, and order processing.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16.0.3 (React 19.2.0)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5.0.8
- **UI Components**: Radix UI, Heroicons
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod validation

### Backend
- **Framework**: NestJS 11.0.1
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Email Service**: SendGrid
- **Password Hashing**: bcrypt

## 📁 Project Structure

```
congnito-assignment/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   │   ├── auth/        # Authentication pages
│   │   │   ├── checkout/    # Checkout page
│   │   │   ├── products/    # Product pages
│   │   │   └── components/  # Page components
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Utilities and API clients
│   │   └── store/           # Zustand state stores
│   └── public/              # Static assets
│
└── backend/                 # NestJS backend application
    ├── src/
    │   ├── modules/        # Feature modules
    │   │   ├── auth/        # Authentication module
    │   │   ├── products/    # Products module
    │   │   └── orders/      # Orders module
    │   ├── email-alerts/    # Email service
    │   ├── common/          # Shared utilities
    │   └── prisma/          # Prisma service
    └── prisma/
        └── schema.prisma    # Database schema
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)
- **SendGrid** account (for email functionality)

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd congnito-assignment
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

## ⚙️ Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/congnito-db"
# Or for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/congnito-db?retryWrites=true&w=majority"

# Server
PORT=4000

# SendGrid Email Service
SENDGRID_API_KEY="your-sendgrid-api-key"
EMAIL_USER="your-verified-sender-email@example.com"

# JWT (if using JWT authentication)
JWT_SECRET="your-jwt-secret-key"
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# API Base URL
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
# For production, use your backend URL:
# NEXT_PUBLIC_API_BASE_URL="https://your-backend-url.com"
```

## 🗄️ Database Setup

### 1. Configure Prisma

The project uses Prisma ORM with MongoDB. The schema is already defined in `backend/prisma/schema.prisma`.

### 2. Generate Prisma Client

```bash
cd backend
npx prisma generate
```

### 3. (Optional) Push Schema to Database

If you want to sync your schema with the database:

```bash
npx prisma db push
```

**Note**: For MongoDB, Prisma doesn't support migrations. Use `db push` to sync your schema.

## 🚀 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run start:dev
```

The backend server will run on `http://localhost:4000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### Production Build

#### Build Backend

```bash
cd backend
npm run build
npm run start:prod
```

#### Build Frontend

```bash
cd frontend
npm run build
npm start
```

## 📡 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/send-otp` - Send OTP to email
  ```json
  {
    "email": "john@example.com"
  }
  ```

- `POST /auth/verify-otp` - Verify OTP
  ```json
  {
    "email": "john@example.com",
    "otp": "123456"
  }
  ```

### Orders

- `POST /order/place` - Place a new order
  ```json
  {
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "postCode": "10001",
    "country": "USA",
    "regionState": "NY",
    "cartItems": [...],
    "totalAmount": 99.99,
    "deliveryMethod": "Free Shipping - $0.00",
    "paymentMethod": "Cash on Delivery"
  }
  ```

### Products

- Products are currently loaded from JSON files in the frontend
- Product endpoints can be added in the `ProductsModule`

## 🎯 Features

### Implemented Features

- ✅ User Registration and Login
- ✅ OTP-based Email Verification
- ✅ Product Catalog Display
- ✅ Shopping Cart Management
- ✅ Checkout Process
- ✅ Order Placement
- ✅ Responsive UI Design
- ✅ State Management with Zustand
- ✅ Email Notifications (SendGrid)

### Frontend Features

- Product listing and details
- Shopping cart with add/remove items
- User authentication flow
- OTP verification for checkout
- Order placement with billing details
- Responsive design with Tailwind CSS

### Backend Features

- RESTful API with NestJS
- MongoDB database with Prisma ORM
- User authentication and authorization
- OTP generation and verification
- Email service integration
- Order management

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test          # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Run tests with coverage
npm run test:e2e     # Run end-to-end tests
```

## 🐛 Troubleshooting

### Common Issues

1. **Prisma Client not generated**
   ```bash
   cd backend
   npx prisma generate
   ```

2. **Database connection issues**
   - Verify your `DATABASE_URL` in `.env`
   - Ensure MongoDB is running (if using local instance)
   - Check MongoDB Atlas connection string (if using cloud)

3. **SendGrid email not working**
   - Verify `SENDGRID_API_KEY` is correct
   - Ensure `EMAIL_USER` is a verified sender in SendGrid
   - Check SendGrid account limits

4. **CORS errors**
   - Update CORS origins in `backend/src/main.ts` to include your frontend URL

5. **Port already in use**
   - Change `PORT` in backend `.env` file
   - Update `NEXT_PUBLIC_API_BASE_URL` in frontend `.env.local`

## 📝 Scripts Reference

### Backend Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run generate` - Generate Prisma client
- `npm run lint` - Run ESLint

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Considerations

- Passwords are hashed using bcrypt
- Environment variables are used for sensitive data
- CORS is configured for specific origins
- Input validation using class-validator DTOs


## 👥 Contributing

This is a private project. Please follow the existing code style and patterns when making changes.



---

**Note**: Make sure to set up all environment variables before running the application. The application requires MongoDB and SendGrid to function properly.

**Note**: Check on spam folder for OTP and Order details.

