import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

interface EditWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: Wallet | null;
}

const EditWalletModal = ({ isOpen, onClose, wallet }: EditWalletModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currency: "",
    balance: "",
    description: ""
  });

  // Update form data when wallet changes
  useEffect(() => {
    if (wallet) {
      setFormData({
        name: wallet.name,
        currency: wallet.currency,
        balance: wallet.balance.toString(),
        description: ""
      });
    }
  }, [wallet]);

  if (!isOpen || !wallet) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Wallet updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update wallet");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            className="absolute cursor-pointer top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
          
          <h2 className="text-xl font-bold mb-4 text-center">Edit Wallet</h2>
          
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Name - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                placeholder="Ex: Main Wallet"
                required
              />
            </div>
            
            {/* Currency and Balance - Two Columns */}
            <div className="grid grid-cols-2 gap-3">
              <div  className="flex justify-between flex-col ">
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                  required
                >
                  <option value="">Select currency</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Balance</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {formData.currency === 'EUR' ? '€' : formData.currency === 'GBP' ? '£' : '$'}
                  </span>
                  <input
                    type="number"
                    name="balance"
                    value={formData.balance}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-1.5 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                    placeholder="Ex: 1000.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Description - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                placeholder="Add a description for this wallet"
                rows={2}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700  px-5 py-2 rounded-md   duration-300 cursor-pointer shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary-hover text-black  px-5 py-2 rounded-md   duration-300 cursor-pointer shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
              >
                {submitting ? "Updating..." : "Update Wallet"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditWalletModal;
