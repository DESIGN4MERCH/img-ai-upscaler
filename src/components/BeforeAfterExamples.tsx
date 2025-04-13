
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";

const BeforeAfterExamples = () => {
  const examples = [
    {
      id: 1,
      title: "Portrait Enhancement",
      beforeImage: "/lovable-uploads/1bdefd12-5825-4234-84cc-4c4217158fc8.png",
      afterImage: "/lovable-uploads/99a8a6ff-b92a-40e3-87ef-ed735e68b6ac.png",
      description: "AI detects facial features and enhances details while preserving natural skin texture"
    },
    {
      id: 2,
      title: "Landscape Upscaling",
      beforeImage: "/lovable-uploads/df83f721-0739-4719-9beb-bc9b405ea258.png",
      afterImage: "/lovable-uploads/65db5a44-6d3f-4433-8da6-52d55cc286eb.png", 
      description: "Transform low-res landscapes into high-definition scenery with improved clarity"
    },
    {
      id: 3,
      title: "Product Photography",
      beforeImage: "/lovable-uploads/b1deb67b-514f-4013-99ac-77de41798cdd.png",
      afterImage: "/lovable-uploads/b1deb67b-514f-4013-99ac-77de41798cdd.png",
      description: "Perfect for e-commerce with sharper edges and enhanced product details"
    }
  ];

  return (
    <section id="examples" className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Image Enhancement Magic</h2>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          See the dramatic before & after results our AI delivers in seconds
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {examples.map((example) => (
          <Card key={example.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-purple-100 bg-white rounded-xl">
            <div className="aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-white text-sm font-semibold bg-purple-600 px-2 py-1 rounded">Before</span>
                    <span className="text-white text-sm font-semibold ml-auto bg-blue-500 px-2 py-1 rounded">After</span>
                  </div>
                </div>
              </div>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 z-[2] hover:z-0 transition-all duration-300">
                  <img 
                    src={example.afterImage} 
                    alt={`${example.title} - After`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 z-[1]">
                  <img 
                    src={example.beforeImage} 
                    alt={`${example.title} - Before`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">{example.title}</h3>
              <p className="text-slate-600 text-sm mb-3">{example.description}</p>
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
