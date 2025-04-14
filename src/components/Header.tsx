
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Home, Sun, Moon } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-10">
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center space-x-6 text-sm py-2">
          <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Use</a>
          <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
          <a href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Cookie Policy</a>
          <a href="/accessibility" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Accessibility</a>
          <a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Help Center</a>
        </nav>
      </div>
    </div>

    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2 rounded-md shadow-lg">
                <Home className="w-4 h-4 text-white" />
                <div className="absolute -inset-0.5 rounded-md bg-white/20 blur-sm -z-10"></div>
              </div>
            </Link>
            <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              IMG AI Upscaler
            </Link>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Features
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button 
                  onClick={() => scrollToSection('documentation')}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Documentation
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  About Us
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  to="/blog"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Blog
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  </header>;
};

export default Header;
