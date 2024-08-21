import React, { useEffect, useState } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

import { formatDistanceToNow } from "date-fns";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [topMenuItems, setTopMenuItems] = useState([]);
  const [salesPerformance, setSalesPerformance] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [userActivity, setUserActivity] = useState(null);
  const [salesFilter, setSalesFilter] = useState("last7Days");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/get-dashboard-data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    const fetchTopMenuItems = async () => {
      try {
        const response = await fetch("/api/admin/top-menu-items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTopMenuItems(data);
      } catch (error) {
        console.error("Error fetching top menu items", error);
      }
    };
    const fetchSalesPerformance = async (filter) => {
      try {
        const response = await fetch(
          `/api/admin/sales-performance?filter=${filter}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSalesPerformance(data);
      } catch (error) {
        console.error("Error fetching sales performance", error);
      }
    };

    const fetchRecentOrders = async () => {
      try {
        const response = await fetch("/api/admin/recent-orders");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecentOrders(data);
      } catch (error) {
        console.error("Error fetching recent orders", error);
      }
    };

    const fetchUserActivity = async () => {
      try {
        const response = await fetch("/api/admin/user-activity");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserActivity(data);
      } catch (error) {
        console.error("Error fetching user activity", error);
      }
    };

    fetchData();
    fetchTopMenuItems();
    fetchSalesPerformance(salesFilter);
    fetchRecentOrders();
    fetchUserActivity();
  }, [salesFilter]);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setSalesFilter(selectedFilter);
  };

  if (
    !dashboardData ||
    !topMenuItems.length ||
    !salesPerformance.length ||
    !recentOrders.length ||
    !userActivity
  ) {
    return (
      <section className="fixed-container p-4 space-y-8">
        <div className="line-loader"></div>
      </section>
    );
  }

  const {
    revenueByDay,
    ordersByStatus,
    totalRevenue,
    totalOrders,
    avgOrderValue,
  } = dashboardData;

  const lineChartData = {
    labels: revenueByDay.map((entry) => entry._id),
    datasets: [
      {
        label: "Revenue",
        data: revenueByDay.map((entry) => entry.totalRevenue),
        fill: false,
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const doughnutChartData = {
    labels: ordersByStatus.map((entry) => entry._id),
    datasets: [
      {
        label: "Orders by Status",
        data: ordersByStatus.map((entry) => entry.count),
        backgroundColor: ["#F87171", "#4ADE80", "#60A5FA"],
      },
    ],
  };

  const barChartData = {
    labels: salesPerformance.map((entry) => entry._id),
    datasets: [
      {
        label: "Total Sales",
        data: salesPerformance.map((entry) => entry.totalSales),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="fixed-container p-4 space-y-8">
      <nav className="text-sm font-medium text-gray-500 mb-4">
          <span className="text-red-600">Dashboard</span> / Dashboard
        </nav>
        <h1 className="text-2xl font-bold mb-6 font-montserrat text-red-500">
        Dashboard
        </h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-xl">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold">Rs.{totalRevenue}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Total Orders
          </h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Average Order Value
          </h3>
          <p className="text-2xl font-bold">Rs.{avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* User Activity Overview */}
      {userActivity && (
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl text-red-500 font-semibold mb-4">
            User Activity
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>New Users (Last 30 Days)</span>
              <span>{userActivity.newUsers}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Users (Last 30 Days)</span>
              <span>{userActivity.activeUsers}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revenue by Day */}
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Revenue by Day</h3>
          <Line data={lineChartData} />
        </div>

        {/* Orders by Status */}
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Orders by Status</h3>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>

      {/* Sales Performance Comparison */}
      {/* Sales Performance Filter */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Sales Performance</h3>
        <select
          value={salesFilter}
          onChange={handleFilterChange}
          className="p-2 border rounded mb-4"
        >
          <option value="today">Today</option>
          <option value="last7Days">Last 7 Days</option>
          <option value="last30Days">Last 30 Days</option>
          <option value="last6Months">Last 6 Months</option>
          <option value="lastYear">Last Year</option>
        </select>
        <Bar data={barChartData} />
      </div>

      {/* Recent Orders */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <ul className="space-y-2">
          {recentOrders.map((order) => (
            <li key={order._id} className="flex justify-between">
              <span className="font-montserrat font-semibold">
                Order <span className="text-red-500">{order.orderId}</span>
              </span>
              <span>
                {formatDistanceToNow(new Date(order.dateOrdered))} ago
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Menu Items */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Top Menu Items</h3>
        <ul className="space-y-2">
          {topMenuItems.map((item) => (
            <li
              key={item.menuItemId}
              className="flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded"
                />
                <span className="font-semibold ">{item.name}</span>
              </div>
              <span className="text-red-500 font-bold">
                {item.totalQuantity} Sold
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AdminDashboard;
