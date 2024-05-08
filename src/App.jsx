import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Courses } from "./Pages/Courses/Courses";
import { Layout } from "./components/Navbar/layouts/MainLayout/Layout";
import { Register } from "./Pages/Register/Register";
import { Login } from "./Pages/Login/Login";
import { Users } from "./Pages/Users/Users";
import { User } from "./Pages/User/User";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Unauthorized } from "./Pages/Unauthorized/Unauthorized";


const router = createBrowserRouter
(
  [
    {
        element : <Layout/>,
        children : 
        [
            {
                path : "/",
                children : 
                [
                     {
                         path: "",
                         element: <Home/>
                     },
                     {
                      path: "register",
                      element: <Register/>
                      },
                      {
                        path: "login",
                        element: <Login/>
                      },
                      {
                        path: "users",
                        element: <ProtectedRoute requiredRole="Admin"><Users/></ProtectedRoute>
                      },
                      {
                        path: "user",
                        element: <User/>
                      },
                      {
                        path: "unauthorized",
                        element: <Unauthorized/>
                        },
                     {
                         path: "courses/",
                         children: 
                         [
                             {
                                 path:"",
                                 element: <Courses/>
                             }
                         ]
                     }
                ]
             },
             {
                 path: "*",
                 element: <NotFound/>
             }
        ]
    }
  ]
);

export function App()
{
  return (
    <>
        <RouterProvider router={router}/>
    </>
  );
}
