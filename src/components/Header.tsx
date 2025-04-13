
import { Button } from "@/components/ui/button";

const Header = () => {
  return <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-30 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2.5 rounded-md shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6-6 6 6"></path>
              <path d="m6 15 6-6 6 6"></path>
              <path d="m6 21 6-6 6 6"></path>
            </svg>
            <div className="absolute -inset-0.5 rounded-md bg-white/20 blur-sm -z-10"></div>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">IMG AI Upscaler</span>
            <span className="text-xs text-gray-500 -mt-1">HD Enhancement Engine</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-700 hover:text-purple-600 transition-colors">Features</a>
          <a href="#examples" className="text-slate-700 hover:text-purple-600 transition-colors">Examples</a>
          <a href="#faq" className="text-slate-700 hover:text-purple-600 transition-colors">FAQ</a>
        </nav>
        
        <div className="flex items-center">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md">
            Sign Up Free
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;
