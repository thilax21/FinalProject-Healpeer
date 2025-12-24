


// import { useState } from "react";
// import API from "../api/api";

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await API.post("/chat", { messages: newMessages });
//       const botMsg = { role: "bot", text: res.data.reply };
//       setMessages([...newMessages, botMsg]);
//     } catch (err) {
//       console.error(err);
//       alert("Error contacting AI server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: "10px",
//           height: "400px",
//           overflowY: "auto",
//           marginBottom: "10px",
//         }}
//       >
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             style={{
//               textAlign: m.role === "user" ? "right" : "left",
//               margin: "5px 0",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 padding: "8px 12px",
//                 borderRadius: "15px",
//                 backgroundColor: m.role === "user" ? "#007bff" : "#f1f1f1",
//                 color: m.role === "user" ? "#fff" : "#000",
//               }}
//             >
//               {m.text}
//             </span>
//           </div>
//         ))}
//         {loading && <div><em>Bot is typing...</em></div>}
//       </div>

//       <input
//         type="text"
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         onKeyDown={e => e.key === "Enter" && sendMessage()}
//         placeholder="Type your message..."
//         style={{ width: "80%", padding: "10px", marginRight: "10px" }}
//       />
//       <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
//         Send
//       </button>
//     </div>
//   );
// }

// export default Chat;





// import React, { useState, useRef, useEffect } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Send, User, Bot, Sparkles, ArrowRight, 
//   Clock, Users, Zap, X, ShieldCheck, BrainCircuit 
// } from "lucide-react";

// // --- 🎨 VISUAL ASSETS ---

// const Grain = () => (
//   <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay"
//        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, filter: 'contrast(170%) brightness(100%)' }} />
// );

// const ThinkingDots = () => (
//   <div className="flex gap-1 p-2">
//     {[0, 1, 2].map((i) => (
//       <motion.div
//         key={i}
//         animate={{ y: [0, -5, 0] }}
//         transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
//         className="w-1.5 h-1.5 bg-stone-400 rounded-full"
//       />
//     ))}
//   </div>
// );

// // --- 💬 CHAT BUBBLE ---

// const Bubble = ({ role, text }) => {
//   const isUser = role === "user";
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10, scale: 0.98 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}
//     >
//       <div className={`flex max-w-[85%] gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
//         {/* Avatar */}
//         <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto shadow-sm ${
//           isUser ? "bg-[#1c1917] text-white" : "bg-[#f4f2ed] text-[#3f6212]"
//         }`}>
//           {isUser ? <User size={14} /> : <Bot size={14} />}
//         </div>
        
//         {/* Text */}
//         <div className={`p-4 text-[14px] leading-relaxed shadow-sm ${
//           isUser 
//             ? "bg-[#1c1917] text-white rounded-[1.5rem] rounded-br-none" 
//             : "bg-white border border-stone-100 text-stone-700 rounded-[1.5rem] rounded-bl-none"
//         }`}>
//           {text}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // --- 🧠 MAIN COMPONENT ---

// function Chat() {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([
//     { role: "bot", text: "Hello. I'm your AI companion. This space is private and secure. How are you feeling right now?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isExpired, setIsExpired] = useState(false);
  
//   const chatEndRef = useRef(null);

//   // ⏱️ 5-Minute Timer
//   useEffect(() => {
//     const timer = setTimeout(() => setIsExpired(true), 5 * 60 * 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   useEffect(scrollToBottom, [messages, loading]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newMessages = [...messages, { role: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await API.post("/chat", { messages: newMessages });
//       setMessages([...newMessages, { role: "bot", text: res.data.reply }]);
//     } catch {
//       setMessages([...newMessages, { role: "bot", text: "I'm having trouble reaching the server. Please try again." }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e7e5e4] flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans text-[#1c1917]">
//       <Grain />
      
//       {/* Background Elements */}
//       <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#3f6212] opacity-10 blur-[120px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-white opacity-40 blur-[100px] rounded-full pointer-events-none" />

//       {/* 🎴 MAIN CARD CONTAINER */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         className="w-full max-w-xl h-[85vh] max-h-[800px] bg-[#fcfbf9] rounded-[2.5rem] shadow-2xl border border-white/50 flex flex-col relative overflow-hidden z-10 top-35"
//       >
        
//         {/* --- HEADER --- */}
//         <header className="h-20 flex items-center justify-between px-6 border-b border-stone-100 bg-white/50 backdrop-blur-sm shrink-0">
//           <div className="flex items-center gap-3">
//             <div className="relative w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-[#3f6212]">
//               <BrainCircuit size={20} />
//               <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
//             </div>
//             <div>
//               <h1 className="font-serif font-bold text-lg leading-none">HealPeer AI</h1>
//               <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1 flex items-center gap-1">
//                 <ShieldCheck size={10} /> Secure Session
//               </div>
//             </div>
//           </div>
//           <button onClick={() => navigate(-1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600 transition-colors">
//             <X size={20} />
//           </button>
//         </header>

//         {/* --- CHAT AREA --- */}
//         <div className="flex-1 overflow-y-auto px-6 py-10 scrollbar-thin scrollbar-thumb-stone-200">
//           {messages.map((m, i) => <Bubble key={i} {...m} />)}
          
//           {loading && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-6">
//                <div className="w-8 h-8 rounded-full bg-[#f4f2ed] flex items-center justify-center text-[#3f6212]"><Bot size={14} /></div>
//                <div className="bg-white border border-stone-100 px-4 py-2 rounded-[1.5rem] rounded-bl-none">
//                  <ThinkingDots />
//                </div>
//             </motion.div>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* --- INPUT AREA --- */}
//         <div className="p-4 bg-white border-t border-stone-100 shrink-0">
//           <div className="relative flex items-center gap-2 bg-[#f4f2ed] rounded-[2rem] p-2 pr-2 border border-stone-200 focus-within:border-[#3f6212] focus-within:ring-2 focus-within:ring-[#3f6212]/10 transition-all">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               disabled={isExpired}
//               placeholder="Type your message..."
//               className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-sm text-[#1c1917] placeholder:text-stone-400"
//               autoFocus
//             />
//             <button
//               onClick={sendMessage}
//               disabled={!input.trim() || isExpired}
//               className="p-3 bg-[#1c1917] text-white rounded-full hover:bg-[#3f6212] transition-colors disabled:opacity-50 disabled:hover:bg-[#1c1917]"
//             >
//               <Send size={16} />
//             </button>
//           </div>
//           <div className="text-center mt-2">
//              <span className="text-[10px] text-stone-400 font-medium">AI can make mistakes.</span>
//           </div>
//         </div>

//         {/* --- 🛑 EXPIRATION OVERLAY (Inside the card) --- */}
//         <AnimatePresence>
//           {isExpired && (
//             <motion.div
//               initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
//               animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
//               className="absolute inset-0 z-20 bg-white/60 flex flex-col items-center justify-center p-8 text-center"
//             >
//               <motion.div 
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl border border-stone-100"
//               >
//                 <div className="w-16 h-16 bg-[#f4f2ed] rounded-full flex items-center justify-center text-[#3f6212] mx-auto mb-6">
//                   <Clock size={32} />
//                 </div>
                
//                 <h2 className="font-serif font-bold text-2xl mb-2">Time's Up</h2>
//                 <p className="text-sm text-stone-500 mb-8">
//                   Your free session has ended. To continue your journey, please verify your account or speak to a specialist.
//                 </p>

//                 <div className="space-y-3">
//                   <button
//                     onClick={() => navigate('/payment')}
//                     className="w-full flex items-center justify-between px-5 py-4 bg-[#1c1917] text-white rounded-xl hover:bg-[#3f6212] transition-colors group"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Zap size={18} className="text-yellow-400" />
//                       <div className="text-left">
//                         <div className="text-[10px] font-bold uppercase opacity-80">Unlimited AI</div>
//                         <div className="font-bold text-sm">Continue Chatting</div>
//                       </div>
//                     </div>
//                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                   </button>

//                   <button
//                     onClick={() => navigate('/counselors')}
//                     className="w-full flex items-center justify-between px-5 py-4 bg-white border border-stone-200 text-[#1c1917] rounded-xl hover:bg-stone-50 transition-colors group"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Users size={18} className="text-stone-400" />
//                       <div className="text-left">
//                         <div className="text-[10px] font-bold uppercase text-stone-400">Human Expert</div>
//                         <div className="font-bold text-sm">Book Counselor</div>
//                       </div>
//                     </div>
//                     <ArrowRight size={16} className="text-stone-300 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </motion.div>
//     </div>
//   );
// }

// export default Chat;


import React, { useState, useRef, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, User, Bot, Sparkles, ArrowRight, 
  Clock, Users, Zap, X, ShieldCheck, BrainCircuit 
} from "lucide-react";

// --- 🎨 VISUAL ASSETS ---

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay"
       style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, filter: 'contrast(170%) brightness(100%)' }} />
);

const ThinkingDots = () => (
  <div className="flex gap-1 p-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
        className="w-1.5 h-1.5 bg-stone-400 rounded-full"
      />
    ))}
  </div>
);

// --- 💬 CHAT BUBBLE ---

const Bubble = ({ role, text }) => {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }} // Faster animation to prevent layout shift feeling
      className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[85%] gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto shadow-sm ${
          isUser ? "bg-[#1c1917] text-white" : "bg-[#f4f2ed] text-[#3f6212]"
        }`}>
          {isUser ? <User size={14} /> : <Bot size={14} />}
        </div>
        
        {/* Text */}
        <div className={`p-4 text-[14px] leading-relaxed shadow-sm ${
          isUser 
            ? "bg-[#1c1917] text-white rounded-[1.5rem] rounded-br-none" 
            : "bg-white border border-stone-100 text-stone-700 rounded-[1.5rem] rounded-bl-none"
        }`}>
          {text}
        </div>
      </div>
    </motion.div>
  );
};

// --- 🧠 MAIN COMPONENT ---

function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello. I'm your AI companion. This space is private and secure. How are you feeling right now?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  
  const chatEndRef = useRef(null);

  // ⏱️ 5-Minute Timer
  useEffect(() => {
    const timer = setTimeout(() => setIsExpired(true), 5 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);

  // ⚡️ FIXED SCROLL LOGIC
  const scrollToBottom = () => {
    // Using 'nearest' prevents the whole container from jumping up
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: "user", text: input };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/chat", { messages: newMessages });
      setMessages([...newMessages, { role: "bot", text: res.data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "bot", text: "I'm having trouble reaching the server. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e7e5e4] flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans text-[#1c1917]">
      <Grain />
      
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#3f6212] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-white opacity-40 blur-[100px] rounded-full pointer-events-none" />

      {/* 🎴 MAIN CARD CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-400 h-[85vh] max-h-[850px] bg-[#fcfbf9] rounded-[2.5rem] shadow-2xl border border-white/50 flex flex-col relative overflow-hidden z-10 top-5"
      >
        
        {/* --- HEADER --- */}
        <header className="h-20 flex items-center justify-between px-6 border-b border-stone-100 bg-white/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-[#3f6212]">
              <BrainCircuit size={20} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
            <h1 className="text-[13vw] lg:text-[2rem] leading-[0.9] font-serif tracking-tighter text-[#1c1917] mb-6 -ml-1">
                 Heal<span className="font-light italic text-stone-400">Peer </span> AI
               </h1>
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1 flex items-center gap-1">
                <ShieldCheck size={10} /> Secure Session
              </div>
            </div>
          </div>
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600 transition-colors">
            <X size={20} />
          </button>
        </header>

        {/* --- CHAT AREA --- */}
        {/* Added 'flex flex-col' here to ensure messages stack properly */}
        <div className="flex-1 flex flex-col overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-stone-200">
          
          {/* Spacer to push messages to bottom if there are few */}
          <div className="flex-1"></div>

          {messages.map((m, i) => <Bubble key={i} {...m} />)}
          
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-full bg-[#f4f2ed] flex items-center justify-center text-[#3f6212]"><Bot size={14} /></div>
               <div className="bg-white border border-stone-100 px-4 py-2 rounded-[1.5rem] rounded-bl-none">
                 <ThinkingDots />
               </div>
            </motion.div>
          )}
          <div ref={chatEndRef} className="h-2" />
        </div>

        {/* --- INPUT AREA --- */}
        <div className="p-4 bg-white border-t border-stone-100 shrink-0">
          <div className="relative flex items-center gap-2 bg-[#f4f2ed] rounded-[2rem] p-2 pr-2 border border-stone-200 focus-within:border-[#3f6212] focus-within:ring-2 focus-within:ring-[#3f6212]/10 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isExpired}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-sm text-[#1c1917] placeholder:text-stone-400"
              autoFocus
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isExpired}
              className="p-3 bg-[#1c1917] text-white rounded-full hover:bg-[#3f6212] transition-colors disabled:opacity-50 disabled:hover:bg-[#1c1917]"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-2">
             <span className="text-[10px] text-stone-400 font-medium">AI can make mistakes.</span>
          </div>
        </div>

        {/* --- 🛑 EXPIRATION OVERLAY --- */}
        <AnimatePresence>
          {isExpired && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              className="absolute inset-0 z-20 bg-white/60 flex flex-col items-center justify-center p-8 text-center"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl border border-stone-100"
              >
                <div className="w-16 h-16 bg-[#f4f2ed] rounded-full flex items-center justify-center text-[#3f6212] mx-auto mb-6">
                  <Clock size={32} />
                </div>
                
                <h2 className="font-serif font-bold text-2xl mb-2">Time's Up</h2>
                <p className="text-sm text-stone-500 mb-8">
                  Your free session has ended. To continue your journey, please verify your account or speak to a specialist.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/payment-session')}
                    className="w-full flex items-center justify-between px-5 py-4 bg-[#1c1917] text-white rounded-xl hover:bg-[#3f6212] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Zap size={18} className="text-yellow-400" />
                      <div className="text-left">
                        <div className="text-[10px] font-bold uppercase opacity-80">Unlimited AI</div>
                        <div className="font-bold text-sm">Continue Chatting</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigate('/counselors')}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white border border-stone-200 text-[#1c1917] rounded-xl hover:bg-stone-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-stone-400" />
                      <div className="text-left">
                        <div className="text-[10px] font-bold uppercase text-stone-400">Human Expert</div>
                        <div className="font-bold text-sm">Book Counselor</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-stone-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

export default Chat;