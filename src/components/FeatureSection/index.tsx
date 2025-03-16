import { Download, FileText, Mail, PieChart, Shield, Users } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Real-time Preview",
    description: "See your invoice come to life as you type with our real-time preview feature."
  },
  {
    icon: Download,
    title: "PDF Download",
    description: "Download your invoices as professional PDF documents with a single click."
  },
  {
    icon: Mail,
    title: "Email Integration",
    description: "Send invoices directly to your clients via email without leaving the application."
  },
  {
    icon: PieChart,
    title: "Dashboard Analytics",
    description: "Track your invoices, payments, and business performance with our intuitive dashboard."
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Store and manage your client information for quick and easy invoice creation."
  },
  {
    icon: Shield,
    title: "Secure Storage",
    description: "Your data is securely stored and protected with enterprise-grade security."
  }
]

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/50 flex justify-center items-center">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create and manage professional invoices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
