
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI image upscaler work?",
      answer: "Our AI image upscaler uses advanced neural networks trained on millions of images to intelligently enhance low-resolution images. The AI analyzes the image and predicts missing details to create a higher resolution version while maintaining natural-looking results."
    },
    {
      question: "What types of images can I upscale?",
      answer: "You can upscale almost any type of image, including photographs, artwork, logos, and screenshots. The AI works best with clear images that have some detail to begin with, but can improve a wide range of image types."
    },
    {
      question: "What is the maximum resolution I can achieve?",
      answer: "You can upscale images up to 8x their original resolution. For example, a 500x500 pixel image can be upscaled to 4000x4000 pixels. However, the quality of the result depends on the original image's quality and content."
    },
    {
      question: "Is there a limit on how many images I can process?",
      answer: "Free users can process up to 5 images per day. Premium plans offer higher or unlimited processing limits depending on your subscription tier."
    },
    {
      question: "Do you store the images I upload?",
      answer: "We temporarily store your images only for the duration needed to process them. Once processing is complete and you've downloaded your results, the images are automatically deleted from our servers. We prioritize your privacy and security."
    },
    {
      question: "What's the difference between the enhancement modes?",
      answer: "Default mode provides balanced enhancement for most images. Reduce Noise focuses on cleaning up noisy or grainy images. Enhance Details emphasizes fine details and textures. Sharpen mode creates a crisper, more defined look with enhanced edges and contrasts."
    }
  ];

  return (
    <section id="faq" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Find answers to common questions about our image upscaling service
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-slate-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
