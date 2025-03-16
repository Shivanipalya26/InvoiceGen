const steps = [
    {
      number: "1",
      title: "Enter Details",
      description:
        "Fill in your company and client information, add invoice items, and set payment terms.",
    },
    {
      number: "2",
      title: "Preview & Customize",
      description:
        "Preview your invoice in real-time and customize it to match your brand identity.",
    },
    {
      number: "3",
      title: "Send & Track",
      description:
        "Download as PDF, send via email, and track payment status from your dashboard.",
    },
  ];
  
  const WorkSection = () => {
    return (
      <section className="py-20 flex justify-center items-center">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create and send professional invoices in just three simple steps
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ number, title, description }, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                  <span className="text-2xl font-bold text-primary">{number}</span>
                  {index !== steps.length - 1 && (
                    <div className="absolute h-px w-full bg-primary/20 right-0 top-1/2 translate-x-full hidden md:block"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default WorkSection;
  