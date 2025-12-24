import React, { useEffect, useState } from 'react';
import API from '../api/api';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const { data } = await API.get('/admin/requests');
      setRequests(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const approve = async (id) => {
    try { await API.put(`/admin/approve/${id}`); fetchRequests(); alert('Approved'); }
    catch (err) { alert('Error'); }
  };
  const reject = async (id) => {
    try { await API.delete(`/admin/reject/${id}`); fetchRequests(); alert('Rejected'); }
    catch (err) { alert('Error'); }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Pending Counselor Requests</h2>
      <div className="space-y-4">
        {requests.length === 0 && <p>No pending requests</p>}
        {requests.map(req => (
          <div key={req._id} className="p-4 bg-white rounded-xl shadow flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={req.profileImage || '/default-avatar.png'} className="w-16 h-16 rounded-full object-cover" alt="p" />
              <div>
                <h3 className="font-medium">{req.name}</h3>
                <p className="text-sm text-gray-500">{req.specialization} • {req.experience}</p>
                <p className="text-sm text-gray-500">{req.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>approve(req._id)} className="px-3 py-1 bg-green-500 text-white rounded">Approve</button>
              <button onClick={()=>reject(req._id)} className="px-3 py-1 bg-red-500 text-white rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingRequests;
