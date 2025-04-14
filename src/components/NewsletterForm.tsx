
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-purple-100/80 to-blue-100/80 dark:from-purple-900/10 dark:to-blue-900/10 p-8 rounded-xl shadow-lg my-8">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
        <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get exclusive insights, tips, and strategies to grow your business. Join our community of entrepreneurs and receive weekly articles about image enhancement, digital marketing, and business growth.
        </p>
        
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
