import React from "react";
import { Button } from "@/components/ui/button";
import logoP from "@/assets/adbitelogo.jpeg";
import { ArrowBigUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F0F0F] border-t border-white/10 px-6 py-14">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-[#E8181E]/40">
                <img
                  src={logoP}
                  alt="Adbite Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#E8181E]">
                Adbite
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Revolutionizing advertising with innovative indoor and outdoor
              branding solutions that help businesses stand out.
            </p>
          </div>
 
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                ["Home", "/"],
                ["About", "#about"],
                ["Services", "#services"],
                ["Contact", "#contact"],
              ].map(([name, link]) => (
                <li key={name}>
                  <a
                    href={link}
                    className="text-white/60 hover:text-[#E8181E] transition-all duration-300 text-sm"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
                <div>
          <h3 className="text-white text-lg font-semibold mb-5">
            Services
          </h3>

          <ul className="space-y-3">
            {[
              "Adbite Screens",
              "Adbite Wheels",
              "Adbite Properties",
              "Web Solutions",
              "Ad Shoot",
              "Digital Marketing",
            ].map((service) => {
              const message = encodeURIComponent(
                `Hi, I'm interested in your ${service} service. Please share more details.`
              );

              return (
                <li key={service}>
                  <a
                    href={`https://wa.me/917907262988?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#E8181E] transition-all duration-300 text-sm"
                  >
                    {service}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-white/60">
              <p>contact.adbite@gmail.com</p>

              <p>+91 79072 62988</p>

              <p className="leading-relaxed">
                Thiruvalla Rd Mallapally
                <br />
                Pathanamthitta, Kerala
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-row items-center justify-between gap-5">

          <p className="text-sm text-white/40 text-center md:text-left">
            © 2026 Adbite. All rights reserved.
          </p>

          <Button
            onClick={() =>
              window.open(
                "https://wa.me/7907262988?text=Hi%2C%20I%27m%20interested%20in%20your%20services",
                "_blank"
              )
            }
            className="bg-[#E8181E] hover:bg-[#ff2b31] text-white px-6"
          >
            Contact Now
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;