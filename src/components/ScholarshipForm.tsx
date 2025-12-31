"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, CheckCircle, ArrowRight, ArrowLeft, Laptop, Cpu, Globe, Terminal, Loader2 } from "lucide-react";

const countryData = [
  { id: "ng", code: "+234", name: "Nigeria" },
  { id: "gh", code: "+233", name: "Ghana" },
  { id: "ke", code: "+254", name: "Kenya" },
  { id: "za", code: "+27", name: "South Africa" },
  { id: "lr", code: "+231", name: "Liberia" },
  { id: "sl", code: "+232", name: "Sierra Leone" },
  { id: "rw", code: "+250", name: "Rwanda" },
  { id: "ug", code: "+256", name: "Uganda" },
  { id: "cm", code: "+237", name: "Cameroon" },
  { id: "ci", code: "+225", name: "Ivory Coast" },
  { id: "us", code: "+1", name: "USA" },
  { id: "gb", code: "+44", name: "UK" },
  { id: "ca", code: "+1", name: "Canada" },
  { id: "ae", code: "+971", name: "UAE" },
].sort((a, b) => a.name.localeCompare(b.name));

export default function ScholarshipForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set default values to empty strings so students must select them
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "", 
    phone: "",
    occupation: "",
    country: "", 
    city: "",
    course: "", 
    motivation: "",
    laptop: "" 
  });

  const nextStep = () => setStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all";

  const handleSubmit = async () => {
    // Basic validation to make sure they didn't leave placeholders selected
    if (!formData.countryCode || !formData.country || !formData.course) {
      alert("Please complete all selections before submitting.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...formData,
      firstName: formData.firstName.trim(),
      fullName: `${formData.firstName} ${formData.lastName}`,
      phone: `${formData.countryCode}${formData.phone}`,
      state: `${formData.city}, ${formData.country}` 
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        window.location.href = "/success";
      } else {
        alert("Submission unsuccessful. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="mb-6">
              <Loader2 className="text-blue-500" size={64} />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Processing Application</h2>
            <p className="text-gray-400 max-w-xs">Transmitting your details to the admissions team. Please do not close this window.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl transition-all">
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="st1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3"><User className="text-blue-500" size={24} /> Basic Information</h2>
                <p className="text-gray-400 mt-1">Start with your basic profile.</p>
              </header>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className={inputClass} value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  <input type="text" placeholder="Last Name" className={inputClass} value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <input type="email" placeholder="Professional Email" className={inputClass} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <div className="flex gap-4">
                  <select 
                    className="appearance-none bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-white w-32 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer" 
                    value={formData.countryCode} 
                    onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                  >
                    <option value="" disabled>Code</option>
                    {countryData.map(c => (
                      <option key={c.id} value={c.code} className="bg-[#1a1a1a]">{c.code} ({c.name})</option>
                    ))}
                  </select>
                  <input type="tel" placeholder="9012345678" className={inputClass} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="st2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <header>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3"><Globe className="text-blue-500" size={24} /> Location</h2>
                <p className="text-gray-400 mt-1">Where are you based?</p>
              </header>
              <div className="space-y-4">
                <input type="text" placeholder="Current Role (e.g. Student)" className={inputClass} value={formData.occupation} onChange={(e) => setFormData({...formData, occupation: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <select 
                    className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" 
                    value={formData.country} 
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="" disabled>Select Country</option>
                    {countryData.map(c => (
                      <option key={c.id} value={c.name} className="bg-[#1a1a1a]">{c.name}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  <input type="text" placeholder="City" className={inputClass} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="st3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <header><h2 className="text-2xl font-bold text-white flex items-center gap-3"><Cpu className="text-blue-500" size={24} /> Preferred Course</h2></header>
              <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500/50" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}>
                <option value="" disabled>Select a track</option>
                <option>Frontend Development</option>
                <option>Backend Development</option>
                <option>Mobile Architecture</option>
                <option>Python Essentials</option>
                <option>UI/UX Design</option>
              </select>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="st4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <header><h2 className="text-2xl font-bold text-white flex items-center gap-3"><Terminal className="text-blue-500" size={24} /> Why Tech?</h2></header>
              <textarea placeholder="Tell us about your technical goals..." className={`${inputClass} h-32 resize-none`} value={formData.motivation} onChange={(e) => setFormData({...formData, motivation: e.target.value})} />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="st5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <header><h2 className="text-2xl font-bold text-white flex items-center gap-3"><Laptop className="text-blue-500" size={24} /> Hardware Confirmation</h2></header>
              <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500/50" value={formData.laptop} onChange={(e) => setFormData({...formData, laptop: e.target.value})}>
                <option value="" disabled>Do you have a laptop?</option>
                <option>I have the required materials</option>
                <option>I do not have a laptop</option>
              </select>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center">
          {step > 1 ? (
            <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 hover:text-white transition font-medium"><ArrowLeft size={18} /> Back</button>
          ) : <div />}
          
          {step < 5 ? (
            <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-all">Continue <ArrowRight size={18} /></button>
          ) : (
            <button disabled={isSubmitting} onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl disabled:opacity-50">
              Submit Application <CheckCircle size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}