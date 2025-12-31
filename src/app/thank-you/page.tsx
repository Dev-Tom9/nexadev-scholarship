"use client";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, ArrowRight, PartyPopper } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center relative z-10 shadow-2xl"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              <CheckCircle className="text-white" size={48} />
            </motion.div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -top-2 -right-2 text-yellow-400"
            >
              <PartyPopper size={32} />
            </motion.div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
          Payment Confirmed!
        </h1>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Welcome to this session's cohort! Your registration for the <span className="text-white font-semibold">NexaDev Scholarship</span> is complete. 
          The final step is to join our onboarding community.
        </p>

        {/* Professional WhatsApp Button */}
        <div className="space-y-4">
          <a 
            href="https://chat.whatsapp.com/JFhUBK0yiwI3drVfWwegcA" // REPLAC THIS WITH YOUR REAL LINK
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] active:scale-95"
          >
            <MessageCircle size={24} />
            Join Onboarding Group
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <Link 
            href="/"
            className="block text-gray-500 hover:text-white transition-colors text-sm font-medium pt-4"
          >
            Return to Homepage
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">
            Admission Ref: NEXA-2026-APP
          </p>
        </div>
      </motion.div>
    </div>
  );
}