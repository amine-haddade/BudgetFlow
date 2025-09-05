import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "../Layouts/GuestLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import DefaultLayout from "../Layouts/DefaultLayouts";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";

const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "/", element: <div className="p-8"><h1 className="text-2xl font-bold">Dashboard - Bienvenue !</h1></div> },
        //   { path: "/wallets", element: <WalletsPage /> },
        //   { path: "/wallets/:id", element: <WalletDetailPage /> },
        //   { path: "/transactions", element: <TransactionsPage /> },
        //   { path: "/categories", element: <CategoriesPage /> },
        //   { path: "/reports", element: <ReportsPage /> },
        ],
      },
    ],
  },

  { path: "*", element: <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Page non trouvée</h1></div> },
]);

export default router;
