// // src/pages/CounselorEditProfile.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/api";

// const days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const CounselorEditProfile = () => {
//   const { id } = useParams(); // counselorId
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     profileImage: "",
//     bio: "",
//     specialization: "",
//     experience: "",
//     contactNumber: "",
//     pricePerSession: 1000,
//     timezone: "Asia/Colombo",
//   });

//   const [availability, setAvailability] = useState({ slots: [] });
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [counselorRes, availabilityRes] = await Promise.all([
//           API.get(`/counselors/${id}`),
//           API.get(`/availability/${id}`),
//         ]);

//         const c = counselorRes.data.data;

//         setForm({
//           profileImage: c.profileImage || "",
//           bio: c.bio || "",
//           specialization: c.specialization || "",
//           experience: c.experience || "",
//           contactNumber: c.contactNumber || "",
//           pricePerSession: c.pricePerSession || 1000,
//           timezone: c.timezone || "Asia/Colombo",
//         });

//         setAvailability(availabilityRes.data.data || { slots: [] });
//       } catch (err) {
//         console.error("Failed to load counselor/availability:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleChange = (e) =>
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const handleSubmitProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/profile/update`, form, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       });
//       alert("Profile updated");
//       navigate(`/counselor/${id}`);
//     } catch (err) {
//       console.error("Update profile failed:", err);
//       alert("Failed to update profile");
//     }
//   };

//   // Availability handlers
//   const handleSlotChange = (index, field, value) => {
//     setAvailability((prev) => {
//       const updated = [...(prev.slots || [])];
//       updated[index] = { ...updated[index], [field]: value };
//       return { ...prev, slots: updated };
//     });
//   };

//   const handleAddSlot = () => {
//     setAvailability((prev) => ({
//       ...prev,
//       slots: [
//         ...(prev.slots || []),
//         { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", durationMin: 60 },
//       ],
//     }));
//   };

//   const handleRemoveSlot = (index) => {
//     setAvailability((prev) => {
//       const updated = [...(prev.slots || [])];
//       updated.splice(index, 1);
//       return { ...prev, slots: updated };
//     });
//   };

//   const saveAvailability = async () => {
//     try {
//       await API.put(
//         "/availability",
//         { slots: availability.slots || [] },
//         {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         }
//       );
//       alert("Availability updated");
//     } catch (err) {
//       console.error("Save availability error:", err);
//       alert("Failed to save availability");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f4f2ed]">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#f4f2ed]">
//       <main className="max-w-3xl mx-auto px-4 py-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-sm text-stone-500 mb-4"
//         >
//           ← Back
//         </button>

//         <h1 className="text-3xl font-serif mb-2">Edit Counselor Profile</h1>
//         <p className="text-sm text-stone-500 mb-6">
//           Update your public profile and manage your weekly availability.
//         </p>

//         <form onSubmit={handleSubmitProfile} className="space-y-6 bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
//           {/* Profile fields */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Profile Image URL
//             </label>
//             <input
//               name="profileImage"
//               value={form.profileImage}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 text-sm"
//               placeholder="https://..."
//             />
//             {form.profileImage && (
//               <img
//                 src={form.profileImage}
//                 alt="Preview"
//                 className="mt-2 w-24 h-24 rounded-lg object-cover border"
//               />
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Specialization
//             </label>
//             <input
//               name="specialization"
//               value={form.specialization}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 text-sm"
//               placeholder="e.g. Clinical Psychologist, Couples Therapy"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Bio</label>
//             <textarea
//               name="bio"
//               value={form.bio}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 text-sm min-h-[100px]"
//               placeholder="Write a short introduction about your approach, experience, and what clients can expect."
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Years of Experience
//               </label>
//               <input
//                 name="experience"
//                 type="number"
//                 min={0}
//                 value={form.experience}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-3 py-2 text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Session Fee (LKR)
//               </label>
//               <input
//                 name="pricePerSession"
//                 type="number"
//                 min={0}
//                 value={form.pricePerSession}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-3 py-2 text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Contact Number
//             </label>
//             <input
//               name="contactNumber"
//               value={form.contactNumber}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 text-sm"
//               placeholder="+94..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Timezone</label>
//             <input
//               name="timezone"
//               value={form.timezone}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 text-sm"
//               placeholder="Asia/Colombo"
//             />
//           </div>

//           <div className="pt-2">
//             <button
//               type="submit"
//               className="px-6 py-3 rounded-lg bg-[#1c1917] text-white text-sm font-bold"
//             >
//               Save Profile
//             </button>
//           </div>
//         </form>

//         {/* Availability editor */}
//         <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
//           <h2 className="text-xl font-semibold mb-2">Weekly Availability</h2>
//           <p className="text-sm text-gray-500 mb-4">
//             Set the days and times you are available. Clients will only be able
//             to book within these ranges. Real-time free slots (excluding
//             existing bookings) are calculated automatically.
//           </p>

//           <div className="space-y-3 mb-4">
//             {(availability.slots || []).length === 0 && (
//               <div className="text-sm text-gray-500 border border-dashed rounded-lg p-3">
//                 No availability set. Add at least one time range.
//               </div>
//             )}

//             {(availability.slots || []).map((slot, index) => (
//               <div
//                 key={index}
//                 className="flex flex-wrap items-center gap-3 border rounded-lg p-3"
//               >
//                 <select
//                   value={slot.dayOfWeek ?? 1}
//                   onChange={(e) =>
//                     handleSlotChange(index, "dayOfWeek", Number(e.target.value))
//                   }
//                   className="border rounded px-2 py-1 text-sm"
//                 >
//                   {days.map((label, i) => (
//                     <option key={i} value={i}>
//                       {label}
//                     </option>
//                   ))}
//                 </select>

//                 <div className="flex items-center gap-1 text-sm">
//                   <span>From</span>
//                   <input
//                     type="time"
//                     value={slot.startTime || "09:00"}
//                     onChange={(e) =>
//                       handleSlotChange(index, "startTime", e.target.value)
//                     }
//                     className="border rounded px-2 py-1"
//                   />
//                   <span>to</span>
//                   <input
//                     type="time"
//                     value={slot.endTime || "17:00"}
//                     onChange={(e) =>
//                       handleSlotChange(index, "endTime", e.target.value)
//                     }
//                     className="border rounded px-2 py-1"
//                   />
//                 </div>

//                 <div className="flex items-center gap-1 text-sm">
//                   <span>Session</span>
//                   <input
//                     type="number"
//                     min={15}
//                     step={15}
//                     value={slot.durationMin || 60}
//                     onChange={(e) =>
//                       handleSlotChange(
//                         index,
//                         "durationMin",
//                         Number(e.target.value)
//                       )
//                     }
//                     className="w-16 border rounded px-2 py-1"
//                   />
//                   <span>min</span>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSlot(index)}
//                   className="ml-auto text-xs text-red-500 hover:text-red-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={handleAddSlot}
//               className="px-3 py-2 border rounded-lg text-sm"
//             >
//               + Add Time Range
//             </button>
//             <button
//               type="button"
//               onClick={saveAvailability}
//               className="px-3 py-2 bg-[#1c1917] text-white rounded-lg text-sm"
//             >
//               Save Availability
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CounselorEditProfile;

// src/pages/CounselorEditProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CounselorEditProfile = () => {
  const { id } = useParams(); // counselorId
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    bio: "",
    specialization: "",
    experience: "",
    contactNumber: "",
    pricePerSession: 1000,
    timezone: "Asia/Colombo",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [availability, setAvailability] = useState({ slots: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [counselorRes, availabilityRes] = await Promise.all([
          API.get(`/counselors/${id}`),
          API.get(`/availability/${id}`),
        ]);

        const c = counselorRes.data.data;

        setForm({
          bio: c.bio || "",
          specialization: c.specialization || "",
          experience: c.experience || "",
          contactNumber: c.contactNumber || "",
          pricePerSession: c.pricePerSession || 1000,
          timezone: c.timezone || "Asia/Colombo",
        });

        // Set initial preview from existing profileImage (if any)
        // If your backend stores only a path (e.g. "/uploads/img.png"),
        // prepend your API host; adjust as needed.
        const img =
          c.profileImage && c.profileImage.startsWith("http")
            ? c.profileImage
            : c.profileImage
            ? `https://healpeer-backend.onrender.com${c.profileImage}`
            : "";
        setPreviewImage(img);

        setAvailability(availabilityRes.data.data || { slots: [] });
      } catch (err) {
        console.error("Failed to load counselor/availability:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("bio", form.bio);
      formData.append("specialization", form.specialization);
      formData.append("experience", form.experience);
      formData.append("contactNumber", form.contactNumber);
      formData.append("pricePerSession", form.pricePerSession);
      formData.append("timezone", form.timezone);

      // Attach file if user selected a new image
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      await API.put(`/profile/update`, formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated");
      navigate(`/counselor/${id}`);
    } catch (err) {
      console.error("Update profile failed:", err);
      alert("Failed to update profile");
    }
  };

  // Availability handlers
  const handleSlotChange = (index, field, value) => {
    setAvailability((prev) => {
      const updated = [...(prev.slots || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, slots: updated };
    });
  };

  const handleAddSlot = () => {
    setAvailability((prev) => ({
      ...prev,
      slots: [
        ...(prev.slots || []),
        { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", durationMin: 60 },
      ],
    }));
  };

  const handleRemoveSlot = (index) => {
    setAvailability((prev) => {
      const updated = [...(prev.slots || [])];
      updated.splice(index, 1);
      return { ...prev, slots: updated };
    });
  };

  const saveAvailability = async () => {
    try {
      await API.put(
        "/availability",
        { slots: availability.slots || [] },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      alert("Availability updated");
    } catch (err) {
      console.error("Save availability error:", err);
      alert("Failed to save availability");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f2ed]">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-stone-500 mb-4"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-serif mb-2">Edit Counselor Profile</h1>
        <p className="text-sm text-stone-500 mb-6">
          Update your public profile and manage your weekly availability.
        </p>

        {/* PROFILE FORM */}
        <form
          onSubmit={handleSubmitProfile}
          className="space-y-6 bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
        >
          {/* Profile image file */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image (File)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-24 h-24 rounded-lg object-cover border"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Specialization
            </label>
            <input
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. Clinical Psychologist, Couples Therapy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm min-h-[100px]"
              placeholder="Write a short introduction about your approach, experience, and what clients can expect."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Years of Experience
              </label>
              <input
                name="experience"
                type="number"
                min={0}
                value={form.experience}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Session Fee (LKR)
              </label>
              <input
                name="pricePerSession"
                type="number"
                min={0}
                value={form.pricePerSession}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="+94..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <input
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Asia/Colombo"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#1c1917] text-white text-sm font-bold"
            >
              Save Profile
            </button>
          </div>
        </form>

        {/* AVAILABILITY EDITOR */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h2 className="text-xl font-semibold mb-2">Weekly Availability</h2>
          <p className="text-sm text-gray-500 mb-4">
            Set the days and times you are available. Clients will only be able
            to book within these ranges. Real-time free slots (excluding
            existing bookings) are calculated automatically.
          </p>

          <div className="space-y-3 mb-4">
            {(availability.slots || []).length === 0 && (
              <div className="text-sm text-gray-500 border border-dashed rounded-lg p-3">
                No availability set. Add at least one time range.
              </div>
            )}

            {(availability.slots || []).map((slot, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center gap-3 border rounded-lg p-3"
              >
                <select
                  value={slot.dayOfWeek ?? 1}
                  onChange={(e) =>
                    handleSlotChange(index, "dayOfWeek", Number(e.target.value))
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  {days.map((label, i) => (
                    <option key={i} value={i}>
                      {label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1 text-sm">
                  <span>From</span>
                  <input
                    type="time"
                    value={slot.startTime || "09:00"}
                    onChange={(e) =>
                      handleSlotChange(index, "startTime", e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={slot.endTime || "17:00"}
                    onChange={(e) =>
                      handleSlotChange(index, "endTime", e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  />
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <span>Session</span>
                  <input
                    type="number"
                    min={15}
                    step={15}
                    value={slot.durationMin || 60}
                    onChange={(e) =>
                      handleSlotChange(
                        index,
                        "durationMin",
                        Number(e.target.value)
                      )
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                  <span>min</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSlot(index)}
                  className="ml-auto text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddSlot}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              + Add Time Range
            </button>
            <button
              type="button"
              onClick={saveAvailability}
              className="px-3 py-2 bg-[#1c1917] text-white rounded-lg text-sm"
            >
              Save Availability
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounselorEditProfile;