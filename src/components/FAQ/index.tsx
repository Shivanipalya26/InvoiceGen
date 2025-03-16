const faqs = [
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a free plan with limited features. You can use it for as long as you want and upgrade to a paid plan when you need more features."
    },
    {
      question: "Can I customize my invoice templates?",
      answer: "All paid plans include customizable templates. You can add your logo, change colors, and adjust layouts to match your brand identity."
    },
    {
      question: "How secure is my data?",
      answer: "We take security seriously. All your data is encrypted both in transit and at rest. We use industry-standard security practices and regular security audits to ensure your information is protected."
    },
    {
      question: "Can I access InvoiceGen on mobile devices?",
      answer: "Yes, InvoiceGen is fully responsive and works on all devices including smartphones and tablets. You can create and manage invoices on the go."
    },
    {
      question: "How do I get support if I have questions?",
      answer: "We offer email support for all users. Business plan subscribers also get priority support with faster response times and access to phone support."
    }
  ];
  
  const FAQ = () => {
    return (
      <section id="faq" className="py-20 bg-muted/50 flex justify-center">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about InvoiceGen
            </p>
          </div>
  
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQ;
  