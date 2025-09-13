import { Search, Wallet, ArrowUpRight, ArrowDownRight, EllipsisVertical, Eye, CreditCard, Edit, Trash2, User } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WalletModal from "../components/Dashboard/AddWalletModal";
import EditWalletModal from "../components/Dashboard/EditWalletModal";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

interface Wallet {
  id: number;
  name: string;
  currency: string;
  balance: number;
  lastTransaction: {
    date: string;
    amount: number;
  };
  status: 'Active' | 'Inactive';
}

function WalletsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample wallet data
  const wallets: Wallet[] = [
    {
      id: 1,
      name: "Main Wallet",
      currency: "USD",
      balance: 5240.00,
      lastTransaction: { date: "Jan 15", amount: -85.50 },
      status: "Active"
    },
    {
      id: 2,
      name: "Travel Wallet",
      currency: "EUR",
      balance: 1200.75,
      lastTransaction: { date: "Jan 13", amount: -45.20 },
      status: "Active"
    },
    {
      id: 3,
      name: "Savings Wallet",
      currency: "USD",
      balance: 6850.00,
      lastTransaction: { date: "Jan 10", amount: 500.00 },
      status: "Active"
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownAction = (action: string, wallet: Wallet) => {
    setActiveDropdown(null);
    
    switch (action) {
      case 'view-details':
        toast.success(`Viewing details for ${wallet.name}`);
        break;
      case 'view-transactions':
        // Navigate to transactions page
        window.location.href = `/wallets/${wallet.id}/transaction`;
        break;
      case 'edit':
        setEditingWallet(wallet);
        setIsEditModalOpen(true);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${wallet.name}?`)) {
          toast.success(`${wallet.name} deleted successfully`);
        }
        break;
    }
  };
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wallets</h1>
          <p className="text-gray-500 mt-1">
            Manage your finances across 3 active wallets
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-hover px-8 py-2 cursor-pointer rounded-md shadow-lg hover:shadow-xl transition-all text-black font-medium duration-300 flex items-center gap-2"
        >
          <span>+</span> Create New Wallet
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#FDFDF0] p-4 rounded-xl border border-[#efef63]">
          <div className="flex justify-between items-start  ">
            <div>
              <p className="text-gray-600 mb-1">Total Balance</p>
              <h3 className="text-2xl font-bold">$13,290.75</h3>
            </div>
            <div className="p-2 bg-white rounded-lg">
              <Wallet className="text-black" color="#efef63" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-[#F0FDF4] p-4 rounded-xl border-green-200  border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 mb-1">Monthly Income</p>
              <h3 className="text-2xl font-bold text-green-600">+$2,500.00</h3>
            </div>
            <div className="p-2 bg-white rounded-lg">
              <ArrowUpRight className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-[#FDF2F2] p-4 rounded-xl border border-red-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 mb-1">Monthly Expenses</p>
              <h3 className="text-2xl font-bold text-red-600">-$250.70</h3>
            </div>
            <div className="p-2 bg-white rounded-lg">
              <ArrowDownRight className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 mb-1">Active Wallets</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
            <div className="bg-[#E8F5E9] text-sm px-3 text-green-600    rounded-2xl border border-green-500">
              3 of 4
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center gap-4 ">
        <div className="flex-1 max-w-md relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search wallets..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <select className="px-4 cursor-pointer py-2 rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-gray-200">
          <option>All Wallets</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="bg-[#1E293B] text-white p-6 rounded-2xl group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-wallet hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] border border-slate-700/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
            <div className="flex relative items-center gap-3 mb-4">
              <div className="p-2 bg-[#334155] rounded-lg">
                <Wallet size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{wallet.name}</h3>
                  <div className="flex items-center relative" ref={dropdownRef}>
                    <Badge
                      variant="default"
                      className="text-xs rounded-2xl font-semibold px-2.5 py-0.5 border-0 bg-primary/20 text-primary backdrop-blur-sm"
                    >
                      {wallet.status}
                    </Badge>
                    <div 
                      className="mx-2 cursor-pointer p-1 hover:bg-gray-400 rounded-full transition-colors"
                      onClick={() => setActiveDropdown(activeDropdown === wallet.id ? null : wallet.id)}
                    >
                      <EllipsisVertical size={16} />
                    </div>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === wallet.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                          <button
                            onClick={() => handleDropdownAction('view-details', wallet)}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleDropdownAction('view-details', wallet)}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <User size={16} />
                            Add User
                          </button>
                          <button
                            onClick={() => handleDropdownAction('view-transactions', wallet)}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <CreditCard size={16} />
                            View Transactions
                          </button>
                          <button
                            onClick={() => handleDropdownAction('edit', wallet)}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <Edit size={16} />
                            Edit Wallet
                          </button>
                          <hr className="my-1" />
                          <button
                            onClick={() => handleDropdownAction('delete', wallet)}
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                          >
                            <Trash2 size={16} />
                            Delete Wallet
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{wallet.currency} Account</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-1">Available Balance</p>
              <h2 className="text-3xl font-bold">
                {wallet.currency === 'EUR' ? '€' : '$'}{wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="flex gap-4 mb-4">
              <NavLink 
                to={`/wallets/${wallet.id}/transaction`} 
                className="flex-1 bg-primary text-black py-2 text-center cursor-pointer rounded-lg font-medium hover:bg-primary-hover duration-300"
              >
                <button className="cursor-pointer">
                  Show Transactions
                </button>
              </NavLink>
              <button 
                onClick={() => handleDropdownAction('edit', wallet)}
                className="flex-1 cursor-pointer bg-[#334155] py-2 rounded-lg font-medium hover:bg-[#475569] transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`${wallet.lastTransaction.amount < 0 ? 'bg-red-500' : 'bg-green-500'} rounded-full w-2 h-2`}></div>
                <span className="text-gray-400">Last transaction • {wallet.lastTransaction.date}</span>
              </div>
              <span className={wallet.lastTransaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                {wallet.lastTransaction.amount < 0 ? '-' : '+'}
                {wallet.currency === 'EUR' ? '€' : '$'}{Math.abs(wallet.lastTransaction.amount).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <EditWalletModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingWallet(null);
        }}
        wallet={editingWallet}
      />
    </div>
  );
}

export default WalletsPage;
