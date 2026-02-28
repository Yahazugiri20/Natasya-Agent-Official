import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Cpu, 
  Zap, 
  Shield, 
  MessageSquare, 
  Github, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X,
  Globe,
  Code,
  Terminal
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logoUrl = "https://i.postimg.cc/5NRKYNcF/unnamed-(3).jpg";

  // Menangani perubahan gaya navbar saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      title: "Fast Response",
      description: "Natasya is processed with the latest algorithms to provide answers in the blink of an eye."
    },
    {
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      title: "Smart Processing",
      description: "Capable of understanding complex conversational contexts with natural language processing technology."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Task Automation",
      description: "Automate your daily tasks from file management to external API integrations."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: "Guaranteed Privacy",
      description: "User data and privacy are our top priority with high-level encryption."
    }
  ];

  const stats = [
    { label: "Active Users", value: "10k+" },
    { label: "Messages Processed", value: "1M+" },
    { label: "GitHub Stars", value: "500+" },
    { label: "Uptime", value: "99.9%" }
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-purple-500/30 scroll-smooth">
      {/* Navigasi */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0c]/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src={logoUrl} 
              alt="Natasya Logo" 
              className="w-10 h-10 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20 object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=NA'; }}
            />
            <span className="text-xl font-bold tracking-tight text-white">Natasya<span className="text-purple-500">Agent</span></span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-purple-400 transition-colors font-medium">
                {link.name}
              </a>
            ))}
            <a 
              href="https://github.com/Yahazugiri20/Natasya-Agent-Official" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2 rounded-full flex items-center space-x-2 transition-all group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Tombol Menu Mobile */}
          <button 
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0d0d0f]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg py-2 border-b border-white/5">
                {link.name}
              </a>
            ))}
            <a 
              href="https://github.com/Yahazugiri20/Natasya-Agent-Official" 
              className="text-purple-400 font-bold py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        )}
      </nav>

      {/* Bagian Hero */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full mb-6 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Version 2.0 Now Available</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Smart AI Agent For <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Your Future</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Natasya Agent is a multi-purpose smart bot designed to simplify your communication and automation management through advanced API integration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <a 
                href="https://github.com/Yahazugiri20/Natasya-Agent-Official" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>Documentation</span>
              </a>
            </div>
          </div>

          {/* Mockup Terminal */}
          <div className="mt-20 relative max-w-5xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#16161a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#1e1e24] px-4 py-3 border-b border-white/10 flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-xs text-slate-500 font-mono flex-1 text-center">natasya-agent --terminal</div>
              </div>
              <div className="p-6 md:p-10 bg-[#0d0d0f]">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 font-mono text-sm">
                      <p className="text-green-400 tracking-tight">$ npm start natasya-agent</p>
                      <p className="text-purple-400 animate-pulse">{'>>'} Activating AI modules...</p>
                      <p className="text-blue-400">{'>>'} Connecting to database...</p>
                      <p className="text-slate-200">{'>>'} Natasya Agent is now <span className="text-green-500 font-bold">Online</span>.</p>
                      <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20 mt-4">
                        <p className="text-purple-300 italic">"Good morning! I am Natasya, your AI assistant. How can I help you today?"</p>
                      </div>
                    </div>
                    <div className="hidden md:flex justify-center">
                       <Bot className="w-48 h-48 text-purple-500/10 animate-pulse" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Statistik */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Fitur */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose Natasya?</h2>
            <p className="text-slate-400">We provide stable bot infrastructure with the most advanced features on the market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-[#16161a] border border-white/10 hover:border-purple-500/50 transition-all group hover:-translate-y-2 duration-300"
              >
                <div className="mb-6 p-3 bg-white/5 rounded-xl inline-block group-hover:bg-purple-500/20 transition-all group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Integrasi */}
      <section id="about" className="py-24 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Seamless Integration</h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                Natasya Agent supports various popular communication platforms. Build your own bot and connect to thousands of users worldwide with simple configuration.
              </p>
              
              <ul className="space-y-4">
                {[
                  "WhatsApp & Telegram API Integration",
                  "OpenAI & Gemini Support",
                  "File Upload Automation",
                  "NodeJS-Based Scripting"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-slate-300">
                    <div className="bg-purple-500/20 p-1 rounded-full">
                      <ChevronRight className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-all cursor-default">
                   <Globe className="w-10 h-10 text-blue-400 mb-4" />
                   <span className="font-bold text-white">Web-Based</span>
                </div>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-all cursor-default">
                   <Terminal className="w-10 h-10 text-purple-400 mb-4" />
                   <span className="font-bold text-white">CLI Tool</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-all cursor-default">
                   <Code className="w-10 h-10 text-green-400 mb-4" />
                   <span className="font-bold text-white">Clean Code</span>
                </div>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-all cursor-default">
                   <Shield className="w-10 h-10 text-red-400 mb-4" />
                   <span className="font-bold text-white">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-600 to-blue-600 p-[1px] rounded-3xl">
            <div className="bg-[#0a0a0c] p-12 md:p-16 rounded-[23px] flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
              <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                Download the source code now on GitHub and join our developer community. Make your bot automation dreams come true.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                 <a 
                   href="https://github.com/Yahazugiri20/Natasya-Agent-Official" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
                 >
                   <Github className="w-5 h-5" />
                   <span>View Repository</span>
                 </a>
                 <button className="px-10 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all">
                   Contact Developer
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
               <div className="flex items-center space-x-3">
                <img 
                  src={logoUrl} 
                  alt="Natasya Logo" 
                  className="w-8 h-8 rounded-full border border-purple-500 object-cover"
                />
                <span className="text-lg font-bold text-white tracking-tight">NatasyaAgent</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">© 2024 Natasya Agent Official. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a 
                 href="https://github.com/Yahazugiri20/Natasya-Agent-Official" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="hover:text-white transition-colors flex items-center space-x-1"
                >
                 <Github className="w-4 h-4" />
                 <span>GitHub</span>
               </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
