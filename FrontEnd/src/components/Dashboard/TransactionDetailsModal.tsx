import { X, TrendingUp, TrendingDown, Calendar, Wallet, Tag, FileText, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: {
    id: number;
    name: string;
    business: string;
    type: string;
    amount: string;
    date: string;
    invoice: string;
  } | null;
}

export default function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  if (!isOpen || !transaction) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background blur */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Popup */}
        <motion.div
          className="relative bg-white p-4 rounded-xl shadow-2xl z-10 max-h-[98vh] w-full max-w-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Background decoration */}
            
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-2 text-center">Transaction Details</h2>
            
            <div className="space-y-2 relative z-10">
              {/* Transaction Type Badge */}
              <div className="flex justify-center mb-2">
                <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full ${transaction.type === "Income" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {transaction.type === "Income" ? (
                    <TrendingUp size={18} />
                  ) : (
                    <TrendingDown size={18} />
                  )}
                  <span className="font-medium">{transaction.type}</span>
                </div>
              </div>
              
              {/* Transaction Name */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">{transaction.name}</h3>
                <p className="text-gray-500">{transaction.business}</p>
              </div>
              
              {/* Amount */}
              <div className="text-center">
                <span className="text-3xl font-bold text-gray-900">{transaction.amount}</span>
              </div>
              
              {/* Details List */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />
                    <span>Date</span>
                  </div>
                  <span className="text-gray-800 font-medium">{transaction.date}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Wallet size={18} />
                    <span>Wallet</span>
                  </div>
                  <span className="text-gray-800 font-medium">Main Wallet</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag size={18} />
                    <span>Category</span>
                  </div>
                  <span className="text-gray-800 font-medium">{transaction.type}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText size={18} />
                    <span>Invoice ID</span>
                  </div>
                  <span className="text-gray-800 font-medium">{transaction.invoice}</span>
                </div>
              </div>
              
              {/* Note */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Note</h4>
                <p className="text-gray-600 text-sm">
                  Payment for monthly subscription.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                
                <motion.button
                  className="flex-1 bg-white border  cursor-pointer border-red-500 text-red-500 font-medium px-4 py-2 rounded-sm flex items-center justify-center gap-1 hover:bg-red-100 duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 size={16} />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
  );
}