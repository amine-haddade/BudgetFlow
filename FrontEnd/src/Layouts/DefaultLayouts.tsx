import { useSelector } from "react-redux";
import { Outlet, Navigate, NavLink, useLocation } from "react-router-dom";
import type { RootState } from "../Redux/Store";
import { useAuth } from "../hooks/useAuth";
import { useMemo, useState } from "react";
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Receipt, 
  Wallet, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Search, 
  Bell, 
  Menu, 
  ChevronDown
} from 'lucide-react';
// import { Toaster } from "sonner";
import profilPhoto from "../assets/profilPhoto.jpeg"

const DefaultLayout = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  const handleLogout = async () => {
    await logout();
  };

  const pageTitle = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("wallet")) return "My Wallets";
    if (path.includes("transaction")) return "Transactions";
    if (path.includes("invoice")) return "Invoices";
    if (path === "/" || path.includes("dashboard")) return "Dashboard";
    return path
      .replace("/", "")
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  }, [location.pathname]);

  const navItemClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4  py-2.5 rounded-lg transition-colors text-[14px] font-medium ${
      isActive
        ? "bg-primary text-gray-900"
        : "text-grayColorText hover:bg-gray-100"
    }`;

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-bgSidbarGray shadow-sm transition-all duration-300 ease-in-out z-40 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="h-16 flex items-center gap-3 px-6 flex-shrink-0  overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-black flex overflow-hidden items-center justify-center text-white font-bold text-lg">B</div>
          {sidebarOpen && <span className="text-xl font-bold">BudgetFlow</span>}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" className={navItemClasses} end>
            <LayoutDashboard size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </NavLink>
          <NavLink to="/transactions" className={navItemClasses}>
            <ArrowRightLeft size={20} />
            {sidebarOpen && <span>Transactions</span>}
          </NavLink>
          <NavLink to="/invoices" className={navItemClasses}>
            <Receipt size={20} />
            {sidebarOpen && <span>Invoices</span>}
          </NavLink>
          <NavLink to="/wallets" className={navItemClasses}>
            <Wallet size={20} />
            {sidebarOpen && <span>My Wallets</span>}
          </NavLink>
          <NavLink to="/settings" className={navItemClasses}>
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </NavLink>
        </nav>

        <div className="p-4 border-0">
           <NavLink to="/help" className={navItemClasses}>
            <HelpCircle size={20} />
            {sidebarOpen && <span>Help</span>}
          </NavLink>
            <button onClick={handleLogout}  className="w-full  flex items-center gap-3 px-4  py-2.5 rounded-lg transition-colors text-[14px]  text-grayColorText hover:bg-red-500  duration-300  hover:text-gray-950  cursor-pointer font-medium" >
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="h-16 flex items-center justify-between px-6  bg-white sticky top-0 z-30 ">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-500"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-semibold text-BlackText">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-5  ">
            <div className="hidden md:flex  items-center gap-2 px-3 py-2 rounded-full bg-gray-100">
              <Search size={18} className="text-gray-400"/>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent focus:outline-none text-sm text-gray-700 w-40"
              />
            </div>
            <button  className="p-2 rounded-full   hover:bg-gray-100 text-gray-500" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <div  className ="  flex rounded-4xl  hover:bg-gray-100  duration-300 gap-7 justify-between">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={profilPhoto}
                alt="avatar"
                className="w-9 h-9 object-cover rounded-full"
              />
              <div className="hidden sm:block">
                <p className="text-sm text-gray-800 font-semibold">{user.name}</p>
              </div>
              <ChevronDown size={18} className="text-gray-400" />
            </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default DefaultLayout;
