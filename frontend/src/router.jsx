import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import App from "./App";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage"

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
            }
        ]
    }
])

export default router