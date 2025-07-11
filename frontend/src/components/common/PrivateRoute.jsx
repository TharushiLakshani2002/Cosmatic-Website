//front-end/src/common/PrivateRoute.jsx
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';

const PrivateRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0fb8a1]"></div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;