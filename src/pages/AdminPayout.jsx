import React, { useEffect, useState } from "react";
import API from "../api/api";

const AdminPayout = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("");
  const [amounts, setAmounts] = useState({});
  const [history, setHistory] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);

  // Fetch counselor earnings
  const fetchEarnings = async () => {
    try {
      const { data } = await API.get("/payout/earnings");
      setCounselors(data.counselors || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Fetch payment history
  const fetchHistory = async () => {
    try {
      const { data } = await API.get("/payout/history");
      setHistory(data.payments || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      const { data } = await API.get("/payout/dashboard-stats");
      setDashboardStats(data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchEarnings();
    fetchHistory();
    fetchDashboardStats();
  }, []);

  const handleAmountChange = (id, value) => {
    setAmounts({ ...amounts, [id]: value });
  };

  const handlePay = async (counselorId) => {
    if (!amounts[counselorId] || !month) {
      alert("Please enter amount and month");
      return;
    }

    try {
      const { data } = await API.post(`/payout/pay/${counselorId}`, {
        amount: parseFloat(amounts[counselorId]),
        month,
      });
      
      alert(`Payment of ${amounts[counselorId]} LKR processed for ${month}`);
      
      // Refresh data
      fetchEarnings();
      fetchHistory();
      fetchDashboardStats();
      
      // Clear input
      setAmounts({ ...amounts, [counselorId]: "" });
      setMonth("");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  if (loading) return <p>Loading counselors...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Payout</h2>

      <div style={{ marginBottom: "30px" }}>
        <label>
          Month:
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>
      </div>

      <h3>Counselors Earnings</h3>
      <ul>
        {counselors.map((c) => (
          <li key={c._id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
            <p>
              <strong>{c.name}</strong> ({c.email}) - Total Earnings: {c.totalEarnings || 0}
            </p>
            <input
              type="number"
              placeholder="Amount"
              value={amounts[c._id] || ""}
              onChange={(e) => handleAmountChange(c._id, e.target.value)}
            />
            <button onClick={() => handlePay(c._id)}>Pay Now</button>
          </li>
        ))}
      </ul>

      <h3>Payment History</h3>
      <ul>
        {history.map((h) => (
          <li key={h._id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
            <p>
              Counselor: {h.counselor.name} | Amount: {h.amount} | Month: {h.month} | Paid By: {h.paidBy.name} | Status: {h.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPayout;
