import { Outlet } from "react-router";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
