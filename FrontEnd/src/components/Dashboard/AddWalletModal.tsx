import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal = ({ isOpen, onClose }: WalletModalProps) => {
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Wallet created successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to create wallet");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
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
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute  cursor-pointer top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
          
          <h2 className="text-xl font-bold mb-4 text-center">Add Wallet</h2>
          
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Name - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                placeholder="Ex: Main Wallet"
                required
              />
            </div>
            
            {/* Currency and Initial Budget - Two Columns */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                  required
                >
                  <option value="">Select currency</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-xl pl-8 pr-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                    placeholder="Ex: 1000.00"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Description - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
              <textarea
                className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                placeholder="Add a description for this wallet"
                rows={2}
              />
            </div>

            <motion.button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-black font-semibold px-5 py-2 rounded-xl w-full shadow-md hover:shadow-lg transition-all mt-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Wallet"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WalletModal;