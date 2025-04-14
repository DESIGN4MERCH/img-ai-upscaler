
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Scale3d, Link2, Info, Lock, MessageSquareMore, FileWarning } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome to IMG AI Upscaler! Check your email to confirm your account.");
    }, 1500);
  };
  
  return <header className="border-b bg-white sticky top-0 z-10">
    <div className="container mx-auto px-30 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2.5 rounded-md shadow-lg">
          <Scale3d className="w-6 h-6 text-white" />
          <div className="absolute -inset-0.5 rounded-md bg-white/20 blur-sm -z-10"></div>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">IMG AI Upscaler</span>
          <span className="text-xs text-gray-500 -mt-1">HD Enhancement Engine</span>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink href="/docs" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md">
                    <FileWarning className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Documentation</div>
                      <p className="text-sm text-gray-500">Learn how to use our upscaler</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/api-docs" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md">
                    <Link2 className="w-5 h-5" />
                    <div>
                      <div className="font-medium">API Reference</div>
                      <p className="text-sm text-gray-500">Detailed API documentation</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/support" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md">
                    <MessageSquareMore className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Support</div>
                      <p className="text-sm text-gray-500">Get help with your questions</p>
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink href="/about" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md">
                    <Info className="w-5 h-5" />
                    <div>
                      <div className="font-medium">About Us</div>
                      <p className="text-sm text-gray-500">Learn about our mission</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/privacy" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md">
                    <Lock className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Privacy & Terms</div>
                      <p className="text-sm text-gray-500">Our policies and terms</p>
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      
      <div className="flex items-center">
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md"
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up Free"}
        </Button>
      </div>
    </div>
  </header>;
};

export default Header;
