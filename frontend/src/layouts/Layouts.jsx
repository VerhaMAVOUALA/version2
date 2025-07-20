import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";


export const Layouts = () => {
    return (
        <div className="min-h-screen">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}
