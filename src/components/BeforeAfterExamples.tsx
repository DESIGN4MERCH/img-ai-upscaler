
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const BeforeAfterExamples = () => {
  const examples = [
    {
      id: 1,
      title: "Portrait Enhancement",
      beforeImage: "/lovable-uploads/1bdefd12-5825-4234-84cc-4c4217158fc8.png",
      afterImage: "/lovable-uploads/99a8a6ff-b92a-40e3-87ef-ed735e68b6ac.png",
      description: "Sharpen facial details and improve texture"
    },
    {
      id: 2,
      title: "Landscape Upscaling",
      beforeImage: "/lovable-uploads/df83f721-0739-4719-9beb-bc9b405ea258.png",
      afterImage: "/lovable-uploads/df83f721-0739-4719-9beb-bc9b405ea258.png", 
      description: "Enhance nature scenes with improved clarity"
    },
    {
      id: 3,
      title: "Product Photography",
      beforeImage: "/lovable-uploads/b1deb67b-514f-4013-99ac-77de41798cdd.png",
      afterImage: "/lovable-uploads/b1deb67b-514f-4013-99ac-77de41798cdd.png",
      description: "Perfect for e-commerce and marketing materials"
    }
  ];

  return (
    <section id="examples" className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">See What Our AI Can Do</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Transform low-resolution images into stunning high-definition visuals with just a few clicks
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {examples.map((example) => (
          <Card key={example.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-purple-100 bg-white rounded-xl">
            <div className="aspect-video relative overflow-hidden group">
              <img 
                src={example.beforeImage} 
                alt={`${example.title} - Before`} 
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
              />
              <img 
                src={example.afterImage}
                alt={`${example.title} - After`} 
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <span className="text-white text-center font-medium">Hover to see enhancement</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">{example.title}</h3>
              <p className="text-slate-600 mb-3">{example.description}</p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white transition-all duration-300">
                Try This Enhancement
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BeforeAfterExamples;
