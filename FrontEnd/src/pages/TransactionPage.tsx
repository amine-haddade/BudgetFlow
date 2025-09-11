import { Search, Download, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useState } from "react";
import TransactionList from "../components/Dashboard/TransactionList";
import TransactionModal from "../components/Dashboard/AddTransactionModal";

function TransactionPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-500 mt-1">
            8 transactions •{" "}
            <span className="text-green-500">+$4000.00 income</span> •{" "}
            <span className="text-red-500">-$525.70 expenses</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all">
            <Download size={18} />
            Export
          </button>
          <button
                  onClick={() => setIsModalOpen(true)}

          className="bg-primary hover:bg-primary-hover px-4 py-2 cursor-pointer rounded-md   shadow-lg hover:shadow-xl transition-all text-black font-medium duration-300 flex items-center gap-2">
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
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
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">All Types</SelectItem>
                <SelectItem value="dark">Income</SelectItem>
                <SelectItem value="system">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]  cursor-pointer">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
               <SelectItem  value="Category">All Category</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem  value="Transport">Transport</SelectItem>
              <SelectItem  value="Entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
            
        <Select>
              <SelectTrigger className="w-[180px]  cursor-pointer">
                <SelectValue placeholder="wallet" />
              </SelectTrigger>
              <SelectContent>
               <SelectItem  value="Category">wallet</SelectItem>
              <SelectItem value="Food">Main Wallet</SelectItem>
              <SelectItem  value="Transport">Savings</SelectItem>
              <SelectItem  value="Entertainment">Emergency Fund</SelectItem>
              </SelectContent>
            </Select>
            
           
          </div>
        </div>
      </div>

      {/* Transactions list will be added here */}
      <TransactionList />

      {/* Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default TransactionPage;
