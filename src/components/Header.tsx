
import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
const Header = () => {
  return <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6-6 6 6"></path>
              <path d="m6 15 6-6 6 6"></path>
              <path d="m6 21 6-6 6 6"></path>
            </svg>
          </div>
          <span className="font-bold text-xl">IMG AI Upscaler</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-700 hover:text-purple-600 transition-colors">Features</a>
          <a href="#examples" className="text-slate-700 hover:text-purple-600 transition-colors">Examples</a>
          <a href="#faq" className="text-slate-700 hover:text-purple-600 transition-colors">FAQ</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-900">
            <Github size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-900">
            <Twitter size={20} />
          </a>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
            Sign Up Free
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;
