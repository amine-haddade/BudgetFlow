import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import type { RootState } from "../Redux/Store";
import { useAuth } from "../hooks/useAuth";
// import { Toaster } from "sonner";
// import Sidebar from "../components/Sidebar";

const DefaultLayout = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        <header className="h-16 border-b flex items-center justify-between px-4 bg-white shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">💰 Budget Flow</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Bonjour, <span className="font-medium">{user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </header>
        <main className="">
          <Outlet />
        </main>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default DefaultLayout;
