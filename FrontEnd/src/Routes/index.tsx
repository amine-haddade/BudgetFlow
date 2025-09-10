import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "../Layouts/GuestLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import DefaultLayout from "../Layouts/DefaultLayouts";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import WalletsPage from "../pages/WalletsPage";
import DashbordPage from "../pages/DashbordPage";
import NotFoundPage from "../pages/NotFoundPage";

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
          { path: "/", element:<DashbordPage/>},
          { path: "/wallets", element: <WalletsPage /> },
        //   { path: "/wallets/:id", element: <WalletDetailPage /> },
        //   { path: "/transactions", element: <TransactionsPage /> },
        //   { path: "/categories", element: <CategoriesPage /> },
        //   { path: "/reports", element: <ReportsPage /> },
        ],
      },
    ],
  },

  { path: "*", element:<NotFoundPage/>},
]);

export default router;
