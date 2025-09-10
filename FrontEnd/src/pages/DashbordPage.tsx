import {
  Wallet,
  DollarSign,
  MoreHorizontal,
  ArrowRight,
  Wifi,
  Smartphone,
  Clapperboard,
  PenTool,
  Receipt,
} from "lucide-react";
import profilPhoto from "../assets/profilPhoto.jpeg";

const recentTransactions = [
  {
    icon: <Smartphone size={20} />,
    name: "Iphone 13 Pro MAX",
    vendor: "Apple Inc.",
    type: "Expense",
    amount: "$420.84",
    date: "14 Apr 2022",
  },
  {
    icon: <Clapperboard size={20} />,
    name: "Netflix Subscription",
    vendor: "Entertainment",
    type: "Expense",
    amount: "$100.00",
    date: "05 Apr 2022",
  },
  {
    icon: <PenTool size={20} />,
    name: "Figma Subscription",
    vendor: "Figma Inc.",
    type: "Income",
    amount: "$244.20",
    date: "25 Mar 2022",
  },
];

const scheduledTransfers = [
  { name: "Saleh Ahmed", date: "28 April, 2022 at 11:00", amount: "- $435,00" },
  {
    name: "Delowar Hossain",
    date: "25 April, 2022 at 11:00",
    amount: "- $132,00",
  },
  {
    name: "Moinul Hasan Nayem",
    date: "25 April, 2022 at 11:00",
    amount: "- $826,00",
  },
  {
    name: "Dr. Jubed Ahmed",
    date: "25 April, 2022 at 11:00",
    amount: "- $435,00",
  },
  {
    name: "AR. Jakir Alp",
    date: "25 April, 2022 at 11:00",
    amount: "- $435,00",
  },
];

function DashbordPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
      {/* Main content */}
      <div className="xl:col-span-2 space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-[#363A3F] rounded-2xl shadow-sm p-5 flex items-center gap-4">
            <div
              className={`p-3 rounded-full bg-[#4E5257] text-white flex items-center justify-center`}
            >
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total balance</p>
              <p className="text-2xl font-semibold text-gray-300">$5240.21</p>
            </div>
          </div>
          <div className="bg-[#F8F8F8] rounded-2xl shadow-sm p-5 flex items-center gap-4">
            <div
              className={`p-3 rounded-full bg-[#EBE8E8] text-white flex items-center justify-center`}
            >
              <DollarSign size={20} color="#363A3F" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total spending</p>
              <p className="text-2xl font-semibold text-gray-900">$570.73</p>
            </div>
          </div>
          <div className="bg-[#F8F8F8] rounded-2xl shadow-sm p-5 flex items-center gap-4">
            <div
              className={`p-3 rounded-full bg-[#EBE8E8] text-white flex items-center justify-center`}
            >
              <Receipt size={20} color="#363A3F" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total saved</p>
              <p className="text-2xl font-semibold text-gray-900">$123.73</p>
            </div>
          </div>
          {/* <MetricCard title="Total balance" value="$5240.21" icon={<Wallet size={24} />} bgColor="bg-gray-900" />
          <MetricCard title="Total spending" value="$250.80" icon={<DollarSign size={24} />} bgColor="bg-gray-100 text-gray-800" />
          <MetricCard title="Total saved" value="$550.25" icon={<Landmark size={24} />} bgColor="bg-gray-100 text-gray-800" /> */}
        </div>

        {/* Working Capital */}
        <section className="bg-white shadow-sm  rounded-2xl   ">
          <div className="flex items-center justify-between p-5">
            <h3 className="text-gray-900 font-semibold">Working Capital</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />{" "}
                Income
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />{" "}
                Expenses
              </div>
              <select className="bg-gray-100 text-gray-700  cursor-pointer rounded-full px-3 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>
          <div className="p-5 pt-0">
            <div className="h-60 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              Chart placeholder
            </div>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-between p-5">
            <h3 className="text-gray-900 font-semibold">Recent Transaction</h3>
            <button className="text-sm font-medium text-[#29A073]  cursor-pointer flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="divide-y">
            {recentTransactions.map((tx) => (
              <div
                key={tx.name}
                className="grid grid-cols-5 items-center  border-0 p-5 gap-4"
              >
                <div className="flex items-center gap-3 col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    {tx.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {tx.name}
                    </p>
                    <p className="text-xs text-gray-500">{tx.vendor}</p>
                  </div>
                </div>
                <div className="hidden sm:block text-sm text-gray-500 text-center">
                  {tx.type}
                </div>
                <div
                  className={`font-semibold text-center   ${
                    tx.type === "Expense" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {tx.amount}
                </div>{" "}
                <div className="text-sm text-gray-500 text-right">
                  {tx.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right column */}
      <div className="space-y-6">
        {/* Wallet card */}
        <section className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-semibold">Wallet</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="rounded-2xl p-5 text-white bg-gray-900 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-300">Maglo.</p>
                <p className="text-xs text-gray-400">Universal Bank</p>
              </div>
              <Wifi size={20} className="-mr-2 -mt-2" />
            </div>
            <div className="my-6 flex items-center gap-4">
              <div className="w-10 h-8 bg-yellow-500/80 rounded-md"></div>
              <p className="text-xl tracking-widest font-medium">
                **** **** **** 2321
              </p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-400">Card Holder</p>
                <p className="text-sm font-medium">Mahfuzul Nabil</p>
              </div>
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-red-500"></div>
                <div className="w-10 h-10 rounded-full bg-yellow-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Scheduled transfers */}
        <section className="bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-between p-5">
            <h3 className="text-gray-900 font-semibold">Scheduled Transfers</h3>
            <button className="text-sm font-medium text-[#29A073]  cursor-pointer flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="divide-y">
            {scheduledTransfers.map((transfer) => (
              <div
                key={transfer.name}
                className="flex items-center justify-between p-4  border-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={profilPhoto}
                    alt={transfer.name}
                    className="w-9 h-9 rounded-full  object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {transfer.name}
                    </p>
                    <p className="text-xs text-gray-500">{transfer.date}</p>
                  </div>
                </div>
                <div className="font-semibold text-gray-800">
                  {transfer.amount}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashbordPage;
