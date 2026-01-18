import { Mail, Phone, MapPin } from "lucide-react";

interface ContactProps {
  onNavigate: (page: string) => void;
}

const contactMethods = [
  {
    icon: Mail,
    type: "Email",
    value: "support@fetsmartattendance.edu",
    href: "mailto:support@fetsmartattendance.edu",
    color: "bg-accent",
  },
  {
    icon: Phone,
    type: "Phone",
    value: "(123) 456-7890",
    href: "tel:+1234567890",
    color: "bg-secondary",
  },
  {
    icon: MapPin,
    type: "Address",
    value: "123 University Ave, Education City, EC 12345",
    href: "#",
    color: "bg-primary",
  },
];

export function Contact({ onNavigate }: ContactProps) {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-medium">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions about FET Smart Attendance? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all hover:-translate-y-1 block"
            >
              <div
                className={`${method.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
              >
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-xl mb-2">{method.type}</h3>
              <p className="text-muted-foreground text-sm">{method.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="bg-highlight/20 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Find answers to common questions about setting up and using FET
            Smart Attendance.
          </p>
          <button
            onClick={() => onNavigate("about")}
            className="bg-foreground text-background px-6 py-2 rounded-full font-medium hover:bg-foreground/90 transition-colors"
          >
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
