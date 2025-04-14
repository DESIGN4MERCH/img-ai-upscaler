import { Scale3d } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2.5 rounded-md shadow-lg">
              <Scale3d className="w-6 h-6 text-white" />
              <div className="absolute -inset-0.5 rounded-md bg-white/20 blur-sm -z-10"></div>
            </div>
            <span className="font-bold text-xl">IMG AI Upscaler</span>
          </div>
          <p className="text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} IMG AI Upscaler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
