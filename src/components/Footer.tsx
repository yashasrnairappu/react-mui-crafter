import React from 'react';
import { Button } from "@/components/ui/button";
import logoP from "@/assets/adbitelogo.jpeg";

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border/20 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoP}
                alt="Adbite Logo"
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-foreground">
                Adbite
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Revolutionizing outdoor advertising with innovative screen-based solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://info.adbite.in" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="https://adbite.in/#about" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="https://adbite.in/#services" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="https://adbite.in/#contact" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://adbite.in/services/adbite-screens" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Adbite Screens
                </a>
              </li>
              <li>
                <a href="https://adbite.in/services/adbite-wheels" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                    Adbite Wheels
                </a>
              </li>
              <li>
                <a href="https://adbite.in/services/adbite-properties" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Adbite Properties
                </a>
              </li>
              <li>
                <a href="https://adbite.in/services/web-solutions" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Web Solutions
                </a>
              </li>
              <li>
                <a href='https://adbite.in/services/branding-and-design' className="text-sm text-foreground/80">Ad Shoot</a>
              </li>
              <li>
                <a href='https://adbite.in/services/social-media-marketing' className="text-sm text-foreground/80">Digital Marketing</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-foreground/80">
                contact.adbite@gmail.com
              </p>
              <p className="text-sm text-foreground/80">
                +91 79072 62988
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Thiruvalla Rd Mallapally<br />
                Pathanamthitta Kerala
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © 2026 Adbite. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://wa.me/6282359567?text=Hi%2C%20I%27m%20interested%20in%20your%20services', '_blank')}
              className="text-foreground/80 hover:text-background"
            >
              Contact Now
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;