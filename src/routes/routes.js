import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import Blogs from "../pages/Blogs/Blogs";
import AllBuyers from "../pages/Dashboard/Admin/AllBuyers/AllBuyers";
import AllSellers from "../pages/Dashboard/Admin/AllSellers/AllSellers";
import ResportToAdmin from "../pages/Dashboard/Admin/ResportToAdmin/ResportToAdmin";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import Payments from "../pages/Dashboard/Payments/Payments";
import AddProduct from "../pages/Dashboard/Seller/AddProduct/AddProduct";
import MyProducts from "../pages/Dashboard/Seller/MyProducts/MyProducts";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Products from "../pages/Products/Products";
import SignUp from "../pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`https://resell-bikes-server.vercel.app/category/${params.id}`),
                element: <PrivateRoute><Products></Products></PrivateRoute>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyBookings></MyBookings>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoute><ResportToAdmin></ResportToAdmin></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`https://resell-bikes-server.vercel.app/bookings/${params.id}`),
                element: <Payments></Payments>
            },
        ]
    },
    {
        path: '*',
        element: <NotFoundPage></NotFoundPage>
    }
]) 