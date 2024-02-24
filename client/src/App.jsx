import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Posts from "./pages/posts/Posts";
import Post from "./pages/post/Post";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import MiddleMan from "./pages/middleMan/MiddleMan";
import Admin from "./pages/admin/Admin";
import Orders from "./pages/orders/Orders";
import User from "./pages/admin/user/User";
import AdminOrders from "./pages/admin/orders/AdminOrders";
import AdminPosts from "./pages/admin/posts/AdminPosts";
import Chat from "./pages/Chat/Chat";
//import Messages from "./pages/messages/Messages";
//import Message from "./pages/message/Message";
import MyPosts from "./pages/myPosts/MyPosts";
import Cara from "./pages/cara/Cara";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Profile from "./pages/profile/Profile";



function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cara",
          element: <Cara/>,
        },
        {
          path: "/middleman",
          element: <MiddleMan/>,
        },
        {
          path: "/posts",
          element: <Posts />,
        },
        {
          path: "/myPosts",
          element: <MyPosts />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/post/:id",
          element: <Post />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/orders",
          element: <Orders/>,
        },
        {
          path: "/admin",
          element: <Admin/>,
        },
        {
          path: "/admin/orders",
          element: <AdminOrders/>,
        },
        {
          path: "/admin/posts",
          element: <AdminPosts/>,
        },
        {
          path: "/admin/user",
          element: <User/>,
        },
        {
          path: "/chat",
          element: <Chat/>,
        },
        
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
