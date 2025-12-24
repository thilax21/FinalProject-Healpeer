



// import React, { useState, useEffect } from 'react';
// import API from '../api/api';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   User, 
//   Mail, 
//   Lock, 
//   Briefcase, 
//   FileText, 
//   Phone, 
//   Award, 
//   UploadCloud, 
//   ArrowLeft, 
//   Loader2, 
//   CheckCircle,
//   Stethoscope,
//   Heart
// } from 'lucide-react';

// // --- Visual Utils ---

// const GrainTexture = () => (
//   <div
//     className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
//     style={{
//       backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
//       filter: 'contrast(170%) brightness(100%)',
//     }}
//   />
// );

// const InputField = ({ icon: Icon, ...props }) => (
//   <div className="relative group">
//     <div className="absolute left-0 top-4 text-stone-400 group-focus-within:text-[#3f6212] transition-colors">
//       <Icon size={18} />
//     </div>
//     <input
//       className="w-full bg-transparent border-b border-stone-200 py-4 pl-8 pr-4 text-[#1c1917] placeholder-stone-400 outline-none focus:border-[#1c1917] transition-all duration-300 font-medium"
//       {...props}
//     />
//   </div>
// );

// // --- Main Component ---

// const Register = () => {
//   const { role: paramRole } = useParams();
//   const navigate = useNavigate();

//   // State
//   const [role, setRole] = useState(paramRole || 'client');
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     bio: '',
//     specialization: '',
//     experience: '',
//     contactNumber: '',
//   });

//   // NEW: errors per field
//   const [errors, setErrors] = useState({});

//   // Sync role if URL param changes
//   useEffect(() => {
//     if (paramRole) setRole(paramRole);
//   }, [paramRole]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     // clear individual field error when user types
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (selected) {
//       setFile(selected);
//       setPreviewUrl(URL.createObjectURL(selected));
//     }
//   };

//   // VALIDATION
//   const validateForm = () => {
//     const newErrors = {};

//     // Name
//     if (!form.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (form.name.trim().length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     }

//     // Email
//     if (!form.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(form.email.trim())) {
//         newErrors.email = 'Please enter a valid email address';
//       }
//     }

//     // Password
//     if (!form.password) {
//       newErrors.password = 'Password is required';
//     } else if (form.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     // Counselor-specific fields
//     if (role === 'counselor') {
//       if (!form.specialization.trim()) {
//         newErrors.specialization = 'Specialization is required for counselors';
//       }
//       if (!form.experience.trim()) {
//         newErrors.experience = 'Experience is required for counselors';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // run validation first
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       // Append all text fields
//       Object.keys(form).forEach((key) => {
//         formData.append(key, form[key]);
//       });

//       // Explicitly append role & file
//       formData.append('role', role);
//       if (file) formData.append('profileImage', file);

//       // Single API call for everything
//       await API.post('/auth/signup', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       // Success & Redirect
//       setTimeout(() => navigate('/login'), 1000);
//     } catch (err) {
//       console.error(err);
//       alert(
//         err.response?.data?.message ||
//           'Registration failed. Please try again.'
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-20 bg-[#f4f2ed] font-sans selection:bg-[#3f6212] selection:text-white relative overflow-x-hidden flex">
//       <GrainTexture />

//       {/* --- LEFT: Form Section --- */}
//       <div className="w-full lg:w-[50%] xl:w-[45%] min-h-screen flex flex-col px-6 sm:px-12 lg:px-20 py-12 relative z-10 bg-[#f4f2ed]">
//         <Link
//           to="/"
//           className="w-fit flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors mb-8"
//         >
//           <ArrowLeft size={14} /> Back Home
//         </Link>

//         <div className="max-w-lg w-full mx-auto flex-grow flex flex-col justify-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-serif text-[#1c1917] mb-4 tracking-tight">
//               Create Account
//             </h1>
//             <p className="text-stone-500 mb-8">
//               Join our community and start your journey.
//             </p>

//             {/* Role Switcher */}
//             <div className="bg-stone-200/50 p-1 rounded-full flex mb-8 w-full max-w-sm">
//               <button
//                 type="button"
//                 onClick={() => setRole('client')}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
//                   role === 'client'
//                     ? 'bg-white shadow-md text-[#1c1917]'
//                     : 'text-stone-500 hover:text-stone-700'
//                 }`}
//               >
//                 <Heart size={14} /> Patient
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setRole('counselor')}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
//                   role === 'counselor'
//                     ? 'bg-white shadow-md text-[#1c1917]'
//                     : 'text-stone-500 hover:text-stone-700'
//                 }`}
//               >
//                 <Stethoscope size={14} /> Counselor
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//               <div className="grid grid-cols-1 gap-5">
//                 <div>
//                   <InputField
//                     icon={User}
//                     name="name"
//                     placeholder="Full Name"
//                     value={form.name}
//                     onChange={handleChange}
//                   />
//                   {errors.name && (
//                     <p className="mt-1 text-xs text-red-500">{errors.name}</p>
//                   )}
//                 </div>

//                 <div>
//                   <InputField
//                     icon={Mail}
//                     name="email"
//                     type="email"
//                     placeholder="Email Address"
//                     value={form.email}
//                     onChange={handleChange}
//                   />
//                   {errors.email && (
//                     <p className="mt-1 text-xs text-red-500">{errors.email}</p>
//                   )}
//                 </div>

//                 <div>
//                   <InputField
//                     icon={Lock}
//                     name="password"
//                     type="password"
//                     placeholder="Create Password"
//                     value={form.password}
//                     onChange={handleChange}
//                   />
//                   {errors.password && (
//                     <p className="mt-1 text-xs text-red-500">
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Dynamic Counselor Fields */}
//               <AnimatePresence>
//                 {role === 'counselor' && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     className="overflow-hidden space-y-5 pt-2"
//                   >
//                     <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-5">
//                       <h3 className="text-sm font-bold uppercase tracking-widest text-[#3f6212] mb-2">
//                         Professional Profile
//                       </h3>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <InputField
//                             icon={Briefcase}
//                             name="specialization"
//                             placeholder="Specialization"
//                             value={form.specialization}
//                             onChange={handleChange}
//                           />
//                           {errors.specialization && (
//                             <p className="mt-1 text-xs text-red-500">
//                               {errors.specialization}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <InputField
//                             icon={Award}
//                             name="experience"
//                             placeholder="Years Exp."
//                             value={form.experience}
//                             onChange={handleChange}
//                           />
//                           {errors.experience && (
//                             <p className="mt-1 text-xs text-red-500">
//                               {errors.experience}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <InputField
//                         icon={Phone}
//                         name="contactNumber"
//                         placeholder="Work Phone"
//                         value={form.contactNumber}
//                         onChange={handleChange}
//                       />

//                       <InputField
//                         icon={FileText}
//                         name="bio"
//                         placeholder="Short Bio / Methodology"
//                         value={form.bio}
//                         onChange={handleChange}
//                       />

//                       {/* Custom Image Upload */}
//                       <div className="mt-4">
//                         <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
//                           Profile Photo
//                         </label>
//                         <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:bg-stone-50 hover:border-stone-400 transition-all group">
//                           {previewUrl ? (
//                             <div className="relative w-full h-full overflow-hidden rounded-xl">
//                               <img
//                                 src={previewUrl}
//                                 alt="Preview"
//                                 className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
//                               />
//                               <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
//                                 Change Photo
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                               <UploadCloud className="w-8 h-8 text-stone-400 mb-2 group-hover:scale-110 transition-transform" />
//                               <p className="text-xs text-stone-500">
//                                 Click to upload image
//                               </p>
//                             </div>
//                           )}
//                           <input
//                             type="file"
//                             className="hidden"
//                             onChange={handleFileChange}
//                             accept="image/*"
//                           />
//                         </label>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full mt-8 bg-[#1c1917] text-[#f2f0e9] h-14 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#3f6212] active:scale-[0.98] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <Loader2 className="animate-spin" size={18} />
//                 ) : (
//                   'Complete Registration'
//                 )}
//               </button>

//               <p className="text-center text-stone-500 text-sm mt-6">
//                 Already have an account?{' '}
//                 <Link
//                   to="/login"
//                   className="text-[#1c1917] font-bold hover:underline underline-offset-4"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </form>
//           </motion.div>
//         </div>
//       </div>

//       {/* --- RIGHT: Visual Section (Desktop) --- */}
//       <div className="hidden lg:block w-[50%] xl:w-[55%] fixed right-0 top-0 bottom-0 bg-[#1c1917]">
//         <div className="absolute inset-0">
//           <img
//             src={
//               role === 'client'
//                 ? 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2400&auto=format&fit=crop'
//                 : 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2400&auto=format&fit=crop'
//             }
//             alt="Background"
//             className="w-full h-full object-cover opacity-60 transition-opacity duration-700"
//           />
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1c1917]/40 to-[#1c1917] mix-blend-multiply" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-transparent to-transparent" />
//         </div>

//         <div className="absolute bottom-24 left-16 max-w-lg z-20 text-[#f2f0e9]">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={role}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="w-12 h-1 bg-[#3f6212] mb-6"></div>
//               <h2 className="text-5xl font-serif leading-tight mb-6">
//                 {role === 'client'
//                   ? 'Your sanctuary for growth and healing.'
//                   : 'Empower others on their journey to wellness.'}
//               </h2>
//               <div className="flex items-center gap-4 text-sm opacity-70 font-medium tracking-wide">
//                 <span className="flex items-center gap-2">
//                   <CheckCircle size={16} className="text-[#3f6212]" /> Secure &
//                   Private
//                 </span>
//                 <span className="flex items-center gap-2">
//                   <CheckCircle size={16} className="text-[#3f6212]" /> 24/7
//                   Support
//                 </span>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Briefcase, 
  FileText, 
  Phone, 
  Award, 
  UploadCloud, 
  ArrowLeft, 
  Loader2, 
  CheckCircle,
  Stethoscope,
  Heart
} from 'lucide-react';

// --- Visual Utils ---

const GrainTexture = () => (
  <div
    className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      filter: 'contrast(170%) brightness(100%)',
    }}
  />
);

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-0 top-4 text-stone-400 group-focus-within:text-[#3f6212] transition-colors">
      <Icon size={18} />
    </div>
    <input
      className="w-full bg-transparent border-b border-stone-200 py-4 pl-8 pr-4 text-[#1c1917] placeholder-stone-400 outline-none focus:border-[#1c1917] transition-all duration-300 font-medium"
      {...props}
    />
  </div>
);

// --- Main Component ---

const Register = () => {
  const { role: paramRole } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState(paramRole || 'client');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    specialization: '',
    experience: '',
    contactNumber: '',
  });

  const [errors, setErrors] = useState({});

  // Sync role if URL param changes
  useEffect(() => {
    if (paramRole) setRole(paramRole);
  }, [paramRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (role === 'counselor') {
      if (!form.specialization.trim()) {
        newErrors.specialization = 'Specialization is required for counselors';
      }
      if (!form.experience.trim()) {
        newErrors.experience = 'Experience is required for counselors';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append('role', role);
      if (file) formData.append('profileImage', file);

      await API.post('/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          'Registration failed. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed] font-sans selection:bg-[#3f6212] selection:text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <GrainTexture />

      {/* Center Card (two-panel layout like the model) */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.25)] overflow-hidden flex flex-col md:flex-row">
        {/* LEFT PANEL: Welcome + Image (using your existing colors & images) */}
        <div className="relative w-full md:w-[45%] bg-[#1c1917] text-[#f2f0e9]">
          <div className="absolute inset-0">
            <img
              src={
                role === 'client'
                  ? 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2400&auto=format&fit=crop'
                  : 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2400&auto=format&fit=crop'
              }
              alt="Background"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1c1917] via-[#1c1917]/80 to-transparent mix-blend-multiply" />
          </div>

          <div className="relative px-8 py-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-10">
                <div className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-xs font-bold tracking-[0.24em]">
                  HP
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                  HealPeer
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Welcome Page
              </h2>
              <p className="text-sm text-white/80 max-w-xs">
                {role === 'client'
                  ? 'Sign in to continue access and connect with trusted counselors.'
                  : 'Create your counselor account to support people on their healing journey.'}
              </p>
            </div>

            <div className="mt-10 text-[11px] text-white/60">
              <p className="mb-1">www.yoursite.com</p>
              <p>Secure & private • 24/7 support</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Form (your existing form & validation) */}
        <div className="w-full md:w-[55%] bg-[#f4f2ed] px-6 sm:px-10 py-8 md:py-10 relative">
          <Link
            to="/"
            className="absolute top-5 right-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-[#1c1917] transition-colors"
          >
            <ArrowLeft size={12} /> Back Home
          </Link>

          <div className="max-w-lg w-full mx-auto mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl font-serif text-[#1c1917] mb-2 tracking-tight">
                Sign Up
              </h1>
              <p className="text-xs text-stone-500 mb-6">
                Join our community and start your journey.
              </p>

              {/* Role Switcher */}
              <div className="bg-stone-200/50 p-1 rounded-full flex mb-6 w-full max-w-sm">
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${
                    role === 'client'
                      ? 'bg-white shadow-md text-[#1c1917]'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  <Heart size={12} /> Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole('counselor')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${
                    role === 'counselor'
                      ? 'bg-white shadow-md text-[#1c1917]'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  <Stethoscope size={12} /> Counselor
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <InputField
                      icon={User}
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <InputField
                      icon={Mail}
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <InputField
                      icon={Lock}
                      name="password"
                      type="password"
                      placeholder="Create Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* Counselor extra fields */}
                <AnimatePresence>
                  {role === 'counselor' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-5  pt-1 mt-1"
                    >
                      <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-4">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#3f6212] mb-1">
                          Professional Profile
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <InputField
                              icon={Briefcase}
                              name="specialization"
                              placeholder="Specialization"
                              value={form.specialization}
                              onChange={handleChange}
                            />
                            {errors.specialization && (
                              <p className="mt-1 text-xs text-red-500">
                                {errors.specialization}
                              </p>
                            )}
                          </div>

                          <div>
                            <InputField
                              icon={Award}
                              name="experience"
                              placeholder="Years Exp."
                              value={form.experience}
                              onChange={handleChange}
                            />
                            {errors.experience && (
                              <p className="mt-1 text-xs text-red-500">
                                {errors.experience}
                              </p>
                            )}
                          </div>
                        </div>

                        <InputField
                          icon={Phone}
                          name="contactNumber"
                          placeholder="Work Phone"
                          value={form.contactNumber}
                          onChange={handleChange}
                        />

                        <InputField
                          icon={FileText}
                          name="bio"
                          placeholder="Short Bio / Methodology"
                          value={form.bio}
                          onChange={handleChange}
                        />

                        {/* Image upload */}
                        <div className="mt-2">
                          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-2">
                            Profile Photo
                          </label>
                          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:bg-stone-50 hover:border-stone-400 transition-all group">
                            {previewUrl ? (
                              <div className="relative w-full h-full overflow-hidden rounded-xl">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                                  Change Photo
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center pt-4 pb-4">
                                <UploadCloud className="w-7 h-7 text-stone-400 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-[11px] text-stone-500">
                                  Click to upload image
                                </p>
                              </div>
                            )}
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                              accept="image/*"
                            />
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-[#1c1917] text-[#f2f0e9] h-12 rounded-full font-bold uppercase tracking-[0.22em] text-[11px] hover:bg-[#3f6212] active:scale-[0.98] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    'Complete Registration'
                  )}
                </button>

                <p className="text-center text-stone-500 text-xs mt-4">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-[#1c1917] font-bold hover:underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;