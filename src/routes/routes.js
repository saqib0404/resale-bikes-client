import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Blogs from "../pages/Blogs/Blogs";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUp from "../pages/SignUp/SignUp";

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
        ]
    },
    {
        path: '*',
        element: <NotFoundPage></NotFoundPage>
    }
]) 