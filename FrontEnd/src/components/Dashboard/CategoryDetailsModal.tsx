import { X, Tag, Wallet, CreditCard, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  _id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

const CategoryDetailsModal = ({ isOpen, onClose, category }: CategoryDetailsModalProps) => {
  if (!isOpen || !category) return null;

  // Sample statistics data - in real app, this would come from API
  const categoryStats = {
    totalTransactions: 47,
    totalAmount: 2840.50,
    walletsUsed: 3,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-md shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <Tag size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
              <p className="text-gray-600 text-sm">Category Details</p>
            </div>
          </div>

          {/* Category Info */}
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Created:</span>
                <p className="font-medium text-gray-900">{formatDate(category.createdAt)}</p>
              </div>
              <div>
                <span className="text-gray-600">Last Modified:</span>
                <p className="font-medium text-gray-900">{formatDate(category.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Total Transactions */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-md border border-blue-200">
              <div className="text-center">
                <CreditCard className="text-blue-600 mx-auto mb-2" size={20} />
                <p className="text-blue-600 text-xs font-medium">Transactions</p>
                <h3 className="text-lg font-bold text-blue-800">{categoryStats.totalTransactions}</h3>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-md border border-green-200">
              <div className="text-center">
                <DollarSign className="text-green-600 mx-auto mb-2" size={20} />
                <p className="text-green-600 text-xs font-medium">Balance</p>
                <h3 className="text-lg font-bold text-green-800">{formatCurrency(categoryStats.totalAmount)}</h3>
              </div>
            </div>

            {/* Wallets Used */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-md border border-purple-200">
              <div className="text-center">
                <Wallet className="text-purple-600 mx-auto mb-2" size={20} />
                <p className="text-purple-600 text-xs font-medium">Wallets</p>
                <h3 className="text-lg font-bold text-purple-800">{categoryStats.walletsUsed}</h3>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4">
            <motion.button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary-hover text-black cursor-pointer duration-300 px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryDetailsModal;
