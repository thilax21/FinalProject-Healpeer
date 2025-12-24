// src/pages/AdminCounselorReport.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { ArrowLeft, Wallet, Calendar, User, CheckCircle2 } from "lucide-react";

const AdminCounselorReport = () => {
  const { counselorId } = useParams();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await API.get(`/payout/summary/${counselorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(data.summary || null);
      } catch (err) {
        console.error("Error fetching counselor payout summary:", err);
      } finally {
        setLoading(false);
      }
    };
    if (counselorId && token) fetchSummary();
  }, [counselorId, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
        <div className="animate-pulse text-stone-500">Loading report…</div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
        <div className="text-stone-500">No summary available.</div>
      </div>
    );
  }

  const { totalEarnings, totalPaidOut, pendingBalance, completedSessions, currency, monthlySummary, payoutHistory } =
    summary;

  const monthlyRows = Object.entries(monthlySummary || {});

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917]"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 mb-6">
          <h1 className="text-2xl font-serif font-bold mb-2">
            Counselor Financial Report
          </h1>
          <p className="text-xs text-stone-500">
            Counselor ID: {summary.counselorId}
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3f6212]/10 flex items-center justify-center text-[#3f6212]">
                <Wallet size={18} />
              </div>
              <div>
                <div className="text-xs text-stone-500 uppercase font-bold tracking-widest">
                  Total Earnings
                </div>
                <div className="text-lg font-bold">
                  {totalEarnings.toFixed(2)} {currency || "LKR"}
                </div>
              </div>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-xs text-stone-500 uppercase font-bold tracking-widest">
                  Paid Out
                </div>
                <div className="text-lg font-bold">
                  {totalPaidOut.toFixed(2)} {currency || "LKR"}
                </div>
              </div>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Wallet size={18} />
              </div>
              <div>
                <div className="text-xs text-stone-500 uppercase font-bold tracking-widest">
                  Pending Balance
                </div>
                <div className="text-lg font-bold">
                  {pendingBalance.toFixed(2)} {currency || "LKR"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-stone-500 flex items-center gap-3">
            <div className="inline-flex items-center gap-1">
              <User size={12} /> Completed Sessions:{" "}
              <span className="font-bold text-[#1c1917]">
                {completedSessions}
              </span>
            </div>
          </div>
        </div>

        {/* Monthly breakdown */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 mb-6">
          <h2 className="font-serif font-bold text-lg mb-4">Monthly Breakdown</h2>
          <table className="w-full text-sm">
            <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3 text-left">Month</th>
                <th className="px-4 py-3 text-left">Earnings</th>
                <th className="px-4 py-3 text-left">Paid</th>
                <th className="px-4 py-3 text-left">Pending</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {monthlyRows.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-stone-400 italic"
                  >
                    No monthly data.
                  </td>
                </tr>
              ) : (
                monthlyRows.map(([month, vals]) => (
                  <tr key={month}>
                    <td className="px-4 py-3 text-sm font-medium text-[#1c1917]">
                      {month}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {vals.earnings.toFixed(2)} {currency || "LKR"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {vals.paid.toFixed(2)} {currency || "LKR"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {vals.pending.toFixed(2)} {currency || "LKR"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Payout history */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6">
          <h2 className="font-serif font-bold text-lg mb-4">Payout History</h2>
          <table className="w-full text-sm">
            <thead className="bg-[#f9f8f6] text-stone-500 font-bold border-b border-stone-200">
              <tr>
                <th className="px-4 py-3 text-left">Month</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Paid By</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {payoutHistory?.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-stone-400 italic"
                  >
                    No payouts yet.
                  </td>
                </tr>
              ) : (
                payoutHistory.map((p) => (
                  <tr key={p._id}>
                    <td className="px-4 py-3 text-sm font-medium text-[#1c1917]">
                      {p.month}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {p.amount.toFixed(2)} {currency || "LKR"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {p.paidBy?.name || "Admin"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCounselorReport;