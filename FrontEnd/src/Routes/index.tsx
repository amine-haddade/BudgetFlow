import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "../Layouts/GuestLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import DefaultLayout from "../Layouts/DefaultLayouts";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import WalletsPage from "../pages/WalletsPage";
import DashbordPage from "../pages/DashbordPage";
import NotFoundPage from "../pages/NotFoundPage";
import TransactionPage from "../pages/TransactionPage";
import TransactionByWallet from "../pages/TransactionByWallet";
import CategoriesPage from "../pages/CategoriesPage";

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
          { path: "/wallets/:id/transaction", element: <TransactionByWallet /> },
          { path: "/transactions", element: <TransactionPage /> },
          { path: "/categories", element: <CategoriesPage /> },
        //   { path: "/reports", element: <ReportsPage /> },
        ],
      },
    ],
  },

  { path: "*", element:<NotFoundPage/>},
]);

export default router;
