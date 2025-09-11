
const transactions = [
  {
    id: 1,
    name: "Iphone 13 Pro MAX",
    business: "Apple. Inc",
    type: "Mobile",
    amount: "$420.84",
    date: "14 Apr 2022 at 8:00 PM",
    invoice: "MGL0124877",
  },
  {
    id: 2,
    name: "Netflix Subscription",
    business: "Netflix",
    type: "Entertainment",
    amount: "$100.00",
    date: "05 Apr 2022 at 7:00 PM",
    invoice: "MGL0124585",
  },
  {
    id: 3,
    name: "Figma Subscription",
    business: "Figma. Inc",
    type: "Software",
    amount: "$244.20",
    date: "02 Apr 2022 at 10:00 PM",
    invoice: "MGL0124124",
  },
  {
    id: 4,
    name: "Figma Subscription",
    business: "Figma. Inc",
    type: "Software",
    amount: "$244.20",
    date: "02 Apr 2022 at 10:00 PM",
    invoice: "MGL0124124",
  },
  {
    id: 5,
    name: "Figma Subscription",
    business: "Figma. Inc",
    type: "Software",
    amount: "$244.20",
    date: "02 Apr 2022 at 10:00 PM",
    invoice: "MGL0124124",
  },
  {
    id: 6,
    name: "Figma Subscription",
    business: "Figma. Inc",
    type: "Software",
    amount: "$244.20",
    date: "02 Apr 2022 at 10:00 PM",
    invoice: "MGL0124124",
  },
  
  
];

import { useState } from "react";
import TransactionDetailsModal from "./TransactionDetailsModal";

interface Transaction {
  id: number;
  name: string;
  business: string;
  type: string;
  amount: string;
  date: string;
  invoice: string;
}

export default function TransactionList() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-left">
          <thead className=" text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-3  font-medium">Name/Business</th>
              <th className="px-6 py-3  font-medium">Type</th>
              <th className="px-6 py-3  font-medium">Amount</th>
              <th className="px-6 py-3  font-medium">Date</th>
              <th className="px-6 py-3  font-medium">Invoice ID</th>
              <th className="px-6 py-3  font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className=" text-gray-900">{t.name}</div>
                  <div className=" text-gray-500">{t.business}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{t.type}</td>
                <td className="px-6 py-4  ">{t.amount}</td>
                <td className="px-6 py-4 text-gray-500">{t.date}</td>
                <td className="px-6 py-4 text-gray-500">{t.invoice}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleViewTransaction(t)}
                    className="bg-primary hover:bg-primary-hover text-black px-5 font-medium cursor-pointer duration-300 py-1.5 rounded-sm flex items-center gap-1"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        transaction={selectedTransaction}
      />
    </>
)}
