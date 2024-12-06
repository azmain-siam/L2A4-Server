# **Stationery Store Management API**

A backend application designed to manage stationery store operations efficiently. The system provides features for managing products, processing orders, and tracking revenue, ensuring a seamless experience for administrators and developers.

---

## 🌟 **Features**

### **Product Management**
- Add, update, delete, and retrieve products from the inventory.
- Track product stock and automatically validate inventory during order creation.

### **Order Management**
- Place new orders while ensuring sufficient stock is available.
- Automatically adjust product stock levels upon successful order placement.

### **Revenue Tracking**
- Calculate total revenue from all completed orders.
- Retrieve revenue details through a dedicated endpoint.

### **Validation**
- Built-in validation for product and order data using Mongoose schemas, ensuring data integrity.

### **Error Handling**
- Comprehensive error handling to capture and log issues during API operations.

### **Modular Architecture**
- Clean separation of concerns with well-structured modules for products and orders.

---

## 🛠️ **Technologies Used**

### **Core Technologies**
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ORM

### **Development Tools**
- **Linting and Formatting**: Prettier, ESLint
- **Environment Management**: dotenv

### **Deployment**
- Easily deployable to platforms like Vercel, Heroku, or AWS.

---

## 🚀 **Getting Started**

Follow these steps to set up the project locally:

### **Prerequisites**
- **Node.js**: Ensure Node.js is installed on your system.
- **npm**: Comes with Node.js, or install it separately.
- **MongoDB**: Set up a local MongoDB instance or use a cloud-based service like MongoDB Atlas.

### **Setup Instructions**
1. **Clone the Repository**
   Start by cloning the repository to your local machine.
   ```bash
   git clone https://github.com/azmain-siam/L2-A2.git
   ```

3. **Install Dependencies**
   Use npm to install all required dependencies.
   ```bash
   npm install
   ```

5. **Configure Environment Variables**
   Create a `.env` file in the root directory and define the necessary environment variables, including database connection strings and port numbers.

6. **Start the Development Server**
   Launch the server in development mode to test the API locally.
   ```bash
   npm run dev
   ```

---

## 📚 **Project Structure**

The project is organized into the following structure:

### **Config**
Contains environment and configuration files for the application.

### **Modules**
Includes separate directories for managing `products` and `orders`, with controllers, services, models, and routes defined for each.

### **Root Files**
- **`app.ts`**: Initializes the Express app and middleware.
- **`server.ts`**: Entry point for starting the server.

---

## 🤝 **Contributing**

Contributions are welcome! If you want to add new features or fix issues:
1. Fork the repository.
2. Create a new feature branch.
3. Commit and push your changes.
4. Submit a pull request for review.
