


import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { 
  MessageCircle, 
  Zap, 
  User, 
  ArrowRight, 
  ArrowUpRight,
  Sparkles,
  Fingerprint,
  Play,
  Menu,
  X
} from "lucide-react";

// --- 1. UTILS & VISUALS ---

const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
       style={{ 
         backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
         filter: 'contrast(170%) brightness(100%)'
       }} />
);

const FluidBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#f4f2ed]">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 15, -15, 0],
        x: [-20, 20, -20],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] bg-gradient-to-b from-[#dbece2] to-transparent rounded-full blur-[120px] opacity-60"
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        x: [20, -20, 20],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-t from-[#eaddd7] to-transparent rounded-full blur-[100px] opacity-50"
    />
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Button = ({ children, to, variant = "primary", className = "" }) => {
  const baseClass = "relative inline-flex items-center justify-center px-8 py-4 rounded-full overflow-hidden transition-transform active:scale-95 duration-200 group isolate";
  const variants = {
    primary: "bg-[#1c1917] text-[#f2f0e9]",
    outline: "border border-[#1c1917]/20 text-[#1c1917] hover:border-[#1c1917]",
    glass: "bg-white/40 backdrop-blur-md border border-white/50 text-[#1c1917] hover:bg-white/60"
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -z-10 bg-[#3f6212] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
      )}
    </>
  );

  if (to) {
    return <Link to={to} className={`${baseClass} ${variants[variant]} ${className}`}>{content}</Link>;
  }

  return <button className={`${baseClass} ${variants[variant]} ${className}`}>{content}</button>;
};

// --- 2. COMPONENTS ---


const StickyStepCard = ({ title, sub, icon: Icon, img, index, theme, linkText }) => {
  const styles = {
    light: { bg: 'bg-[#ffffff]', text: 'text-[#1c1917]', sub: 'text-stone-500', border: 'border-stone-200', pill: 'bg-stone-100 text-stone-600' },
    sage: { bg: 'bg-[#e6f4ea]', text: 'text-[#052e16]', sub: 'text-[#166534]', border: 'border-[#bbf7d0]', pill: 'bg-[#c6ebd5] text-[#14532d]' },
    dark: { bg: 'bg-[#1c1917]', text: 'text-[#f2f0e9]', sub: 'text-stone-400', border: 'border-stone-800', pill: 'bg-white/10 text-stone-300' },
  };
  const current = styles[theme];

  return (
    <div className="sticky top-28 md:top-36 mb-8 w-full max-w-[1100px] mx-auto px-4 sm:px-6">
      <motion.div 
        initial={{ y: 100, scale: 0.95, opacity: 0 }}
        whileInView={{ y: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border ${current.bg} ${current.border} min-h-[600px] flex flex-col lg:flex-row group`}
      >
        {/* Content Side */}
        <div className="p-8 md:p-12 lg:w-1/2 flex flex-col justify-between relative z-20 order-2 lg:order-1">
          <div>
            <div className="flex items-center justify-between mb-8">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl backdrop-blur-md shadow-sm border ${theme === 'dark' ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-stone-100 text-black'}`}>
                 <Icon size={24} strokeWidth={1.5} />
               </div>
               <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${current.pill}`}>Step 0{index}</span>
            </div>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-[1.1] tracking-tight ${current.text}`}>
              {title}
            </h2>
            
            <p className={`text-base md:text-lg leading-relaxed font-medium max-w-md ${current.sub}`}>
              {sub}
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-current border-opacity-10">
             <button className={`group flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors ${current.text} opacity-70 hover:opacity-100`}>
               {linkText} <span className="bg-current w-6 h-6 rounded-full flex items-center justify-center text-[10px] invert"><ArrowRight size={10} className="invert-0" /></span>
             </button>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative h-[250px] lg:h-auto lg:w-1/2 order-1 lg:order-2 overflow-hidden m-2 lg:m-3 rounded-[2rem]">
           <motion.div 
             className="absolute inset-0 w-full h-full"
             whileHover={{ scale: 1.05 }}
             transition={{ duration: 0.7 }}
           >
             <img src={img} alt={title} className="w-full h-full object-cover" />
             <div className={`absolute inset-0 mix-blend-multiply opacity-10 ${theme === 'dark' ? 'bg-black' : 'bg-[#aeae9d]'}`}></div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const LibraryCard = ({ title, cat, img }) => {
  return (
    <motion.div 
      className="w-[280px] md:w-[450px] aspect-[3/4] flex-shrink-0 relative group cursor-pointer overflow-hidden rounded-[1.5rem]"
    >
      <div className="absolute inset-0 bg-stone-200 animate-pulse" /> {/* Loading placeholder */}
      <motion.img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
         <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-3 flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]"></span> {cat}
         </div>
         <h3 className="text-3xl font-serif text-white leading-none">{title}</h3>
      </div>

      <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight size={18} />
      </div>
    </motion.div>
  );
};

// --- 3. MAIN PAGE ---

const Home = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]); // Adjusted translation for smoothness

  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white overflow-x-hidden relative">
      <GrainTexture />
      <FluidBackground />
  

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 lg:pt-0 px-4 md:px-8 overflow-hidden">
        <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative">
          
          <div className="lg:col-span-7 z-10 flex flex-col pt-12 lg:pt-0">
             <FadeIn>
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 w-fit">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Wait time: &lt; 30 seconds</span>
                </div>
             </FadeIn>

             <FadeIn delay={0.1}>
               <h1 className="text-[13vw] lg:text-[9rem] leading-[0.9] font-serif tracking-tighter text-[#1c1917] mb-6 -ml-1">
                 Heal<span className="font-light italic text-stone-400">Peer</span>
               </h1>
               
             </FadeIn>

             <FadeIn delay={0.2}>
               <p className="text-lg md:text-2xl text-stone-600 max-w-xl font-medium leading-relaxed mb-10">
                 The gap between <span className="text-[#1c1917] decoration-stone-300 underline decoration-1 underline-offset-4">AI speed</span> and <span className="text-[#1c1917] decoration-stone-300 underline decoration-1 underline-offset-4">Human empathy</span> is where healing happens. 
               </p>
             </FadeIn>

             <FadeIn delay={0.3} className="flex flex-wrap items-center gap-6">
               <Button to="/chat">Start CHAt</Button>
               <Link to="/register" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#1c1917] transition-colors">
                 Start Session <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
               </Link>
             </FadeIn>

             <FadeIn delay={0.5} className="mt-16 flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#f4f2ed] bg-stone-200 overflow-hidden shadow-sm">
                       <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt="user" className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex text-[#3f6212]">
                    {[...Array(5)].map((_, i) => <Sparkles key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-xs font-bold text-stone-400">Trusted by 10,000+ users</span>
                </div>
             </FadeIn>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 relative h-[50vh] lg:h-[85vh] lg:mt-20">
             <motion.div 
               initial={{ clipPath: 'inset(100% 0 0 0)' }}
               animate={{ clipPath: 'inset(0 0 0 0)' }}
               transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
               className="absolute inset-0 rounded-t-[10rem] lg:rounded-[5rem] overflow-hidden shadow-2xl"
             >
               <img src="https://i.pinimg.com/736x/d9/3d/cc/d93dcc4c245a3a68772bace2d53aaf5e.jpg" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" 
                    alt="Calmness" />
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#f4f2ed] via-transparent to-transparent opacity-20" />
             </motion.div>
             
             {/* Floating UI Element */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.2, duration: 0.8 }}
               className="absolute bottom-10 -left-4 md:-left-12 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] max-w-[300px] border border-white/50"
             >
               <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                     <Zap size={14} fill="currentColor" />
                   </div>
                   <span className="text-xs font-bold text-stone-900">AI Analysis</span>
                 </div>
                 <span className="text-[10px] font-mono text-stone-400">00:02s</span>
               </div>
               <div className="space-y-2">
                 <div className="h-2 bg-stone-100 rounded-full w-3/4" />
                 <div className="h-2 bg-stone-100 rounded-full w-1/2" />
               </div>
               <p className="mt-4 text-sm text-stone-600 leading-relaxed font-medium">"Your tone suggests overwhelm. Let's break this down together."</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-32 px-4">
           <FadeIn>
            <h2 className="text-5xl md:text-7xl font-serif text-[#1c1917] mb-8 tracking-tight">The <span className="italic font-light text-stone-400">5-Minute</span> Bridge</h2>
            <p className="text-xl text-stone-500 font-light leading-relaxed">
              Traditional therapy takes weeks to access. We built a hybrid system that responds in seconds, stabilizes you instantly, then guides you to long-term human care.
            </p>
           </FadeIn>
        </div>

        <div className="relative flex flex-col items-center w-full">
          {/* Connector Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-300 to-transparent -translate-x-1/2 hidden lg:block z-0"></div>

          <StickyStepCard 
            index="1"
            theme="light"
            icon={Sparkles}
            title="Vent Instantly"
            sub="Talk to our empathetic AI immediately to de-escalate stress. No forms, no waiting rooms—just release."
            linkText="Try Demo Chat"
            img="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1200&q=80"
          />

          <StickyStepCard 
            index="2"
            theme="sage"
            icon={Fingerprint}
            title="Intelligent Match"
            sub="While you chat, our system quietly analyzes your needs and communication style to find the 3 perfect human specialists for you."
            linkText="See Logic"
            img="https://images.unsplash.com/photo-1618335829737-2228915674e0?auto=format&fit=crop&w=1200&q=80"
          />

          <StickyStepCard 
            index="3"
            theme="dark"
            icon={User}
            title="Human Healing"
            sub="Connect with a licensed therapist who already understands your context. Skip the repetitive introductory sessions."
            linkText="Our Specialists"
            img="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
      </section>

      {/* --- HORIZONTAL SCROLL --- */}
      <section className="bg-[#100f0e] text-[#f2f0e9] py-4 overflow-hidden rounded-t-[3rem] relative">
        {/* Decorative grain for dark section */}
        <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        
        <div className="px-6 md:px-12 pt-24 mb-12 flex flex-col md:flex-row justify-between md:items-end gap-8 max-w-[1600px] mx-auto relative z-10">
           <div>
              <div className="text-[#3f6212] font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-[#3f6212]"></span> The Library
              </div>
              <h2 className="text-5xl md:text-8xl font-serif leading-none tracking-tight">Wellness <br/><span className="italic text-stone-500 font-light">Culture</span></h2>
           </div>
           <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black hover:border-transparent">
             Explore Full Library
           </Button>
        </div>

        {/* Scroll Container */}
        <div ref={scrollRef} className="relative h-[80vh]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div style={{ x }} className="flex gap-6 md:gap-10 pl-6 md:pl-12">
              
              <LibraryCard 
                title="The Art of Silence"
                cat="Journaling"
                img="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
              />
              <LibraryCard 
                title="Anxiety Anatomy"
                cat="Video Series"
                img="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
              />
              <LibraryCard 
                title="Sleep Science"
                cat="Audio Guide"
                img="https://images.unsplash.com/photo-1515890497046-27927f1d5d90?auto=format&fit=crop&w=800&q=80"
              />
               <LibraryCard 
                title="Cognitive Patterns"
                cat="Deep Dive"
                img="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
              />
               <LibraryCard 
                title="Modern Stoicism"
                cat="Philosophy"
                img="https://images.unsplash.com/photo-1499728603963-bc157d574f52?auto=format&fit=crop&w=800&q=80"
              />

            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-4 bg-[#f4f2ed]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-[#1c1917] mb-8">Ready to lighten the load?</h2>
          <p className="text-lg text-stone-500 mb-12 max-w-2xl mx-auto">Join thousands of others who have found their digital sanctuary. No credit card required for the initial assessment.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/register">Get Started Now</Button>
            {/* <Button variant="outline" to="/faq" className="border-stone-300 text-stone-600">Read FAQ</Button> */}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;