import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import type  { RootState } from "../Redux/Store";
import { Toaster } from "../components/ui/sonner";

const GuestLayout = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (token && user) return <Navigate to="/" />;

  return (
    <div className="h-screen bg-gray-50">
      <Outlet />
      <Toaster/>
    </div>
  );
};

export default GuestLayout;
