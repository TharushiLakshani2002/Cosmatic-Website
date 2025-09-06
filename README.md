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

## ⚙️ Setup & Installation

###  Prerequisites

* Node.js (v14+ recommended)
* npm
* MongoDB (local or cloud e.g., MongoDB Atlas)

### 🔧 Steps

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

# Server
PORT=3001
NODE_ENV=development

# URLs
CLIENT_URL=https://localhost:5173
SERVER_URL=https://localhost:3001

# Database
MONGODB_URI=mongodb+srv://TharushiLakshani:Tharushi2002@cluster0.amreb9q.mongodb.net/FashionHunt?retryWrites=true&w=majority&appName=Cluster0


# Google OAuth
GOOGLE_CLIENT_ID=42100961943-mlc738687nru6tdcidbki4m2ocdquqh9.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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



# Auth0 OAuth
AUTH0_DOMAIN=dev-l7301iel44kyc3d4.us.auth0.com
AUTH0_CLIENT_ID=R1MWAi1OB5ZVfabzDovzlYuWNhYkfWcA
AUTH0_CLIENT_SECRET=31NxjxGmBLYQ4_Jr-sj-jaFsg5WdYoYeX-nsOZxTtExo_gygAowk2_TokLmHdxgP

##  Links

*  **GitHub Repository**: [Cosmatic-Website](https://github.com/TharushiLakshani2002/Cosmatic-Website)
*  **Developer Profile**: [TharushiLakshani2002](https://github.com/TharushiLakshani2002)

---

##  Contact

For questions, feedback, or contributions, feel free to reach out:
 [GitHub – TharushiLakshani2002](https://github.com/TharushiLakshani2002)

