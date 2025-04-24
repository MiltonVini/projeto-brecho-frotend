import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { BagDetails } from "./BagDetails"
import App from "./App"
import { Sales } from "./Sales"
import { Clients } from "./Clients"
import { Products } from "./Products"
import { Auth } from "./Auth"

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/bags" element={<App />} />
                <Route path="/bag/:id" element={<BagDetails />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/clients" element={<Clients/>} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    )
}