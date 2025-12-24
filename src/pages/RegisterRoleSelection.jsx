

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle2, 
  Circle,
  ArrowLeft
} from "lucide-react";

// --- Visual Components ---

const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
       style={{ 
         backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
         filter: 'contrast(170%) brightness(100%)'
       }} />
);

const RoleCard = ({ id, title, subtitle, icon: Icon, selected, onClick }) => {
  return (
    <motion.div
      layout
      onClick={() => onClick(id)}
      className={`
        relative flex flex-col items-start p-8 rounded-[2rem] cursor-pointer transition-all duration-300 border-2
        ${selected 
          ? 'bg-white border-[#3f6212] shadow-[0_20px_40px_-10px_rgba(63,98,18,0.15)]' 
          : 'bg-white/40 border-transparent hover:bg-white/80 hover:border-stone-200 hover:shadow-lg'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-full flex justify-between items-start mb-6">
        <div className={`
          w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-colors duration-300
          ${selected ? 'bg-[#3f6212] text-white' : 'bg-stone-100 text-stone-400'}
        `}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        
        <div className="text-[#3f6212]">
          {selected ? <CheckCircle2 size={28} fill="currentColor" className="text-white" /> : <Circle size={28} className="text-stone-300" />}
        </div>
      </div>

      <h3 className={`text-2xl font-serif mb-2 transition-colors ${selected ? 'text-[#1c1917]' : 'text-stone-600'}`}>
        {title}
      </h3>
      <p className="text-sm font-medium text-stone-500 leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
};

// --- Main Component ---

const RegisterRoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("client");
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the unified register page, passing the role in the URL
    navigate(`/register/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white overflow-hidden relative flex flex-col items-center justify-center p-6">
      <GrainTexture />
      
      {/* Top Navigation */}
      <nav className="absolute top-8 left-8 z-20">
         <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors">
          <ArrowLeft size={14} /> Back Home
        </Link>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl w-full relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-stone-200 bg-white/50 text-[10px] font-bold uppercase tracking-widest text-stone-500">
            Step 01 of 02
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-[#1c1917]">
            Who are <span className="italic text-stone-400 font-light">you?</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-lg mx-auto leading-relaxed">
            Select your role to begin. We tailor the HealPeer experience to fit your specific needs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <RoleCard 
            id="client"
            title="I am a client"
            subtitle="I'm looking for support, a safe space to vent, or professional counseling for my mental well-being."
            icon={Heart}
            selected={selectedRole === "client"}
            onClick={setSelectedRole}
          />

          <RoleCard 
            id="counselor"
            title="I am a Counselor"
            subtitle="I am a certified professional looking to offer my expertise and help others heal."
            icon={Stethoscope}
            selected={selectedRole === "counselor"}
            onClick={setSelectedRole}
          />
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center gap-6">
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden px-10 py-5 rounded-full bg-[#1c1917] text-[#f2f0e9] shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
              Continue <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
            {/* Hover Effect */}
            <div className="absolute inset-0 -z-10 bg-[#3f6212] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
          </motion.button>

          <p className="text-xs text-stone-400 font-medium">
            Already have an account? <Link to="/login" className="text-[#1c1917] underline decoration-stone-300 underline-offset-4 hover:decoration-[#1c1917] transition-all">Log in here</Link>
          </p>
        </div>

      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-stone-200 to-transparent rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tl from-[#dcfce7] to-transparent rounded-full blur-[120px] opacity-40" />
      </div>
    </div>
  );
};

export default RegisterRoleSelection;
