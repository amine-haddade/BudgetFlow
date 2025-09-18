import { useSelector } from "react-redux";
import { Outlet, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../Redux/Store";
import { useAuth } from "../hooks/useAuth";
import { useMemo, useState, useRef, useEffect } from "react";
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
  ChartBarStacked,
  ChevronDown,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster } from "sonner";
import profilPhoto from "../assets/profilPhoto.jpeg"

const DefaultLayout = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setProfileDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setProfileDropdownOpen(false);
  };
const pageTitle = useMemo(() => {
  const path = location.pathname.toLowerCase();
  if (path.includes("wallet") && !path.includes("transaction")) return "My Wallets";
  if (/^\/wallets\/\d+\/transaction$/.test(path)) return "Mes Transactions";
  if (path.includes("transaction")) return "Transactions";
  if (path.includes("invoice")) return "Invoices";
  if (path.includes("category")) return "Categories";
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
          <NavLink to="/categories" className={navItemClasses}>
            <ChartBarStacked size={20}/>
            {sidebarOpen && <span>Categories</span>}
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
      <div className="flex-1  flex flex-col">
        {/* Top navbar */}
        <header className="h-16 flex   backdrop-blur-2xl items-center justify-between px-6  bg-white/30 sticky top-0 z-30 ">
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
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex rounded-lg hover:bg-gray-100 duration-300 px-3 py-2 cursor-pointer"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={profilPhoto}
                    alt="avatar"
                    className="w-9 h-9 object-cover rounded-full"
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-800 font-semibold">{user.name}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={18} className="text-gray-400" />
                  </motion.div>
                </div>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-70 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={profilPhoto}
                          alt="avatar"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={handleProfileClick}
                        className="w-full  cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={handleSettingsClick}
                        className="w-full flex  cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
