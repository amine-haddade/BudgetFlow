import { Search, Plus, EllipsisVertical, Eye, Edit, Trash2, Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import AddCategoryModal from "../components/Dashboard/AddCategoryModal";
import EditCategoryModal from "../components/Dashboard/EditCategoryModal";
import CategoryDetailsModal from "../components/Dashboard/CategoryDetailsModal";

interface Category {
  _id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

function CategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample categories data
  const categories: Category[] = [
    {
      _id: "1",
      name: "Food",
      color: "#FF6B6B",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      _id: "2", 
      name: "Transport",
      color: "#4ECDC4",
      createdAt: "2024-01-14T09:20:00Z",
      updatedAt: "2024-01-14T09:20:00Z"
    },
    {
      _id: "3",
      name: "Entertainment",
      color: "#45B7D1",
      createdAt: "2024-01-13T14:15:00Z",
      updatedAt: "2024-01-13T14:15:00Z"
    },
    {
      _id: "4",
      name: "Shopping",
      color: "#96CEB4",
      createdAt: "2024-01-12T16:45:00Z",
      updatedAt: "2024-01-12T16:45:00Z"
    },
    {
      _id: "5",
      name: "Health",
      color: "#FFEAA7",
      createdAt: "2024-01-11T11:30:00Z",
      updatedAt: "2024-01-11T11:30:00Z"
    },
    {
      _id: "6",
      name: "Education",
      color: "#DDA0DD",
      createdAt: "2024-01-10T13:20:00Z",
      updatedAt: "2024-01-10T13:20:00Z"
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

  const handleDropdownAction = (action: string, category: Category) => {
    setActiveDropdown(null);
    
    switch (action) {
      case 'view-details':
        setSelectedCategory(category);
        setIsDetailsModalOpen(true);
        break;
      case 'edit':
        setEditingCategory(category);
        setIsEditModalOpen(true);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
          toast.success(`Category "${category.name}" deleted successfully`);
        }
        break;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">
            Manage your transaction categories ({categories.length} total)
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary-hover px-8 py-2 cursor-pointer rounded-md shadow-lg hover:shadow-xl transition-all text-black font-medium duration-300 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-lg font-medium mb-4">Filters</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 max-w-md relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="updated">Last Updated</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colors</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category._id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === category._id ? null : category._id)}
                >
                  <EllipsisVertical size={16} className="text-gray-500" />
                </div>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === category._id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <button
                        onClick={() => handleDropdownAction('view-details', category)}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                      <button
                        onClick={() => handleDropdownAction('edit', category)}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <Edit size={16} />
                        Edit Category
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={() => handleDropdownAction('delete', category)}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete Category
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Tag size={14} />
                <span>Color: {category.color}</span>
              </div>
              <div className="flex justify-between">
                <span>Created: {formatDate(category.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated: {formatDate(category.updatedAt)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDropdownAction('edit', category)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDropdownAction('view-details', category)}
                  className="flex-1 bg-primary hover:bg-primary-hover text-black py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
      />
      
      <CategoryDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
      />
    </div>
  );
}

export default CategoriesPage;
