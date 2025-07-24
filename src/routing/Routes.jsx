import { createBrowserRouter } from "react-router-dom"
import App from '../App'
import ProtectedRoute from "./ProtectedRoute"
import Home from "../pages/Home"
import MyPosts from "../pages/MyPosts"
import CreatePost from "../pages/CreatePost"
import EditPost from "../pages/EditPost"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import SinglePostPreview from "../pages/SinglePostPreview"
import AuthRouteLayout from "./AuthRouteLayout"

export const routes = createBrowserRouter([
    {
        path : "/",
        element : (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children : [
            {
                path : "/",
                element : (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path : "/My-Posts",
                element : (
                    <ProtectedRoute>
                        <MyPosts />
                    </ProtectedRoute>
                )
            },
            {
                path : "/Create-Post",
                element : (
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                )
            },
            {
                path : "/Edit-Post",
                element : (
                    <ProtectedRoute>
                        <EditPost />
                    </ProtectedRoute>
                )
            },
            {
                path : "/Post/:id",
                element : (
                    <ProtectedRoute>
                        <SinglePostPreview />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path : "/Login",
        element : (
            <AuthRouteLayout>
                <Login />
            </AuthRouteLayout>
        )
    },
    {
        path : "/Signup",
        element : (
            <AuthRouteLayout>
                <Signup />
            </AuthRouteLayout>
        )
    },
])