// front-end/src/App.jsx
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {AuthProvider, useAuth} from './contexts/AuthContext';
import {CartProvider} from './contexts/CartContext';
import Layout from './components/common/Layout';
import PrivateRoute from './components/common/PrivateRoute';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OAuthSuccess from './components/auth/OAuthSuccess';

// Public Pages
import HomePage from './pages/public/HomePage.jsx';
import ShoppingPage from './pages/public/ShoppingPage';
import ShoppingItemDetails from './pages/public/ShoppingItemDetails';
import AboutPage from './pages/public/AboutPage';
import LocationsPage from './pages/public/LocationsPage';
import ContactPage from './pages/public/ContactPage';

// Customer Pages

import OrdersPage from './pages/customer/OrdersPage';
import CartPage from './pages/customer/CartPage';
import OrderDetails from './pages/customer/OrderDetails';




// Admin Pages
import AdminLayout from './components/layout/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import ShoppingManagement from './pages/admin/ShoppingManagement';
import {
    Analytics,
    StoreManagement,
    PromotionsPage,
    AdminSettings
} from './pages/admin/DummyComponents';
import ShoppingForm from './pages/admin/ShoppingForm';
import StaffManagement from './pages/admin/StaffManagement';
import OrderManagement from './pages/admin/OrderManagement';


import PageNotFound from './pages/PageNotFound.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Role-based Route Protection Component
const RoleRoute = ({children, allowedRoles}) => {
    const {user} = useAuth();

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace/>;
    }

    return children;
};

function App() {
    return (
        <Router>
            <ScrollToTop/>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        {/* Auth routes - no layout */}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/auth/success" element={<OAuthSuccess/>}/>

                        {/* Routes with layout */}
                        <Route element={<Layout/>}>
                            {/* Public routes */}
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/shopping" element={<ShoppingPage/>}/>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/locations" element={<LocationsPage/>}/>
                            <Route path="/contact" element={<ContactPage/>}/>
                            <Route path="/shopping/:id" element={<ShoppingItemDetails/>}/>

                        
                            <Route
                                path="/orders"
                                element={
                                    <PrivateRoute>
                                        <OrdersPage/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/orders/:id"
                                element={
                                    <PrivateRoute>
                                        <OrderDetails/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/cart"
                                element={
                                    <PrivateRoute>
                                        <CartPage/>
                                    </PrivateRoute>
                                }
                            />
                           
                            {/* Admin routes with nested structure */}
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute>
                                        <RoleRoute allowedRoles={['admin']}>
                                            <AdminLayout/>
                                        </RoleRoute>
                                    </PrivateRoute>
                                }
                            >
                                {/* Redirect /admin to /admin/dashboard */}
                                <Route index element={<Navigate to="/admin/dashboard" replace/>}/>
                                <Route path="dashboard" element={<AdminOverview/>}/>
                                <Route path="shopping" element={<ShoppingManagement/>}/>
                                <Route path="shopping/new" element={<ShoppingForm/>}/>
                                <Route path="shopping/edit/:id" element={<ShoppingForm/>}/>
                                <Route path="orders" element={<OrderManagement/>}/>
                                <Route path="staff" element={<StaffManagement/>}/>
                                <Route path="analytics" element={<Analytics/>}/>
                                <Route path="promotions" element={<PromotionsPage/>}/>
                                <Route path="stores" element={<StoreManagement/>}/>
                                <Route path="settings" element={<AdminSettings/>}/>
                            </Route>
                        </Route>

                        {/* Catch all - redirect to home */}
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>

                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                style: {
                                    background: '#4ade80',
                                },
                            },
                            error: {
                                style: {
                                    background: '#ef4444',
                                },
                            },
                        }}
                    />
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;