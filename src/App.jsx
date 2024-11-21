import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/'; // Ensure usage in components
import Home from './components/Home/Home';
import Layout from './components/Home/Layout/Layout';
import Cart from './components/Home/Cart/Cart';
import Products from './components/Home/Products/Products';
import Categories from './components/Home/Categories/Categories';
import Login from './components/Home/Login/Login';
import Register from './components/Home/Register/Register';
import Notfound from './components/Home/Notfound/Notfound';
import Brands from './components/Home/Brands/Brands';
// import CounterContextProvider from './context/CounterContext';
import UserContextProvider from './context/UserContext';
import ProtectedRoute from './components/Home/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let routers = createBrowserRouter([
  {
    path: '/', // '/' is more explicit for the root path
    element: <Layout />,
    children: [
      { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'home/productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> }, 
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> }, // 404 handling
    ]
  }
]);


let query = new QueryClient();
function App() {
  return (
      <QueryClientProvider client={query}>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster/>
        </UserContextProvider>
      </CartContextProvider>
      </QueryClientProvider>
  );
}

export default App;
