# FashionHunt (Cosmatic-Website)

FashionHunt is a modern, web-based **e-commerce application** designed to provide customers with a seamless online shopping experience for clothing and accessories. The platform also allows administrators to efficiently manage products, categories, and user accounts.

Built with cutting-edge JavaScript technologies, **FashionHunt ensures scalability, security, and a smooth user experience.**

---

##  Tech Stack

* **Frontend** – React.js
* **Backend** – Node.js + Express.js
* **Database** – MongoDB

---

##  Features
#Authentication & Security

Email/Password Registration with verification
Google OAuth Login
Auth0 OIDC Integration
JWT-based authentication
Password reset functionality
Remember Me sessions
HTTPS/SSL support

* **Product Browsing** – Customers can view collections and product details.
* **User Authentication** – Secure login & registration with JWT (Auth0 + OIDC).
* **Shopping Cart & Checkout** – Add products, manage cart, and proceed to checkout.
* **Role-Based Access Control** – Admins manage products, categories, and orders.
* **Responsive UI** – Mobile-friendly design for a smooth shopping experience.

---

##  Project Structure

```
/ (root)
 ├── BackEnd/      – Backend source code (APIs, database models, authentication)
 ├── FrontEnd/     – Frontend source code (React components, hooks, UI)
```

---

##  Setup & Installation

###  Prerequisites

* Node.js (v14+ recommended)
* npm
* MongoDB (local or cloud e.g., MongoDB Atlas)

###  Steps

```bash
# Clone the repository
git clone https://github.com/TharushiLakshani2002/Cosmatic-Website
cd Cosmatic-Website

# Install dependencies
cd BackEnd
npm install

cd ../FrontEnd
npm install
```

---

##  Scripts & Usage

### Backend

```bash
cd BackEnd
npm start   # Start backend server (API)
```

### Frontend

```bash
cd FrontEnd
npm start   # Start development server
npm run build   # Build optimized production assets
```

---

##  Configuration

Create a **.env** file in both `BackEnd` and `FrontEnd` directories.

Example configuration:

```env
# API
VITE_API_URL=https://localhost:3001/api

# OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id

VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id

# Server
PORT=3001
NODE_ENV=development

# URLs
CLIENT_URL=https://localhost:5173
SERVER_URL=https://localhost:3001

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/FashionHunt

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d
SESSION_SECRET=your_session_secret_key_here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Auth0 Credentials
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_DOMAIN=your_auth0_domain

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

5. Database Setup
Option A: Local MongoDB

# Install MongoDB locally and start the service
mongod --dbpath /path/to/your/data/directory
Option B: MongoDB Atlas (Recommended)

Create account at MongoDB Atlas
Create a new cluster
Get connection string and update MONGODB_URI in backend .env
6. OAuth Setup
Google OAuth:

Go to Google Cloud Console
Create a new project or select existing
Enable Google+ API
Create OAuth 2.0 credentials
Add authorized origins: https://localhost:5173
Add authorized redirect URIs: https://localhost:3001/api/auth/google/callback
Auth0 Setup:

Create account at Auth0
Create a new application (Regular Web Application)
Configure callback URLs: https://localhost:3001/api/auth/auth0/callback
Configure logout URLs: https://localhost:5173
Copy Domain, Client ID, and Client Secret

##  Links

*  **GitHub Repository**: [Cosmatic-Website](https://github.com/TharushiLakshani2002/Cosmatic-Website)
*  **Developer Profile**: [TharushiLakshani2002](https://github.com/TharushiLakshani2002)

---

##  Contact

For questions, feedback, or contributions, feel free to reach out:
 [GitHub – TharushiLakshani2002](https://github.com/TharushiLakshani2002)

