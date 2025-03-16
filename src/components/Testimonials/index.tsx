import { Star } from "@/styles/icons"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    initials: "SJ",
    text: "InvoiceGen has completely transformed how I handle invoicing for my freelance business. It's intuitive, fast, and the real-time preview is a game-changer!",
  },
  {
    name: "Michael Thompson",
    role: "Small Business Owner",
    initials: "MT",
    text: "As a small business owner, I needed a simple yet powerful invoicing solution. InvoiceGen delivers exactly that, plus the dashboard gives me great insights into my cash flow.",
  },
  {
    name: "Rachel Patel",
    role: "Finance Manager",
    initials: "RP",
    text: "The email integration and PDF download features save me hours every week. Our accounting team is much more efficient now that we've switched to InvoiceGen.",
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/50 flex justify-center">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thousands of businesses trust InvoiceGen for their invoicing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, initials, text }, index) => (
            <div key={index} className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </div>
              <blockquote className="text-muted-foreground mb-4">{text}</blockquote>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">{initials}</span>
                </div>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
