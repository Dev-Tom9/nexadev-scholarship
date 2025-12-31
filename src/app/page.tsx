import ScholarshipForm from "@/components/ScholarshipForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      {/* Mesh Background Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* Navbar-style Header */}
        <div className="flex items-center gap-2 mb-12 opacity-80">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">N</div>
          <span className="text-xl font-bold tracking-tight uppercase">NexaDev <span className="text-blue-500">Academy</span></span>
        </div>

        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Build the future <br /> of Software.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Apply for the NexaDev Scholarship. Intensive mentorship for high-potential developers.
          </p>
        </div>

        {/* The Form Container */}
        <div className="w-full flex justify-center">
          <ScholarshipForm />
        </div>

        <footer className="mt-20 py-10 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 NexaDev Academy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Curriculum</a>
            <a href="#" className="hover:text-white transition">Mentors</a>
            <a href="#" className="hover:text-white transition">Alumni</a>
          </div>
        </footer>
      </div>
    </main>
  );
}