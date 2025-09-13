import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({ isOpen, onClose }: AddCategoryModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    color: "#FF6B6B"
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Category created successfully!");
      setFormData({ name: "", color: "#FF6B6B" });
      onClose();
    } catch (error) {
      toast.error("Failed to create category");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const predefinedColors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", 
    "#DDA0DD", "#FFB6C1", "#87CEEB", "#98FB98", "#F0E68C"
  ];

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
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[98vh]"
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
          
          <h2 className="text-xl font-bold mb-4 text-center">Add Category</h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                placeholder="Ex: Food, Transport, Entertainment"
                required
              />
            </div>
            
            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Color</label>
              <div className="space-y-3">
                {/* Color Input */}
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-12 h-12   rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
                    placeholder="#FF6B6B"
                  />
                </div>
                
                {/* Predefined Colors */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Quick colors:</p>
                  <div className="flex flex-wrap gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          formData.color === color ? 'border-gray-400 scale-110' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: formData.color }}
                ></div>
                <span className="font-medium">{formData.name || "Category Name"}</span>
              </div>
            </div>

            <motion.button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-black  px-5 py-2  cursor-pointer  duration-300 rounded-md w-full shadow-md hover:shadow-lg transition-all mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Category"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddCategoryModal;
