import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals just getting started",
    features: [
      "Up to 5 invoices per month",
      "Basic invoice templates",
      "PDF download",
      "Email sending",
    ],
    buttonVariant: "outline",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    description: "For small businesses and freelancers",
    features: [
      "Unlimited invoices",
      "Premium templates",
      "Client management",
      "Dashboard analytics",
      "Custom branding",
    ],
    buttonVariant: "default",
    highlight: true,
  },
  {
    name: "Business",
    price: "$29",
    description: "For growing businesses",
    features: [
      "Everything in Pro",
      "Team accounts (up to 5)",
      "Advanced reporting",
      "API access",
      "Priority support",
    ],
    buttonVariant: "outline",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 flex justify-center">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(({ name, price, description, features, buttonVariant, highlight }) => (
            <div
              key={name}
              className={`bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow ${highlight ? "border-2 border-primary relative p-8 shadow-lg" : ""}`}
            >
              {highlight && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {price}
                  <span className="text-muted-foreground text-sm font-normal">/month</span>
                </div>
                <p className="text-muted-foreground">{description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={"default"} asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;