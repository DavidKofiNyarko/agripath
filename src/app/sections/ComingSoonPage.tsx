'use client'
import React from 'react';
import { Gochi_Hand } from "next/font/google";
import InfiniteScrollCrops from "../components/InfiniteScrollCrops";
import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';
// import AgripathFooter from "./footer";
import WaitlistModal from "../components/WaitlistModal";
import JoinWaitlistModal from "../components/JoinWaitlistModal";
import Footer from './footer';

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const howItWorksSteps = [
  {
    id: 1,
    title: "Choose a Crop",
    description: "Select a crop or crops and units you want to invest in.",
  },
  {
    id: 2,
    title: "Sign Up & Invest Securely", 
    description:
      "Register, invest through a trusted payment gateway, and receive a private login.",
  },
  {
    id: 3,
    title: "We Handle the Farming",
    description:
      "We manage everything from planting to harvest. Track your investment.",
  },
  {
    id: 4,
    title: "Receive Your Returns",
    description: "Enjoy scheduled payouts or reinvest in new opportunities.",
  },
];

const cropCategories = [
  { label: 'Maize Projects', image: '/crops/maize.jpg' },
  { label: 'Tomatoes', image: '/crops/tomatoes.jpg' },
  { label: 'Chili Pepper', image: '/crops/chili.jpg' },
  { label: 'Cassava', image: '/crops/cassava.jpg' },
  { label: 'Cucumber', image: '/crops/cucumber.jpg' },
];

const ComingSoonPage: React.FC = () => {
  const [waitlistOpen, setWaitlistOpen] = React.useState(false);
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-white">
      {/* Hero Section */}
      <div className="relative mb-12 min-h-[520px] sm:min-h-[670px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image/Video Placeholder */}
        <div className="absolute inset-0">
          <img
            src="/bg.png"
            alt="Hero Background"
            className="w-full h-full object-cover filter brightness-[0.98]" />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-gray-400/40 via-white/90 to-white"
            style={{ mixBlendMode: "multiply" }} />
        </div>
        {/* Logo at Top Center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 mt-24 sm:mt-32">
          <img
            src="/bg-logo.png"
            alt="Hero Logo"
            className="w-48 h-48 sm:w-68 sm:h-68 object-cover filter brightness-[0.98]" />
        </div>
        {/* Headline */}
        <div className="relative z-10 flex flex-col items-center w-full mb-6 mt-[300px] sm:mt-[350px] px-2">
          <div className="flex flex-col items-center text-center w-full">
            <h1 className={`${gochiHand.className} font-bold text-4xl sm:text-6xl w-1/2 sm:w-full text-green-900 tracking-wide drop-shadow-sm`}>
              Sustainable Agriculture <br />
            </h1>
            <span className={`capitalize font-semibold text-3xl sm:text-6xl w-2/4 sm:w-full text-green-900 font-inter font-[700]`}>Meets Smart Investment</span>
          </div>
        
          <p className="font-sans font-medium text-xl sm:text-2xl leading-8 tracking-normal text-center align-middle text-gray-700 max-w-[1008px] mb-8">
            AgriPath is building the future of profitable agriculture in crop and livestock. We connect investors with high-value crop and livestock projects across Ghana. Join the waitlist and be the first to know.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] mb-4" onClick={() => setWaitlistOpen(true)}>
            Join the Waitlist
          </button>
        </div>
      </div>

      {/* Infinite Scroll Crops */}
      <div className="w-full mb-8">
        <InfiniteScrollCrops />
      </div>

      {/* How AgriPath Works */}
      <div className="py-12 sm:py-16 md:py-20 px-6 sm:px-8 bg-gradient-to-b from-white to-gray-50/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 id='how-it-works' className={`text-2xl sm:text-3xl md:text-5xl font-bold text-primary text-center mb-3 ${gochiHand.className}`}>
            How AgriPath Works
          </h2>
          <p className="text-sm sm:text-base text-center text-gray-700 mb-12 sm:mb-16">
            A Simple Process to Grow Your Wealth
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 bg-white/80 rounded-xl  hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative mb-4 sm:mb-5 flex items-center gap-2">
                  <Pin className="text-red-500 mt-1.5 rotate-45" size={22} />
                  <h3 className={`text-xl sm:text-2xl font-bold text-primary mt-2 ${gochiHand.className}`}>
                    Step {step.id}
                  </h3>
                </div>
                <h4 className="font-bold text-gray-800 mb-3 text-base sm:text-lg">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="w-full flex justify-center mt-12">
          <button className="text-primary border-2 border-primary px-8 py-3.5 rounded-lg font-semibold shadow-sm mb-4 relative overflow-hidden group transform hover:scale-[1.02] transition-all duration-300" onClick={() => setWaitlistOpen(true)}>
            <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-300">Get Started Today</span>
            <div className="absolute bottom-0 left-0 w-full h-0 bg-primary transition-all duration-400 ease-out group-hover:h-full -z-0"></div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <JoinWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  )
}

export default ComingSoonPage