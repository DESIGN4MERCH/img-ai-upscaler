
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Award, ArrowUpRight, Shield, Clock, Maximize } from "lucide-react";

const FeatureShowcase = () => {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "Powered by AI",
      description: "Our state-of-the-art AI algorithms enhance your images with remarkable precision"
    },
    {
      icon: <Award className="h-10 w-10 text-purple-500" />,
      title: "Superior Quality",
      description: "Achieve professional-grade results that preserve details and textures"
    },
    {
      icon: <ArrowUpRight className="h-10 w-10 text-purple-500" />,
      title: "Up to 8x Upscaling",
      description: "Enlarge your images up to 8 times their original size without quality loss"
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-500" />,
      title: "Privacy First",
      description: "Your images are processed securely and never stored without permission"
    },
    {
      icon: <Clock className="h-10 w-10 text-purple-500" />,
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes, thanks to our optimized processing"
    },
    {
      icon: <Maximize className="h-10 w-10 text-purple-500" />,
      title: "Multiple Enhancement Modes",
      description: "Choose from various enhancement options to get the perfect result"
    }
  ];

  return (
    <section id="features" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Everything you need to transform your low-resolution images
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureShowcase;
