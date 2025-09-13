import { X, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function TransactionModal({ isOpen, onClose }: any) {
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            className="relative bg-white p-4 rounded-xl   shadow-2xl z-10 max-h-[98vh]"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
         
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute  cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-2 text-center">Add Transaction</h2>
            <form className="space-y-3">
              {/* Type Selection - Full Width */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setTransactionType("income")}
                    className={`flex items-center justify-center gap-1 py-2 rounded-xl transition-all ${transactionType === "income" 
                      ? "bg-green-100 border-2 border-green-500 text-green-700 shadow-md" 
                      : "bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200"}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      scale: transactionType === "income" ? 1.05 : 1,
                      y: transactionType === "income" ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: transactionType === "income" ? [0, -10, 10, -10, 0] : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <TrendingUp size={20} className={transactionType === "income" ? "text-green-600" : "text-gray-500"} />
                    </motion.div>
                    <span className="font-medium">Income</span>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={() => setTransactionType("expense")}
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${transactionType === "expense" 
                      ? "bg-red-100 border-2 border-red-500 text-red-700 shadow-md" 
                      : "bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200"}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      scale: transactionType === "expense" ? 1.05 : 1,
                      y: transactionType === "expense" ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: transactionType === "expense" ? [0, -10, 10, -10, 0] : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <TrendingDown size={20} className={transactionType === "expense" ? "text-red-600" : "text-gray-500"} />
                    </motion.div>
                    <span className="font-medium">Expense</span>
                  </motion.button>
                </div>
                <input type="hidden" name="type" value={transactionType} />
              </div>
              
              {/* Name - Full Width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                  placeholder="Ex: Netflix Subscription"
                />
              </div>
              
              {/* Amount and Date - Two Columns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-xl pl-8 pr-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                      placeholder="Ex: 100.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                  />
                </div>
              </div>
              
              {/* Wallet and Category - Two Columns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wallet</label>
                  <Select>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">All Wallet</SelectItem>
                <SelectItem value="dark">Personne Wallet</SelectItem>
                <SelectItem value="system">Sport Wallet</SelectItem>
              </SelectContent>
            </Select>
            
          
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                   <Select   >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">All Ctageories</SelectItem>
                <SelectItem value="dark">Personne Gtegorie</SelectItem>
                <SelectItem value="system">Sport Gategorie</SelectItem>
              </SelectContent>
            </Select>
                </div>
              </div>
              
              {/* Note - Full Width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
                <textarea
                  className="w-full border border-gray-300 rounded-xl px-3 py-0.5 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                  placeholder="Add a note about this transaction"
                  rows={2}
                />
              </div>

              <motion.button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-black font-semibold px-5 py-2 rounded-lg w-full shadow-md hover:shadow-lg transition-all mt-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Transaction
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
