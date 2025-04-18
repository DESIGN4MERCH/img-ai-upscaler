
import { Button } from "@/components/ui/button";
import { Home, Sun, Moon, Scale3d } from "lucide-react";
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-4">
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2 rounded-md shadow-lg">
              <Scale3d className="w-5 h-5 text-white" />
              <div className="absolute -inset-0.5 rounded-md bg-white/20 blur-sm -z-10"></div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              IMG AI Upscaler
            </span>
          </Link>
        </div>
        
        <div className="flex items-center justify-between">
          <NavigationMenu className="mr-2">
            <NavigationMenuList className="flex flex-wrap md:flex-nowrap space-x-1 md:space-x-6">
              <NavigationMenuItem className="flex items-center">
                <Link 
                  to="/"
                  className="flex items-center justify-center p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Home className="w-4 h-4" />
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Features
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button 
                  onClick={() => scrollToSection('documentation')}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Documentation
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  About Us
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  to="/blog"
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Blog
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
    </div>
  </header>;
};

export default Header;
