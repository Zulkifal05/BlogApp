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

export const routes = createBrowserRouter([
    {
        path : "/",
        element : <App />,
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
                path : "/Login",
                element : <Login />
            },
            {
                path : "/Signup",
                element : <Signup />
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
    }
])