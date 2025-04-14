import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Scale3d, Sun, Moon, Link2, Info, FileWarning, Settings, HelpCircle } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  
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
        <div className="flex items-center gap-2">
          <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-2.5 rounded-md shadow-lg">
            <Scale3d className="w-6 h-6 text-white animate-pulse" />
            <div className="absolute -inset-0.5 rounded-md bg-white/20 blur-sm -z-10"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">IMG AI Upscaler</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">HD Enhancement Engine</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="#features" className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">
                      <Settings className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Image Enhancement</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Advanced AI upscaling features</p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="/docs" className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">
                      <FileWarning className="w-5 h-5" />
                      <div>
                        <div className="font-medium">API Documentation</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Learn how to integrate our API</p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="/about" className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">
                      <Info className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Our Story</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Learn about our mission</p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/blog" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-800 h-10 py-2 px-4">
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>API</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer" onClick={() => {
                      const apiKey = Math.random().toString(36).substring(2, 15);
                      toast.success(`Your API Key: ${apiKey}`);
                    }}>
                      <Link2 className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Get API Key</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Generate your API access key</p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
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
