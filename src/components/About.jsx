import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, 
  Shield, 
  BookOpen, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";

// --- Visual Utils ---

const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
       style={{ 
         backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
         filter: 'contrast(170%) brightness(100%)'
       }} />
);

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="w-12 h-12 bg-[#f4f2ed] rounded-2xl flex items-center justify-center text-[#3f6212] mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-serif font-bold text-[#1c1917] mb-3">{title}</h3>
    <p className="text-stone-500 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

// --- Main Component ---

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f4f2ed] text-[#1c1917] font-sans selection:bg-[#3f6212] selection:text-white relative overflow-hidden">
      <GrainTexture />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center relative z-10">
        <FadeIn>
          <span className="inline-block px-4 py-1.5 rounded-full border border-stone-200 bg-white/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 tracking-tight leading-[0.9]">
            Healing starts with <br />
            <span className="italic text-stone-400 font-light">Connection.</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Your safe space for mental wellbeing, professional counseling, and personal growth. We bridge the gap between modern technology and human empathy.
          </p>
        </FadeIn>
      </section>

      {/* --- IMAGE / MISSION SPLIT --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2400&auto=format&fit=crop" 
                alt="Community Support" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl font-serif mb-6">Our Mission</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              At HealPeer, we are committed to making mental health care accessible, supportive, and empowering for everyone.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed mb-10">
              In a world that often feels disconnected, we strive to create a compassionate community where every individual can feel heard, guided, and supported on their journey to wellness.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-serif font-bold text-[#3f6212]">10k+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Lives Impacted</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-serif font-bold text-[#3f6212]">500+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Certified Experts</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-20 px-6 bg-[#fff] rounded-[3rem] my-12 mx-4 shadow-sm border border-stone-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-4">What We Offer</h2>
              <p className="text-stone-500">Comprehensive tools for your mental journey.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn delay={0.1}>
              <ServiceCard 
                icon={Users}
                title="Counseling"
                description="Connect with certified counselors for personalized guidance tailored to your needs."
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <ServiceCard 
                icon={Shield}
                title="Private Chat"
                description="Secure, end-to-end encrypted chat with your counselor to share thoughts anytime."
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <ServiceCard 
                icon={BookOpen}
                title="The Journal"
                description="Learn from expert-written articles and real stories to improve self-awareness."
              />
            </FadeIn>
            <FadeIn delay={0.4}>
              <ServiceCard 
                icon={Calendar}
                title="Easy Booking"
                description="Book sessions effortlessly with our integrated system, giving you peace of mind."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- VALUES / WHY CHOOSE US --- */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <FadeIn>
          <div className="bg-[#1c1917] rounded-[3rem] p-12 md:p-20 text-[#f2f0e9] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3f6212] rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-serif mb-6">Why Choose HealPeer?</h2>
                <p className="text-white/60 leading-relaxed">
                  We aren't just a platform; we are a sanctuary. We prioritize your privacy, safety, and the quality of care above all else.
                </p>
                
                <Link 
                  to="/register"
                  className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[#f2f0e9] text-[#1c1917] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-transform hover:scale-105"
                >
                  Start Your Journey <ArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  "Certified & Vetted Experts",
                  "100% Anonymous & Secure",
                  "24/7 Support Availability",
                  "Holistic Wellness Resources"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-full bg-[#3f6212] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="pb-24 pt-12 text-center px-6">
        <FadeIn>
           <Sparkles className="mx-auto text-[#3f6212] mb-6" size={32} />
           <h2 className="text-4xl font-serif text-[#1c1917] mb-4">Ready to lighten the load?</h2>
           <p className="text-stone-500 mb-8">Join our community today.</p>
           <Link to="/register" className="text-sm font-bold uppercase tracking-widest border-b border-[#1c1917] pb-1 hover:text-[#3f6212] hover:border-[#3f6212] transition-colors">
             Create Free Account
           </Link>
        </FadeIn>
      </section>
    </div>
  );
};

export default AboutPage;