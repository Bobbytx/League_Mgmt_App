import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import App from "./App";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage"
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path:"register/",
                element: <RegisterPage/>
            },
            {
                path:"about/",
                element: <AboutPage/>
            },
            {
                path:"contact/",
                element:<ContactPage />
            },
            {   path: "signup/",
                element: <RegisterPage />
            },
            {
                path: "dashboard/",
                element: <DashboardPage />
            },
        ]
    }
])

export default router


