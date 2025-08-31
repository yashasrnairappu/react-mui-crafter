import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    mobile: "",
    comments: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create WhatsApp message
    const message = `Hi, I'm interested in your services.%0A%0AName: ${formData.firstName}%0AEmail: ${formData.email}%0AMobile: ${formData.mobile}%0AComments: ${formData.comments}`;
    const whatsappUrl = `https://wa.me/917356176072?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Message sent!",
      description: "You're being redirected to WhatsApp to complete your inquiry.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Ready to get your brand seen where it matters most? Get in touch with us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Address</h3>
                    <p className="text-foreground/70">
                      Hilite Business Park, Poovangal, Kozhikode
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                    <p className="text-foreground/70">+91 73561 76072</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4">
              <Button 
                size="lg" 
                className="w-full md:w-auto"
                onClick={() => window.open('https://wa.me/917356176072?text=Hi%2C%20I%27m%20interested%20in%20your%20services', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact via WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile *</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments / Questions *</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    rows={4}
                    value={formData.comments}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;