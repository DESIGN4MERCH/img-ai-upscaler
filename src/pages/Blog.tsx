
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Top 10 Image Enhancement Techniques for 2025",
      excerpt: "Discover the latest AI-powered techniques to enhance your images and take your visuals to the next level.",
      date: "2025-04-14",
      category: "Tutorials",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 2,
      title: "How to Start a Successful Image Enhancement Business",
      excerpt: "Learn the essential steps to launch your own image enhancement service and attract your first clients.",
      date: "2025-04-12",
      category: "Business",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 3,
      title: "The Future of AI Image Upscaling",
      excerpt: "Explore how artificial intelligence is revolutionizing image upscaling and what's coming next.",
      date: "2025-04-10",
      category: "Technology",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
            Blog & Resources
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Stay updated with the latest trends, tutorials, and insights about image enhancement and AI technology
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-slate-500 dark:text-slate-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                  {article.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {article.excerpt}
                </p>
                <Button 
                  variant="ghost" 
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Read More →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
