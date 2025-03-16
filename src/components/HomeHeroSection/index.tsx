import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureSection from "../FeatureSection";
import WorkSection from "../WorkSection";
import Testimonials from "../Testimonials";
import Pricing from "../Pricing";
import FAQ from "../FAQ";

const Section = ({ title, description, features, imageSrc, reverse = false }: { 
    title: string; 
    description: string; 
    features: string[]; 
    imageSrc: string; 
    reverse?: boolean; 
  })  => (
  <section className="py-20 flex justify-center">
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className={reverse ? "order-2" : "order-1"}>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-muted-foreground mb-6">{description}</p>
        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button size="lg" asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
      <div className={`relative ${reverse ? "order-1" : "order-2"}`}>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-foreground/20 to-primary rounded-xl blur-xl opacity-30"></div>
        <div className="relative rounded-xl overflow-hidden border shadow-xl">
          <Image src={imageSrc} width={1280} height={720} alt={title} className="max-w-[900px] h-[450px] object-cover mx-auto" />
        </div>
      </div>
    </div>
  </section>
);

const HomeHeroSection = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative flex justify-center items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background z-0"></div>
          <div className="container relative z-10 py-24 md:py-32 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Create Professional Invoices <br className="hidden md:inline" />
              <span className="text-primary"> in Seconds</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-10">
              Streamline your billing process with our intuitive invoice generator.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div className="relative w-full max-w-7xl h-[720px] rounded-lg border shadow-xl overflow-hidden mt-16">
              <Image src="/home_invoice1.jpg" width={1200} height={1000} alt="Invoice Generator Dashboard" className="w-full h-auto object-cover" />
            </div>
          </div>
        </section>

        <FeatureSection />
        <WorkSection />

        <Section
          title="Beautiful Two-Column Layout"
          description="Our intuitive interface features a clean, two-column layout..."
          features={["Dynamic invoice items", "Company details section", "Client details", "Customizable templates"]}
          imageSrc="/invoice.jpg"
        />

        <Section
          title="Powerful Dashboard"
          description="Keep track of all your invoices in one place with our comprehensive dashboard..."
          features={["View all invoices", "Download and delete", "Track payment status", "Visualize performance"]}
          imageSrc="/dashboard1.jpg"
          reverse
        />

        <Testimonials />
        <Pricing />
        <FAQ />

        <section className="py-20 flex justify-center">
          <div className="container max-w-5xl text-center">
            <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-background rounded-xl p-12 shadow-lg border">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Streamline Your Invoicing?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of businesses that trust InvoiceGen.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Section
          title="Take Your Business On The Go"
          description="Create and send invoices from anywhere with our responsive design..."
          features={["Fully responsive", "Create invoices on mobile", "Access dashboard anywhere", "Send invoices instantly"]}
          imageSrc="/home_invoice.jpg"
        />
      </main>
    </div>
  );
};

export default HomeHeroSection;
