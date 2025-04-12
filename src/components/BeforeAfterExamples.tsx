
import { Card } from "@/components/ui/card";

const BeforeAfterExamples = () => {
  const examples = [
    {
      id: 1,
      title: "Portrait Enhancement",
      beforeImage: "/lovable-uploads/1bdefd12-5825-4234-84cc-4c4217158fc8.png",
      description: "Sharpen facial details and improve texture"
    },
    {
      id: 2,
      title: "Landscape Upscaling",
      beforeImage: "/lovable-uploads/df83f721-0739-4719-9beb-bc9b405ea258.png", 
      description: "Enhance nature scenes with improved clarity"
    },
    {
      id: 3,
      title: "Product Photography",
      beforeImage: "/lovable-uploads/b1deb67b-514f-4013-99ac-77de41798cdd.png",
      description: "Perfect for e-commerce and marketing materials"
    }
  ];

  return (
    <section id="examples" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">See What Our AI Can Do</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Transform your low-resolution images into stunning high-definition visuals
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {examples.map((example) => (
          <Card key={example.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={example.beforeImage} 
                alt={example.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold">{example.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-slate-600">{example.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BeforeAfterExamples;
