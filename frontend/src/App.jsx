import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import OrderDetails from "./pages/OrderDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Reschedule from "./pages/Reschedule";
import Home from "./pages/Home";
function App() {

    return (

        <Routes>

 <Route
    path="/orders/:id"
    element={
        <ProtectedRoute>
            <OrderDetails />
        </ProtectedRoute>
    }
/>
<Route
    path="/"
    element={<Home />}
/>

<Route
    path="/login"
    element={<Login />}
/>
<Route
    path="/agent"
    element={
        <ProtectedRoute>
            <AgentDashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/admin"
    element={
        <ProtectedRoute>
            <AdminDashboard />
        </ProtectedRoute>
    }
/>
<Route

path="/reschedule/:id"

element={

<ProtectedRoute>

<Reschedule/>

</ProtectedRoute>

}

/>
            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;