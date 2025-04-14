
import { Scale3d, Home, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2.5 rounded-md shadow-lg">
                <Scale3d className="w-6 h-6 text-white" />
                <div className="absolute -inset-0.5 rounded-md bg-white/20 blur-sm -z-10"></div>
              </div>
              <span className="font-bold text-xl">IMG AI Upscaler</span>
            </div>
            <p className="text-slate-400 text-sm">
              Transform your low-resolution images into stunning high-definition visuals using cutting-edge AI technology. Perfect for professionals and enthusiasts alike.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@imgupscaler.com" className="hover:text-white transition-colors">support@imgupscaler.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 AI Street, Tech City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} IMG AI Upscaler. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
