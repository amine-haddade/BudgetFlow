



import { Search, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function WalletsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wallets</h1>
          <p className="text-gray-500 mt-1">Manage your finances across 3 active wallets</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover px-8 py-2 cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all text-black font-medium duration-300 flex items-center gap-2">
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
              <Wallet className="text-black"  color='#efef63' size={20} />
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
            <div className="bg-[#E8F5E9] text-[13px] px-4 py-0.5   rounded-xl border border-green-300">
              3 of 4
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search wallets..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
          />
        </div>
        <select className="px-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[--color-primary]">
          <option>All Wallets</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Wallet */}
        <div className="bg-[#1E293B] text-white p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#334155] rounded-lg">
              <Wallet size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Main Wallet</h3>
                <span className="px-3 py-1 bg-[--color-primary] text-black rounded-full text-sm">Active</span>
              </div>
              <p className="text-gray-400 text-sm">USD Account</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-1">Available Balance</p>
            <h2 className="text-3xl font-bold">$5,240.00</h2>
          </div>
          <div className="flex gap-4 mb-4">
            <button className="flex-1 bg-[--color-primary] text-black py-2 rounded-lg font-medium hover:bg-[--color-primary-hover]">Send</button>
            <button className="flex-1 bg-[#334155] py-2 rounded-lg font-medium hover:bg-[#475569]">Request</button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Last transaction • Jan 15</span>
            <span className="text-red-500">-$85.50</span>
          </div>
        </div>

        {/* Travel Wallet */}
        <div className="bg-[#1E293B] text-white p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#334155] rounded-lg">
              <Wallet size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Travel Wallet</h3>
                <span className="px-3 py-1 bg-[--color-primary] text-black rounded-full text-sm">Active</span>
              </div>
              <p className="text-gray-400 text-sm">EUR Account</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-1">Available Balance</p>
            <h2 className="text-3xl font-bold">€1,200.75</h2>
          </div>
          <div className="flex gap-4 mb-4">
            <button className="flex-1 bg-[--color-primary] text-black py-2 rounded-lg font-medium hover:bg-[--color-primary-hover]">Send</button>
            <button className="flex-1 bg-[#334155] py-2 rounded-lg font-medium hover:bg-[#475569]">Request</button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Last transaction • Jan 13</span>
            <span className="text-red-500">-€45.20</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletsPage;
