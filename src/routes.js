import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Orders from './pages/Orders';
import Category from './pages/Categories';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import EditOrder from './pages/EditOrder';
import EditCategory from './pages/EditCategory';

// ----------------------------------------------------------------------
export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'categories', element: <Category /> },
        { path: 'orders', element: <Orders /> },
        { path: 'blog', element: <Blog /> },
        { path: 'add-product', element: <AddProduct /> },
        { path: 'products/:id', element: <EditProduct /> },
        { path: 'edit/:id', element: <EditOrder /> },
        { path: 'edit-category/:id', element: <EditCategory /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
