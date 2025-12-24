

import React from "react";
import logo from "../assets/healpeer.png"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1120] text-slate-300 pt-20 pb-10 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- TOP SECTION: Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
          <img 
                src={logo} 
                alt="HealPeer" 
                className="h-[80px] w-[900px] object-cover drop-shadow-sm group-hover:scale-110 transition-transform duration-300" 
              />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering mental wellness through connection, professional therapy, and AI-driven insights. Your safe space, everywhere.
            </p>
            <div className="flex gap-4">
               <SocialIcon path="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" label="Facebook" />
               <SocialIcon path="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-2.46-3.14 4.48 4.48 0 00-2.12-1.53 4.48 4.48 0 00-2.12 1.53A4.48 4.48 0 007.5 7.5v.5a10.66 10.66 0 01-9-4.55 4.48 4.48 0 00-.6 2.26c0 1.55.79 2.92 2 3.74a4.48 4.48 0 01-2-.55v.06A4.48 4.48 0 005.5 13a4.48 4.48 0 01-2 .08 4.48 4.48 0 004.2 3.12 9 9 0 01-5.4 1.86 9 9 0 01-1-.06 12.72 12.72 0 006.9 2 12.72 12.72 0 006.6-1.14 12.72 12.72 0 004.1-3.44 12.72 12.72 0 001.4-4.66v-.57A9.1 9.1 0 0023 3z" label="Twitter" />
               <SocialIcon path="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a3 3 0 003-3V6a3 3 0 00-3-3h-9a3 3 0 00-3 3v12a3 3 0 003 3z" label="Instagram" />
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <FooterLink href="#">Find a Therapist</FooterLink>
              <FooterLink href="#">AI Companion</FooterLink>
              <FooterLink href="#">Journaling Tools</FooterLink>
              <FooterLink href="#">Peer Groups</FooterLink>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <FooterLink href="#">Our Story</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
            <p className="text-slate-400 text-sm mb-4">Weekly mental health tips and platform updates.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800/50 border border-slate-700 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              />
              <button className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium px-4 py-3 rounded-lg transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Copyright --- */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} HealPeer Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-xs text-slate-500">
             <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
             <span>All systems operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Helper Components for Clean Code ---

const FooterLink = ({ href, children }) => (
  <li>
    <a 
      href={href} 
      className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-1 group"
    >
      <span className="w-0 group-hover:w-2 h-[1px] bg-teal-400 transition-all duration-300"></span>
      {children}
    </a>
  </li>
);

const SocialIcon = ({ path, label }) => (
  <a 
    href="#" 
    aria-label={label}
    className="group bg-slate-800 p-2.5 rounded-full hover:bg-teal-600 transition-all duration-300 border border-slate-700 hover:border-teal-500"
  >
    <svg 
      fill="currentColor" 
      className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" 
      viewBox="0 0 24 24"
    >
      <path d={path}></path>
    </svg>
  </a>
);

export default Footer;