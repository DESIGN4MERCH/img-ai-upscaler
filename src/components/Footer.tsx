import { Github, Twitter, Instagram, FileText, Shield, HelpCircle, Info } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6-6 6 6"></path>
                  <path d="m6 15 6-6 6 6"></path>
                  <path d="m6 21 6-6 6 6"></path>
                </svg>
              </div>
              <span className="font-bold text-xl">IMG AI Upscaler</span>
            </div>
            <p className="text-slate-400 mb-4">
              Enhance your images with cutting-edge AI technology
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Showcase</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-800">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="#" className="flex items-center text-slate-400 hover:text-white transition-colors">
              <FileText className="mr-2 h-4 w-4" />
              <span>Terms of Use</span>
            </a>
            <a href="#" className="flex items-center text-slate-400 hover:text-white transition-colors">
              <Shield className="mr-2 h-4 w-4" />
              <span>Privacy Policy</span>
            </a>
            <a href="#" className="flex items-center text-slate-400 hover:text-white transition-colors">
              <Info className="mr-2 h-4 w-4" />
              <span>Cookie Policy</span>
            </a>
            <a href="#" className="flex items-center text-slate-400 hover:text-white transition-colors">
              <FileText className="mr-2 h-4 w-4" />
              <span>Accessibility</span>
            </a>
            <a href="#" className="flex items-center text-slate-400 hover:text-white transition-colors">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-4 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} IMG AI Upscaler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
