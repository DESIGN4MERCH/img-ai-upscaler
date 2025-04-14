
import { Scale3d } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2.5 rounded-md shadow-lg">
              <Scale3d className="w-6 h-6 text-white" />
              <div className="absolute -inset-0.5 rounded-md bg-white/20 blur-sm -z-10"></div>
            </div>
            <span className="font-bold text-xl">IMG AI Upscaler</span>
          </div>
          <p className="text-slate-400 text-center max-w-md">
            Enhance your images with cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/docs" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/support" className="text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} IMG AI Upscaler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
