import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const AgripathFooter: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              {/* Email Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-primary-foreground" />
                  <span className="text-white">info@agripath.co</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-primary-foreground" />
                  <span className="text-white">invest@agripath.co</span>
                </div>
              </div>

              {/* Phone and Location Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-primary-foreground" />
                  <span className="text-white">+233 598 491 339</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-primary-foreground" />
                  <span className="text-white">+233 206 602 019</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-primary-foreground" />
                  <span className="text-white">Akuse - Ghana</span>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href=" https://www.facebook.com/share/16VX3ZQwuL/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Facebook size={20} className="text-primary-foreground" />
              </a>
              <a
                href="https://www.instagram.com/agripath.ltd?igsh=MWVieTVnNmFybHM3OQ%3D%3D&utm_source=qr
"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Instagram size={20} className="text-primary-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/company/107099056/admin/dashboard/ 
"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Linkedin size={20} className="text-primary-foreground" />
              </a>
              <a
                href="https://www.youtube.com/@AgriPathAfrica  
"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Youtube size={20} className="text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-4 text-center">
          <p className="text-sm text-gray-300">
            Copyright <span className="text-[#F6C768]">AgriPath</span> © 2025
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AgripathFooter;
