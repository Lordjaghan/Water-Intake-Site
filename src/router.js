import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AddIntake from "./components/files/AddIntake";
import ListIntake from "./components/files/ListIntake";
import CompareIntake from "./components/files/CompareIntake";
const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'register', element: <Register/> },
    {path:'login', element: <Login/>},
    {path:'addintake', element: <AddIntake/>},
    {path:'listintake', element: <ListIntake/>},
    {path:'compareintake', element: <CompareIntake/>}
]);

export default router;