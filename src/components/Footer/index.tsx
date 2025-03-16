import Link from "next/link"
import { FileText } from "lucide-react"
import { InstagramIcon, LinkedInIcon, TwitterIcon } from "@/styles/icons"

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Templates", href: "#" },
      { name: "Integrations", href: "#" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Guides", href: "#" },
      { name: "API Documentation", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" }
    ]
  }
]

const socialLinks = [
  { icon: TwitterIcon, href: "#" },
  { icon: LinkedInIcon, href: "#" },
  { icon: InstagramIcon, href: "#" }
]

const Footer = () => {
  return (
    <footer className="bg-muted/80 border-t flex justify-center">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">InvoiceGen</span>
            </div>
            <p className="text-muted-foreground">Professional invoicing made simple for businesses of all sizes.</p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <Link key={index} href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map(({ title, links }, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map(({ name, href }, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InvoiceGen. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {["Privacy", "Terms", "Cookies"].map((name, index) => (
              <Link key={index} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
